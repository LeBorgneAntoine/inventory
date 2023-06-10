import { useEffect, useState } from "react"
import Icon from '@heroicons/react/24/solid'
import {motion, useAnimate} from 'framer-motion'
import React from 'react'

export default function CheckBox({onCheck, defaultValue, className}) {

    const [state, setState] = useState(defaultValue)
    const [ref, animate] = useAnimate()

    useEffect(() => {
        if(onCheck)onCheck(state)
    }, [state])

    function handleToggle(){
        setState(!state)
    }

    return <div className={'h-[20px] w-[20px] '+className ?? ''}>
        
        <motion.div ref={ref} onClick={handleToggle} className={` w-full h-full flex ${state ? 'bg-primary' : 'border-[1px] dark:border-neutral-600 border-neutral-300'} justify-center items-center   rounded-md `}>
            {state && <Icon.CheckIcon className="h-[15px] w-[15px] text-white" />}
        </motion.div>
    </div>

}