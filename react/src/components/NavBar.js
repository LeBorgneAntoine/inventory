import Icon from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { generateDeviceName } from '../utils/strUtils';

export default function NavBar({title}){

    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        if(!localStorage.getItem('device_name'))localStorage.setItem('device_name', generateDeviceName())
        
    }, [])

    function openMenu(){
        setMenuOpen(true)
    }

    function closeMenu(){
        setMenuOpen(false)
    }

    return <>
            <AnimatePresence>
                {isMenuOpen && <Menu >
                    <MenuItem >Gestion</MenuItem>
                    <MenuItem >Test</MenuItem>
                    <MenuItem >Parameteres</MenuItem>

                </Menu>}
            </AnimatePresence>
        
        <div className=" px-3 h-[70px] w-full bg-white flex items-center gap-4 select-none text-gray-900 border-b-[1px] z-10 shadow-md fixed">
            {isMenuOpen ? 
                <Icon.XMarkIcon onClick={closeMenu} className='w-10 h-10 hover:bg-gray-400/10 rounded-full p-[3px] cursor-pointer' /> 
                : 
                <Icon.Bars3BottomLeftIcon onClick={openMenu} className='w-10 h-10 hover:bg-gray-400/10 rounded-full  p-[3px] cursor-pointer'/>}
            <h5 className='text-[18px] '>{title}</h5>
            <div className='absolute right-5 flex gap-4 items-center'>
                <div className='h-[15px] w-[15px] bg-green-400 rounded-full' title='Connecté au serveur' />
                <h5 className=''>{localStorage.getItem('device_name')}</h5>

            </div>
        </div>

        </>
}


function Menu({children}){
    return <>
    <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity:0}} className='absolute h-full w-full bg-neutral-600/50 top-0 left-0 z-10' />

    <motion.div exit={{left: '-300px'}} initial={{left: '-300px'}} animate={{left: '0'}} className='pt-2 h-[calc(100%-70px)] w-[300px] z-50 border-r-[1px] text-gray-900 bg-white top-[70px] absolute px-2 select-none'>
    {children}
</motion.div></>
}

function MenuItem({path, Icon, children}){

    return <div className='h-[50px] flex items-center hover:bg-neutral-200 px-3 rounded-md' >
        {children}
    </div>
}