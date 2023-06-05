import { useContext, useEffect, useRef, useState } from "react"
import { getContextMenuContext } from "../context"

export default function useContextMenu(defaultItems){

    const { _setContextMenu } = useContext(getContextMenuContext())
    const items = useRef(defaultItems ?? [])
    const ref = useRef();

    function invokeContextMenu(x, y, items){

        _setContextMenu({
            position: { 
                x,
                y
            },
            items: items
        })

    }

    function onInvoke(ev){

        ev.preventDefault()
        ev.stopPropagation()

        _setContextMenu({
            target: ev.target,
            position: { 
                x: ev.x,
                y: ev.y
            },
            items: items.current
        })

    }

    useEffect(() => {

        if(ref.current)ref.current.addEventListener('contextmenu', onInvoke)

        return () => {
            if(ref.current)ref.current.removeEventListener('contextmenu', onInvoke)
        }

    },[])


    function setItems(itemArray){

        items.current = itemArray;

    }


    return [ref, setItems, invokeContextMenu]
}

