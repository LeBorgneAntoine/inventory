import Axios  from "axios";
import { io } from "socket.io-client";

const SERVER_ADDRESS = 'http://192.168.50.41:5000';

let serverSocketInstance;

export default function useServer(){


    function setHeaders(headers = {}){

        try{

            headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            
        }catch(err){ }

        return headers;
    }

    function setParams(params = {}){

        try{
            params.company = JSON.parse(localStorage.getItem('current-company'))
        }catch(err){ }

        return params
    }


    async function get(uri, params){

        return new Promise((resolve) => {
            setTimeout(async () => {

                resolve((await Axios.get(SERVER_ADDRESS + uri, { params: setParams(params), headers: setHeaders() })).data)

            }, 0)
        })


    }

    async function put(uri, body, headers){

        try{

            return (await Axios.put(SERVER_ADDRESS + uri, setParams(body), { headers : setHeaders(headers) })).data

        }catch(err) {
            throw err
        }

    }



    async function post(uri, params, headers){

        try{

            return (await Axios.post(SERVER_ADDRESS + uri, setParams(params), { headers : setHeaders(headers) })).data

        }catch(err) {
            throw err
        }

    }

    async function connect(query){

        if(!serverSocketInstance){
            let strQuery = Object.keys(query).map((key) => key + '=' + query[key]).join('&')

            serverSocketInstance = io('http://192.168.50.41:5000', {query: strQuery})
        }

    }

    function on(flag, callback){

        if(serverSocketInstance){
            serverSocketInstance.on(flag, callback)
        }

    }


    return {
        get,
        post,
        connect,
        on,
        put
    }

}