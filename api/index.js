require('dotenv').config()
const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const bodyParser = require('body-parser');
const { getDatabaseHelperInstance } = require('./database/database');
const cors = require('cors');
const { connectDevice, Device, disconectDevice, getAllConnectedDevices } = require('./model/model.Device');
const upload = require("express-fileupload");
const { secure } = require('./utils/utils.request');


//------[ START - Database load ]------
const database = getDatabaseHelperInstance()
database.openDatabase('./database/database.db')
database.setup().script('./database/scripts/createTables.sql')
//------[ END - Database load ]------



//------[ START - setup requests middlewares ]-------
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(upload());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//------[ END - setup requests middlewares ]-------



//------[ START - Import routes ]-------
const inventoryRoute = require('./routes/inventory');
const deviceRoute = require('./routes/device');
const userRoute = require('./routes/user');
const companyRoute = require('./routes/company');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
//------[ END - Import routes ]-------



//------[ START - Set API's routes ]------
app.use('/inventory',secure, inventoryRoute)
app.use('/device', deviceRoute)
app.use('/user', userRoute)
app.use('/company', secure, companyRoute)
app.use('/category',secure, categoryRoute)
app.use('/product',secure, productRoute)
//------[ END - Set API's routes ]------


io.sockets.on('connection', (socket) => {

    let { name, token }= socket.handshake.query;

    console.log('Device connected:',name)

    connectDevice(new Device({name, socket}))

    console.log(getAllConnectedDevices().length,'devices connected.')

    socket.on('disconnect', () => {

        console.log(getAllConnectedDevices().length,'devices connected.')

        disconectDevice(socket)
    
    });

});

server.listen(5000, function() {
    console.log(`Listening on port ${5000}`);
});