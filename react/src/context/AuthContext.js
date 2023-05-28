import React from "react";

let _authContext;

/**
 * 
 * @returns {import("react").Context}
 */
export default function getAuthContext(){

    if(!_authContext)_authContext = React.createContext(null)

    return _authContext
}