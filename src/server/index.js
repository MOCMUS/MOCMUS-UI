const express = require('express');
const os = require('os');
gcodeparser = require('gcode-parser')

const app = express();

gcodeparser.parseFile('gcode/circle.nc', function(err, result) {
    const gcode = []
    let isPaused = true
    let fileIndex = 0
    result.map((obj, ind) => gcode[ind] = obj.line)
    console.log(gcode);

    // var interval = setInterval(function(str1, str2) {
    //     console.log(str1 + " " + str2);
    //   }, 1000, "Hello.", "How are you?");
})

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
