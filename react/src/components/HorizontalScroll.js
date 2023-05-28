import { AnimatePresence, motion } from "framer-motion";
import Icon from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from "react";
import useSize from "../hooks/useSize";
export default function HorizontalScroll({children}){

    const { width } = useSize()
    const scrollArea = useRef();
    const [currentScroll, setCurrentScroll] = useState({
        left: false,
        right: false,
    })


    function left(){

        scrollArea.current.scrollBy({
            left: -1000,
            behavior: 'smooth' 
        })
        
    }

    function right(){

        scrollArea.current.scrollBy({
            left: 1000,
            behavior: 'smooth' 
        })

    }

    function onScroll(){

        if(scrollArea.current){

            let distanceFromRight = scrollArea.current.scrollWidth - ( scrollArea.current.scrollLeft + scrollArea.current.getBoundingClientRect().width )
            let distanceFromLeft = scrollArea.current.scrollLeft
    
            setCurrentScroll({
                left: distanceFromLeft === 0 ? false : true,
                right: distanceFromRight === 0 ? false : true,
            })

        }

    }   

    useEffect(() => {

        onScroll()

    }, [width, children])


    return <div className="relative  flex items-center gap-3 overflow-hidden overflow-y-hidden rounded">


        <div onScroll={onScroll} ref={scrollArea} className="duration-100 relative dark:scrollbar-dark scrollbar flex items-center w-full gap-3 overflow-x-auto overflow-y-hidden">

            {children}

        </div>

        <AnimatePresence>
            {currentScroll.left ? <motion.div animate={{opacity: 1}} exit={{opacity: 0}} initial={{opacity: 0}} className="absolute select-none left-0 h-full w-[50px] bg-gradient-to-r from-neutral-100 dark:from-neutral-900 from-[20%] to-transparen flex justify-center items-center">
                <Icon.ChevronLeftIcon onClick={left} className="w-[40px] h-[40px] text-neutral-900 dark:text-neutral-300 rounded-full p-2 xl:hover:bg-neutral-500/50 cursor-pointer" />
            </motion.div> : null}
        </AnimatePresence>
                        

        <AnimatePresence>
            {currentScroll.right? <motion.div animate={{opacity: 1}} exit={{opacity: 0}} initial={{opacity: 0}} className="absolute select-none right-0 h-full w-[50px] bg-gradient-to-l from-neutral-100 dark:from-neutral-900 from-[20%] to-transparen flex justify-center items-center">
                <Icon.ChevronRightIcon onClick={right} className="w-[40px] h-[40px] text-neutral-900 dark:text-neutral-300 rounded-full p-2 xl:hover:bg-neutral-500/50 cursor-pointer" />
            </motion.div>: null}
        </AnimatePresence>

    </div>
}