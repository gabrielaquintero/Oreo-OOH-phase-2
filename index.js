const express = require('express');
const { Server } = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const PORT = 5050; // No cambiar
const SERVER_IP = 'IP'; // Cambiar por la IP del computador

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;

const app = express();
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

let arduinoubi={
    ubiy: 0,
    boton: 0,
    sensor: 0
}

const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});

const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

parser.on('data', (data) => {

    // Create the array
    let dataArray = data.split(' ');
     arduinoubi.ubiy=dataArray[0]
     arduinoubi.boton=dataArray[1]
     arduinoubi.sensor=dataArray[2]
     
    

    // Parse the Strings to Integer
    console.log(arduinoubi)
    // Emit the message using WebSocket to the client
    io.emit('arduino', arduinoubi);


});


// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: '/real-time' });

io.on('connection', socket => {
    console.log(socket.id);

    socket.broadcast.emit('arduino', arduinoubi);

    socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });
//esto no lo estoy usando
    socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })

    socket.on('actual-screen', message => {
        console.log(message);
        socket.broadcast.emit('pantalla-mupi', message);
    })

    socket.on('actual-pantalla', message => {
        console.log(message);
        socket.broadcast.emit('pantalla-cel', message);
    })

    socket.on('info', message=>{
        console.log(message)
        socket.broadcast.emit('info', message);
    } )
});


