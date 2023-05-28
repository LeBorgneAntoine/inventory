import { AnimatePresence, useAnimate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {motion} from 'framer-motion'
import useMeasure from "react-use-measure"

export default function BottomSheet({children, onClose, startHeight, stateControl, clip, onBgTap, isShow}){

    const [scope, animate] = useAnimate();
    const [scopeBack, animateBack] = useAnimate();
    const [ draging, setDraging ] = useState(0)
    let [ref, measure] = useMeasure()
    const snapTo = useRef(0)


    useEffect(() => {

        ref = scope

    }, [])

    useEffect(() => {

        if(isShow){
            
            animate(scope.current, {
                bottom: 0,

            }, {
                type: 'spring',
                damping: 20
            })
        }else{
            if(onClose)onClose()
        }
       

    }, [isShow])

    function onDrag(e, info){


        setDraging(window.screen.height - e.y)
    }

    function onDragStop(e, info){

        let closest = clip[0]

        console.log(e.clientY)

        for (const snap of clip) {
            
            


        }
/*

        animate(scope.current, {
            y: 10
        })
  
    */
    }

    return <>
    <AnimatePresence >
        {isShow ? <div className="w-full h-full absolute top-0 overflow-hidden">
        <motion.div ref={scopeBack} animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} onClick={onBgTap} className="fixed h-full w-full bg-black/50 top-0" />
        <motion.div onDrag={onDrag} onDragEnd={onDragStop} drag={"y"} dragMomentum={false}  dragElastic={0} dragConstraints={{top: 0, bottom: measure.height, left: 0, right: 0}} exit={{top: '100%'}} 
            ref={(el) => {
                ref(el) 
                scope.current = el
            }} 
            className="fixed w-full h-[calc(100%-(var(--h-nav)))] bottom-[-100%] bg-white rounded-t-xl flex flex-col items-center">
            <div className="w-20 h-[4px] rounded-full top-4 self-center bg-gray-300 absolute" />
            <div className=" h-[calc(100%-40px)] w-full bottom-0 absolute overflow-hidden rounded-2x">
                {children}
            </div>
        </motion.div>
        </div> : null}
    </AnimatePresence>
   
    
    </>

}