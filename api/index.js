const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
      }
});
const bodyParser = require('body-parser');
const { getDatabaseHelperInstance } = require('./DAO/database');
const inventoryRoute = require('./routes/inventory');
const deviceRoute = require('./routes/device');

const { connectDevice, Device, disconectDevice, getAllConnectedDevices } = require('./model/model.User');
app.use(bodyParser.urlencoded({ extended: false }))

const database = getDatabaseHelperInstance()
database.openDatabase('./DAO/database.db')
database.setup().script('./DAO/scripts/createTables.sql')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use('/inventory', inventoryRoute)
app.use('/device', deviceRoute)

io.sockets.on('connection', (socket) => {

    let name = socket.handshake.query.name

    console.log('Device connected:',name)

    connectDevice(new Device({name, socket}))

    console.log(getAllConnectedDevices().length,'devices connected.')

    socket.on('disconnect', () => disconectDevice(socket));

});

server.listen(5000, function() {
    console.log(`Listening on port ${5000}`);
});