import { io } from "socket.io-client"

function connect(serverAddress, name){
    io(serverAddress, {  })
}

function emit(flag, message){
    
}

function listen(flag, callback){

}

function get(body, data){

}

function post(body, data){

}

export {
    connect,
    emit,
    listen,
    get,
    post
}