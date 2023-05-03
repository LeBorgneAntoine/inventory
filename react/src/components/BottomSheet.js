import { AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import useMeasure from "react-use-measure"

export default function BottomSheet({children, startHeight, stateControl}){

    const [scope, animate] = useAnimate();
    const [scopeBack, animateBack] = useAnimate();
    const [isShow, setShow] = useState(false);

   
    useEffect(() => {


        stateControl.current = {
            show: () => setShow(true),
            hide: () => setShow(false)
        }
    

    }, [])

    useEffect(() => {

        if(isShow){
            animate(scope.current, {
                bottom: -20
            }, {
                type: 'spring',
                damping: 15
            })
        }
       

    }, [isShow])

    return <>
    <AnimatePresence >
        {isShow ? <div className="w-full h-full absolute top-0 overflow-hidden">
        <div onClick={() => setShow(false)} ref={scopeBack} className="absolute h-full w-full bg-black/50 top-0" />
        <motion.div exit={{top: '100%'}} ref={scope} className="absolute w-full h-[70%] bottom-[-100%] bg-white rounded-t-3xl flex flex-col items-center">
            <div className="w-20 h-[5px] rounded-full top-4 self-center bg-gray-300 absolute" />
            <div className=" h-[calc(100%-40px)] w-full bottom-0 absolute overflow-hidden rounded-2x">
                {children}
            </div>
        </motion.div>
        </div> : null}
    </AnimatePresence>
   
    
    </>

}