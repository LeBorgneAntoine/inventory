import { useEffect, useState } from "react"
import Icon from '@heroicons/react/24/solid'
import {motion, useAnimate} from 'framer-motion'

export default function CheckBox({onCheck, defaultValue, className}) {

    const [state, setState] = useState(defaultValue)
    const [ref, animate] = useAnimate()

    useEffect(() => {
        if(onCheck)onCheck(state)
    }, [state])

    function handleToggle(){
        setState(!state)
        animate(ref.current, {scale: [1, 1.1, 1]})
    }

    return <div className={'h-[25px] w-[25px] '+className}>
        
        <motion.div ref={ref} onClick={handleToggle} style={{backgroundColor: state ? '#00cc66' : null}} className={" w-full h-full flex justify-center items-center dark:bg-neutral-800 bg-neutral-200 rounded-md "}>
            {state && <Icon.CheckIcon className="h-[15px] w-[15px] text-white" />}
        </motion.div>
    </div>

}