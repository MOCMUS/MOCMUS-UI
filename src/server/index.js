const express = require('express');
const os = require('os');
const bodyParser = require("body-parser")
const gcodeparser = require('gcode-parser')
const fileUpload = require('express-fileupload')
const axios = require('axios');
const cors = require('cors')
const EventEmitter = require('events')
const {performance} = require('perf_hooks');

const event = new EventEmitter()

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: "50mb" }))
app.use(fileUpload())

const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const arduinoCOMPort = "COM4";

const arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
    baudRate: 115200
    // parser: new SerialPort.parsers.Readline("\n")
});
const parser = arduinoSerialPort.pipe(new Readline({ delimiter: '\r\n' })); //delimiter: 'ok\r\n'

const datachunk = []
parser.on('data', (data) => {
    let datastr
    event.emit('console_command', data.toString())
    datachunk.push(data.toString())

    if (datachunk.filter(string => string.includes('>')).length) {
        datastr = datachunk.join('')
        if (datastr.length) {
            datastr = datastr.split('<')[1]
            datastr = datastr.split('>')[0]
        }
        event.emit('current_positions', datastr)
        datachunk.splice(0, datachunk.length)
    }
})

const sendCommand = (command, eventName) => {
    return new Promise((resolve, reject) => {
        arduinoSerialPort.write(command, () => {
            console.log('command sended')
            event.once(eventName, (data) => {
                resolve(data.toString());
            });
    
            arduinoSerialPort.once('error', (err) => {
                reject(err);
            });
        })
    });
}

app.post('/api/upload-gcode', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
      `${__dirname}/../../public/gcode/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
        res.json({
          file: `public/${req.files.file.name}`,
        })
      },
    )
  })

app.get("/api/current-positions", (req, res) => {
    sendCommand('?'+'\r', 'current_positions').then((data) => {
        res.send(data)
    })
        
    })

app.post("/api/console-command", (req, res) => {
    sendCommand(req.body.command +'\r', 'console_command').then((data) => {
        res.send(data)
    })
        
    })


gcodeparser.parseFile('public/gcode/circle.nc', function(err, result) {
    const gcode = []
    let isPaused = true
    let fileIndex = 0
    result.map((obj, ind) => gcode[ind] = obj.line)
    // console.log(gcode);

    let interval = setInterval(function(str1, str2) {
        if (!isPaused) {
            arduinoSerialPort.write(gcode[fileIndex] +'\r', () => {
                console.log('sended line: ', gcode[fileIndex])
                fileIndex++
                if (fileIndex === gcode.length) {
                    fileIndex = 0
                    clearInterval(interval)
                }
            })

        }
        
      }, 3000);
})

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
