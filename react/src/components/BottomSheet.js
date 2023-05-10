import { AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import useMeasure from "react-use-measure"

export default function BottomSheet({children, onClose, startHeight, stateControl, isShow}){

    const [scope, animate] = useAnimate();
    const [scopeBack, animateBack] = useAnimate();
    if(isShow){
        
    }

    useEffect(() => {

        if(isShow){
            animate(scope.current, {
                bottom: -20
            }, {
                type: 'spring',
                damping: 15
            })
        }else{
            if(onClose)onClose()
        }
       

    }, [isShow])

    return <>
    <AnimatePresence >
        {isShow ? <div className="w-full h-full absolute top-0 overflow-hidden">
        <div ref={scopeBack} className="fixed h-full w-full bg-black/50 top-0" />
        <motion.div exit={{top: '100%'}} ref={scope} className="fixed w-full h-[70%] bottom-[-100%] bg-white rounded-t-xl flex flex-col items-center">
            <div className="w-20 h-[4px] rounded-full top-4 self-center bg-gray-300 absolute" />
            <div className=" h-[calc(100%-40px)] w-full bottom-0 absolute overflow-hidden rounded-2x">
                {children}
            </div>
        </motion.div>
        </div> : null}
    </AnimatePresence>
   
    
    </>

}