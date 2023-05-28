
import React from "react";

let _companyContext;

/**
 * 
 * @returns {import("react").Context}
 */
export default function getCompanyContext(){

    if(!_companyContext)_companyContext = React.createContext(null)

    return _companyContext
}