const express = require('express');
const os = require('os');
const axios = require('axios');

const app = express();

var SerialPort = require("serialport");
const arduinoCOMPort = "COM4";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
    baudRate: 115200,
    parser: SerialPort.parsers.Readline("\n")
   });

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
