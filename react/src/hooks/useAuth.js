import { useContext, useState } from "react"
import { getAuthContext } from "../context"
import useServer from "./useServer"

export default function useAuth(){

    const { _auth, _setAuth } = useContext(getAuthContext()) //storage
    const { post } = useServer()

    async function auth(username, password){

        try{

            let user = await post('/user/login', { username, password })

            _setAuth(user)

        }catch(err){
            console.log(err)
            throw err;
        }   


    }


    async function disconnect(){

        _setAuth(null);

    }

    return {
        isAuth : !!_auth,
        auth,
        disconnect,
        user: _auth
    }
}