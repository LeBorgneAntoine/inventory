const { Socket } = require("socket.io-client")
const User = require("../model/model.User")

let devices = []

/**
 * 
 * @param {String} device 
 * @param {Socket} socket 
 * @param {User} user 
 * @param {Number} company
 */
function register(device, socket, user, company){

    

    devices.push({
        device,
        socket,
        user,
        company
    })

    socket.on('udpate', (data) => {



    })

}



module.exports = {
    register
}