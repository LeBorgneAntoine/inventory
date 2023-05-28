
import React from "react";

let _contextMenuContext;

/**
 * 
 * @returns {import("react").Context}
 */
export default function getContextMenuContext(){

    if(!_contextMenuContext)_contextMenuContext = React.createContext(null)

    return _contextMenuContext
}