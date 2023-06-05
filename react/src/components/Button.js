import { useEffect, useRef, useState } from "react";
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lotties/loading.json'
import {AnimatePresence, motion, useAnimate} from 'framer-motion'
import useMeasure from "react-use-measure";

export default function Button({children, Icon, color, process, onClick, width, transparent, className, refAction}){

    const [isLoading, setLoading] = useState(false);
    const [scope, animate] = useAnimate()
    const canBeClick = useRef(true)

    useEffect(() => {
        
        if(refAction){
            refAction({
                click: () => hasClicked()
            })
        }

    },[refAction])

    const [buttonData, setButtonData] = useState({
        Icon: Icon,
        color: color,
        text: children
    })

    function buttonSize(){

    }
/*
    useEffect(() => {

        if(!isLoading){
            animate(scope.current, {
                width: bounds.width,
            }, {
                type: 'spring'
            })
        }else{
            animate(scope.current, {
                width: bounds.height,
            }, {
                type: 'spring'
            })
        }

    }, [isLoading])
    
*/

    function hasClicked(){

        if(!isLoading && canBeClick.current){

            if(process){

                canBeClick.current = false

                setLoading(true)

                process((newData) => {
                    
                    let _listener;

                    animate('div', {
                        opacity: [0, 1],
                        y: [60, 0]
                    })

                    if(newData.color)animate(scope.current, {
                        backgroundColor: newData.color,
                    })

                    let saved = {
                        Icon: buttonData.Icon,
                        color: buttonData.color,
                        text: buttonData.text,
                    }

                    setButtonData({
                        Icon : newData.Icon ? newData.Icon : buttonData.Icon,
                        color : newData.color ? newData.color : buttonData.color,
                        text : newData.text,
                    })

                    async function resetData() {

                        if(newData.color)animate(scope.current, {
                            backgroundColor: null,
                        })

                        await animate('div', {
                            opacity: 0
                        })

                        setButtonData(saved)

                        await animate('div', {
                            opacity: 1,
                            y: [-10, 0]
                        })

                        canBeClick.current = true;
                    }

                    setTimeout(() => {

                        if(_listener)_listener()

                       resetData()
                       
                    }, 1000)

                    setLoading(false)

                    return{
                        onAnimationEnd : (listener) => {
                            _listener = listener;
                        }
                    } 
                })
            }else if(onClick){
                onClick()
            }
        }
        

    }

    return <div className={className}>
                <div className={'flex w-full justify-center items-center '+className}>

                    <motion.div whileTap={{scale: .9}} key={buttonData} ref={scope} onTap={hasClicked} className='overflow-hidden w-full h-[60px] md:h-[40px] outline-none rounded-lg duration-100 xl:hover:opacity-50 bg-primary flex items-center justify-center gap-4 text-white cursor-pointer select-none'>

                        <AnimatePresence onExitComplete>

                        { isLoading ?

                            <div>
                                <Lottie className="w-[40px] h-[40px]" style={{
                                    filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(305deg) brightness(102%) contrast(102%)',
                                }} animationData={loadingAnimation} />
                            </div>
                            :
                            <div className="flex justify-center items-center gap-3">
                                {buttonData.Icon && <buttonData.Icon className='w-6 h-6' />}
                                {buttonData.text && <h3 className="text-[16px] whitespace-nowrap">{buttonData.text}</h3>}
                            </div>

                        }

                        </AnimatePresence>

                    </motion.div>

                </div>
    </div>
}