import {motion} from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageContainer({children}){

    const location = useLocation()

    return <motion.div key={location.pathname} initial={{opacity: 0, y: 50}} transition={{type: 'keyframes', ease: 'easeInOut', duration: .15}} animate={{opacity: 1, y: 0}} 
    className="w-[calc(100%-var(--w-nav))] max-md:w-full  h-[calc(100%-var(--h-nav))] top-[var(--h-nav)] overflow-y-auto scrollbar dark:scrollbar-dark absolute max-md:left-0 max-md:top-[var(--h-nav)] p-2 left-[var(--w-nav)]">
        {children}
    </motion.div>

}