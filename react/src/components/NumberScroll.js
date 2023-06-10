import { useEffect, useRef, useState } from "react"
import {motion} from 'framer-motion'
import Icon from '@heroicons/react/24/solid'
import useMeasure from "react-use-measure"
import React from 'react'

export default function NumberScroll({defaultValue, className, onChange}){

    const [currentNumber, setCurrentNumber] = useState(defaultValue ? defaultValue : 0)
    const [ref, measure] = useMeasure()

    function handleDrag(e){
        console.log(measure)
    }

    function handleOnTap(e){

        setCurrentNumber(currentNumber + (measure.width / 2 < e.pageX ? 1 : currentNumber > 0 ? -1 : 0))
    }

    useEffect(() => {
        
        if(onChange)onChange(currentNumber)

    }, [currentNumber])

    function onTap(){
        console.log('press')
    }

    function changeNumber(value){

        if((value <= 0 && currentNumber > 0) || value > 0){

            
            setCurrentNumber(Math.round(currentNumber + Math.exp(value)))
        }

    }

    function onMove(e){

       

        changeNumber(Math.round(e.touches[0].clientX) - Math.round(measure.x))
    }

    return <div className={className}>
       
        <motion.div ref={ref} onDrag={handleDrag} whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }} onTapStart={onTap} onTouchMove={onMove} className="bg-neutral-300 flex justify-center items-center rounded-md w-[50px] h-[50px]">
            <Icon.Bars2Icon className="rotate-90 w-[60%] h-[60%] opacity-30" />
        </motion.div>

    </div>
}