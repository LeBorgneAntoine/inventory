const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const { getDatabaseHelperInstance } = require('./DAO/database');
const reference = require('./routes/refrence')
app.use(bodyParser.urlencoded({ extended: false }))

const database = getDatabaseHelperInstance()
database.openDatabase('./database.db')
database.setup().script('./DAO/scripts/createTables.sql')

app.use('/reference', reference)

io.sockets.on('connection', (socket) => {

    console.log('Connected')

    socket.on('disconnect', () => {
        console.log('Disconnected')
    });

});

server.listen(5000, function() {
    console.log(`Listening on port ${5000}`);
});