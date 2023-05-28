import { useContext, useEffect, useState } from "react"
import { motion } from 'framer-motion'; 
import Icon from '@heroicons/react/24/outline'
import { getContextMenuContext } from "../context";
import useSize from "../hooks/useSize";

export default function ContextMenu({contextMenu, setContextMenu}){

    const { width, height } = useSize()

    useEffect(() => {

        let clearContextMenu = () => {
            setContextMenu(null)
        }

        window.addEventListener('click', clearContextMenu)

        return () => {
            window.removeEventListener('click', clearContextMenu)
        }

    }, [contextMenu])


    function computePosition(){

        const {x, y} = contextMenu.position ?? {x: 0, y: 0} 

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const marginX = windowWidth / 2;
        const marginY = windowHeight / 2;


        let left = x + marginX < windowWidth ? x : null;
        let right = x + marginX >= windowWidth ? windowWidth - x : null;
        let top =  y + marginY < windowHeight ? y : null;
        let bottom = y + marginY >= windowHeight ? windowHeight - y : null;

        return {
            left,
            right,
            top,
            bottom
        }
    }

    return <div 
        onClick={(ev) => ev.stopPropagation()} 
        style={computePosition()}
        className="absolute z-20 drop-shadow-xl bg-neutral-900 flex transition-all flex-col gap-1 border-[1px] border-neutral-700/80 p-1 shadow-sm  rounded-lg w-[300px]">
        {contextMenu.items?.map((item) => <Item setContextMenu={setContextMenu} item={item}/>)}
    </div>

}

function Item({item, setContextMenu}){

    const [showSubs, setShowSubs] = useState(false)

    function handleClick(){

        if(!item.subs){
            //close
            setContextMenu(null) 

            console.log(item.action)

            if(item.action)item.action()
        }

    }

    return <div onClick={handleClick} onMouseEnter={() => setShowSubs(true)} onMouseLeave={() => setShowSubs(false)} className="h-[35px] relative flex items-center px-2 text-neutral-200 gap-3 hover:bg-neutral-700/20 rounded-md select-none">

        {item.Icon ? <item.Icon className='w-[20px] h-[20px]' /> : null}

        <h1 className="flex-1">{item.text}</h1>

        {item.subs ? <Icon.ChevronRightIcon className='w-[15px] h-[15px] opacity-25' /> : null}
        
        { showSubs && item.subs ? <div className="left-[95%] top-0 absolute drop-shadow-xl bg-neutral-900 flex flex-col gap-1 border-[1px] border-neutral-700/80 p-1 rounded-lg min-w-[300px]">
            {item.subs?.map((item) => <Item setContextMenu={setContextMenu} item={item} />) }
        </div> : null}

    </div>

}