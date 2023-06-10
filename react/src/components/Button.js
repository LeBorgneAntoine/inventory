import { useEffect, useRef, useState } from "react";
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lotties/loading.json'
import {AnimatePresence, motion, useAnimate} from 'framer-motion'
import useMeasure from "react-use-measure";
import React from 'react'

export default function Button({children, Icon, color, process, onClick, width, secondary, transparent, className, refAction, RightIcon}){

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
        Icon,
        RightIcon,
        color: color,
        text: children
    })

    function buttonSize(){

    }

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
                        RightIcon: buttonData.RightIcon,
                        color: buttonData.color,
                        text: buttonData.text,
                    }

                    setButtonData({
                        Icon : newData.Icon ? newData.Icon : buttonData.Icon,
                        RightIcon: newData.RightIcon ? newData.RightIcon : buttonData.RightIcon,
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

                    <motion.div whileTap={{scale: .9}} key={buttonData} ref={scope} onTap={hasClicked} className={`overflow-hidden ${secondary ? 'border-[1px] border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 text-neutral-600 bg-neutral-100/50' : 'bg-primary text-white'} w-full h-[60px] md:h-[45px] outline-none rounded-md duration-100 xl:hover:opacity-50  flex items-center justify-center gap-4 cursor-pointer select-none`}>

                        <AnimatePresence onExitComplete >

                        { isLoading ?

                            <div>
                                <Lottie className="w-[40px] h-[40px]" style={{
                                    filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(305deg) brightness(102%) contrast(102%)',
                                }} animationData={loadingAnimation} />
                            </div>
                            :
                            <div className="flex justify-center items-center gap-3 mx-3">

                                {buttonData.Icon && <buttonData.Icon className='w-[20px] h-[20px]' />}
                                {buttonData.text && <h3 className="text-[14px] whitespace-nowrap">{buttonData.text}</h3>}
                                {buttonData.RightIcon && <buttonData.RightIcon className='w-[20px] h-[20px]' />}

                            </div>

                        }

                        </AnimatePresence>

                    </motion.div>

                </div>
    </div>
}