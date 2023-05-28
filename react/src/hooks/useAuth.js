import { useContext, useState } from "react"
import { getAuthContext } from "../context"
import useServer from "./useServer"

export default function useAuth(){

    const { _auth, _setAuth } = useContext(getAuthContext())
    const { post } = useServer()

    async function auth(username, password){

        try{

            let user = (await post('/user/login', { username, password }))

            localStorage.setItem('user',JSON.stringify(user))
            _setAuth(user)

        }catch(err){
            console.log(err)
            throw err;
        }   


    }


    async function disconnect(){

        localStorage.removeItem('user');
        _setAuth(null);

    }

    return {
        isAuth : !!_auth,
        auth,
        disconnect
    }
}