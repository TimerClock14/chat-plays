//if linux run: "node server.js linux"

var { createServer } = require('http')
var { Server } = require('socket.io')

var os = process.argv.slice(2).length >= 1 ? process.argv[2] : 'windows';
console.log(os);
var windowID = "";
var programName = process.argv.slice(2).length >= 1 ? process.argv[3] : 'Desmume';

var httpServer = createServer();
var io = new Server(httpServer, {
    cors: {
        origin: 'https://www.youtube.com'
    }
});

io.listen(8000);
var sys = require('sys');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// io.set('log level', 1);

var lastTime = new Date().getTime();
var keysGB = ['a', 'b', 'left', 'right', 'up', 'down', 'start', 'select'];
var keysNDS = ['a', 'b', 'left', 'right', 'up', 'down', 'x', 'y', 'select'];

if (os == 'windows') {
    io.sockets.on('connection', function (socket) {
        socket.on('i', function (data) {
            console.log(data)
            var key = data.i;
            if (keysNDS.indexOf(key) != -1) {
                exec('key.py ' + key);
                console.log(key);
            }
        });
    });
} else {
    io.sockets.on('connection', function (socket) {
        socket.on('i', function (data) {
            var key = data.i;
            var possibleKey = true;
            if (key == 'select') {
                key = 'e';
            }
            else if (key == 'a' || key == 'b' || key == 'x' || key == 'y') {} 
            else if (key == 'up' || key == 'down' || key == 'left' || key == 'right') {
                key = key.charAt(0).toUpperCase() + key.substring(1);
            } else if (key == 'start') {
                var newTime = new Date().getTime();
                if (newTime - lastTime < 30000) {
                    possibleKey = false;
                } else {
                    lastTime = newTime;
                    key = 's';
                }
            } else {
                possibleKey = false;
            }
            if (possibleKey) {
                var xdo = exec("xdotool search --onlyvisible --name " + programName, function (error, stdout, stderr) {
                    console.log(key);
                    var windowID;
                    windowID = stdout.trim();
                    exec("xdotool key --window " + windowID + " --delay 100 " + key);
                });
            }
        });
    });
}