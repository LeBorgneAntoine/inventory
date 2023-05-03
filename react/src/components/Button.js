import { useEffect, useState } from "react";
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lotties/loading.json'
import {AnimatePresence, motion, useAnimate} from 'framer-motion'
import useMeasure from "react-use-measure";

export default function Button({children, Icon, color, process, onClick, transparent}){

    const [isLoading, setLoading] = useState(false);
    const [scope, animate] = useAnimate()
    const [ref, bounds] = useMeasure()

    const [buttonData, setButtonData] = useState({
        Icon: Icon,
        color: color,
        text: children
    })

    function buttonSize(){

        return buttonData.text.length * 13

    }

    useEffect(() => {

        if(!isLoading){
            animate(scope.current, {
                width: buttonSize(),
            }, {
                type: 'spring'
            })
        }else{
            animate(scope.current, {
                width: 60,
            })
        }

    }, [isLoading])
    
    function hasClicked(){

        if(!isLoading){

            if(process){

                setLoading(true)

                process((newData) => {

                    animate('div', {
                        opacity: [0, 1],
                        y: [60, 0]
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
                        await animate('div', {
                            opacity: 0
                        })
                        setButtonData(saved)
                        await animate('div', {
                            opacity: 1,
                            y: [-10, 0]
                        })
                    }

                    setTimeout(() => {

                       resetData()
                       
                    }, 1000)

                    setLoading(false)
                })
            }else if(onClick){
                onClick()
            }
        }
        

    }

    return <div className="flex items-center justify-center">
                <div key={buttonData} ref={scope} onClick={hasClicked} style={{width: buttonSize()}} className='overflow-hidden h-[50px] rounded-md duration-100 hover:opacity-80 bg-blue-500 flex items-center justify-center gap-4 text-white cursor-pointer select-none'>

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
                        {buttonData.text && <h3 ref={ref} className="text-[16px] whitespace-nowrap">{buttonData.text}</h3>}
                    </div>
                }

                </AnimatePresence>
        
        </div>
    </div>
}