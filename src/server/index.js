const express = require('express');
const os = require('os');
const axios = require('axios');
const cors = require('cors')
const {performance} = require('perf_hooks');

const app = express()

app.use(cors())

const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const arduinoCOMPort = "COM4";

const arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
    baudRate: 115200,
    parser: new SerialPort.parsers.Readline("\n")
});
const parser = arduinoSerialPort.pipe(new Readline({ delimiter: '\n' })); //delimiter: 'ok\r\n'


// function test() {
//     setInterval(() => {
//         // arduinoSerialPort.write('$G'+'\r', () => {
//         //     t0 = performance.now()
//         //     console.log('request 1 sended')
//         // })
//         arduinoSerialPort.write('?'+'\r', () => {
//             t2 = performance.now()
//             console.log('request 2 sended')
//         })
//       }, 5000);
// }
// test()


parser.on('data', (data) => {
    const test = [...data.split(',')]
    console.log(test)
})

app.get("/api/current-positions", (req, res) => {
        res.send('Wpos: 0.000')
    })


app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
