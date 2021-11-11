const express = require('express');
const os = require('os');
const bodyParser = require("body-parser")
const gcodeparser = require('gcode-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const axios = require('axios');
const cors = require('cors')
const EventEmitter = require('events')
const {performance} = require('perf_hooks');

const event = new EventEmitter()

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: "50mb" }))
app.use(fileUpload())

const SerialPort = require("serialport")
const Readline = require('@serialport/parser-readline');

const datachunk = []
let arduinoSerialPort

SerialPort.list().then(ports => {
    let done = false
    let count = 0
    let path = ''
    let pm
    ports.forEach((port) => {
        count++
        pm = port.manufacturer

        if (typeof pm !== 'undefined' && (pm.includes('FTDI') || pm.includes('Microsoft') || pm.includes('Arduino'))) {
            path = port.path
            arduinoSerialPort = new SerialPort(path, { baudRate: 115200 })
            const parser = arduinoSerialPort.pipe(new Readline({ delimiter: '\r\n' }))
            arduinoSerialPort.on('open', function(){
              console.log(`connected! microcontroller is now connected at port ${path}`)
            })
            parser.on('data', responsesDispatcher)
            done = true
          }

        if(count === ports.length && done === false){
        console.log(`can't find any valid microcontroller`)
        }
    })
})

const responsesDispatcher = (data) => {
    let datastr
    event.emit('console_command', data.toString())
    datachunk.push(data.toString())

    if (datachunk.filter(string => string.includes('>')).length) {
        datastr = datachunk.join('')
        if (datastr.length) {
            datastr = datastr?.split('<')[1]
            datastr = datastr?.split('>')[0]
        }
        event.emit('current_positions', datastr)
        datachunk.splice(0, datachunk.length)
    }

}

const sendCommand = (command, eventName) => {
    return new Promise((resolve, reject) => {
        arduinoSerialPort.write(command, () => {
            event.once(eventName, (data) => {
                resolve(data.toString());
            });
    
            // arduinoSerialPort.once('error', (err) => {
            //     reject(err);
            // });
        })
    });
}

const checkFileExists = (file) => {
    return fs.promises.access(file, fs.constants.F_OK)
             .then(() => true)
             .catch(() => false)
  }

app.post('/api/upload-gcode', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    const filePath = `${__dirname}/../../public/gcode/${fileName}`

    checkFileExists(filePath).then((isFileExist) => {
        if (!isFileExist) {
            uploadFile.mv(
                filePath,
                function (err) {
                  if (err) {
                    return res.status(500).send(err)
                  }
                  return res.json({
                    filePath: `public/gcode/${req.files.file.name}`,
                    fileName: fileName,
                    fileStatus: 'file upload successful'
                  })
                },
              )
    
        } else {
            return res.json({
                filePath: `public/gcode/${req.files.file.name}`,
                fileName: fileName,
                fileStatus: 'file already exists'
              })
        }
    
    })


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

app.post("/api/jog-command", (req, res) => {
    arduinoSerialPort.write(req.body.command +'\r', () => {
        res.send('Jog sended')
    })
        
})

let isPaused
let fileIndex
let gcodeSendInterval
app.post("/api/gcode-runner", (req, res) => {
    const fileName = req.body.fileName
    const gcodeCommand = req.body.gcodeCommand
    const filePath = `${__dirname}/../../public/gcode/${fileName}`
    const cmdSendRate = 3000 // millisec


    switch(gcodeCommand) {
        case 'run':
          checkFileExists(filePath).then((isFileExists) => {
              if (isFileExists) {
                if (!gcodeSendInterval) {
                    gcodeparser.parseFile(`public/gcode/${fileName}`, function(err, result) {
                        const gcode = []
                        fileIndex = 0
                        isPaused = false
                        
                        result.map((obj, ind) => gcode[ind] = obj.line)
                    
                        gcodeSendInterval = setInterval(function(str1, str2) {
                                arduinoSerialPort.write(gcode[fileIndex] +'\r', () => {
                                    console.log('sended line: ', gcode[fileIndex])
                                    fileIndex++
                                    if (fileIndex === gcode.length) {
                                        fileIndex = 0
                                        clearInterval(gcodeSendInterval)
                                        gcodeSendInterval = null
                                        isPaused = null
                                    }
                                })
                    
                          }, cmdSendRate);
                    })
                  }
              }

          })
          break;
        case 'stop':
        if (typeof gcodeSendInterval !== 'undefined') {
            fileIndex = 0
            clearInterval(gcodeSendInterval)
            gcodeSendInterval = null
            isPaused = null
        }
        break;
        case 'pause':
        if (typeof isPaused !== 'undefined') {
            isPaused = !isPaused
            if (isPaused) {
                clearInterval(gcodeSendInterval)
                gcodeSendInterval = null
            } else {
                checkFileExists(filePath).then((isFileExists) => {
                    if (isFileExists) {
                        if (!gcodeSendInterval) {
                            gcodeparser.parseFile(`public/gcode/${fileName}`, function(err, result) {
                                const gcode = []
                                
                                result.map((obj, ind) => gcode[ind] = obj.line)
                            
                                gcodeSendInterval = setInterval(function(str1, str2) {
                                      arduinoSerialPort.write(gcode[fileIndex] +'\r', () => {
                                          console.log('sended line: ', gcode[fileIndex])
                                          fileIndex++
                                          if (fileIndex === gcode.length) {
                                              fileIndex = 0
                                              clearInterval(gcodeSendInterval)
                                              gcodeSendInterval = null
                                          }
                                      })
                            
                                  }, cmdSendRate);
                            })
                          }
                    }

                })
            }
        }
        break;
        default:
        return res.json({reqStatus: 'command does not exists'})
      }

      return res.json({reqStatus: `${gcodeCommand} request successful`})
        
    })


app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
