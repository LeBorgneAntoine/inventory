import {motion} from 'framer-motion'

export default function Skeleton({className}){


    return <motion.div animate={{opacity: 1}} initial={{opacity: .2}} transition={{repeat: Infinity,repeatType: 'mirror', duration: 1.5}} className={"relative bg-neutral-200 dark:bg-neutral-800 rounded-lg "+className} />

   
}