const { Socket } = require("socket.io");

let _devices = []

function getAllConnectedDevices(){
    return _devices;
}

function getDevice(name){
    return _devices.find((device) => device.getName() === name)
}

/**
 * 
 * @param {Device} device 
 */
function connectDevice(device){

    let existingDevice = _devices.find((device) => device.getName() === device.getName())

    if(existingDevice){
        existingDevice.setSocket(device.getSocket())
    }else{
        _devices.push(device);
    }

}

/**
 * 
 * @param {Socket} socket 
 */
function disconectDevice(socket){
    let index = _devices.findIndex((val) => val.getSocket().id === socket.id)
    if(index >= 0 && _devices[index]){
        console.log('Device',_devices[index].getName(),'disconnected.')
    }
    _devices.splice(index)
}

class Device{

    _data;

    /**
     * 
     * @param {{socket: Socket}} param0 
     */
    constructor({
        name,
        socket
    }){
        this._data = {
            name,
            socket
        }
    }

    setSocket(socket){
        this._data.socket = socket;
    }

    /**
     * 
     * @returns {Socket}
     */
    getSocket(){
        return this._data.socket
    }

    getName(){
        return this._data.name
    }

    sendData(data){
        this._data.socket.send(data)
    }

}

module.exports = {
    getAllConnectedDevices,
    connectDevice,
    disconectDevice,
    Device
}