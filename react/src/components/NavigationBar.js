import Icon from '@heroicons/react/24/outline'
import IconFull from '@heroicons/react/24/solid'
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { generateDeviceName } from '../utils/strUtils';
import Lottie, { useLottie } from 'lottie-react'
import menuAnimation from '../assets/lotties/menu.json'
import useServer from '../hooks/useServer';
import { useMediaQuery } from 'react-responsive';

const MENU_ITEMS = [
    {Icon: Icon.Squares2X2Icon, IconFull: IconFull.Squares2X2Icon , name: 'Tableau de bord', path: '/'},
    {Icon: Icon.InboxStackIcon, IconFull: IconFull.InboxStackIcon, name: 'Inventaire', path: '/inventory'},
    {Icon: Icon.PaintBrushIcon, IconFull: IconFull.PaintBrushIcon, name: 'Designer', path: '/design'},
    {Icon: Icon.UserGroupIcon, IconFull: IconFull.UserGroupIcon, name: 'Clients', path: '/clients'},
    {Icon: Icon.BanknotesIcon, IconFull: IconFull.BanknotesIcon, name: 'Transactions', path: '/transactions'},
    {Icon: Icon.Cog6ToothIcon, IconFull: IconFull.Cog6ToothIcon, name: 'Paramètres', path: '/settings'},
    {Icon: Icon.CodeBracketIcon, IconFull: IconFull.CodeBracketIcon, name: 'Dèvelopement', path: '/dev', condition: () => !!localStorage.getItem('dev-mode')}
]

export default function NavigationBar(){

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [serverConnected, setServerConnected] = useState(false);
    const [title, setTitle] = useState('Inventaire')//default
    const navigate = useNavigate()
    
    const location = useLocation()

    const { connect } = useServer()

    useEffect(() => {

        if(!localStorage.getItem('device_name'))localStorage.setItem('device_name', generateDeviceName())
        
        connect({
            name: localStorage.getItem('device_name')
        })
        
       
    }, [])

    function toggle(){
        setMenuOpen(!isMenuOpen)    
    }

    return <>

                <Menu >

                    {MENU_ITEMS.filter((item) => item.condition?.() ?? true).map((item, index) => <MenuItem index={index} IconFull={item.IconFull} key={index} Icon={item.Icon} path={item.path} >{item.name}</MenuItem>)}

                </Menu>
            
        
            {/*<div className=" px-3 h-[70px] max-md:h-[var(--h-nav)] w-full bg-white dark:bg-neutral-900 flex items-center gap-4 select-none text-gray-900 z-10 shadow-md fixed">
                <div className='flex gap-4 items-center dark:text-neutral-200'>
                    <div className='w-[40px] h-[40px] flex justify-center items-center rounded-md md:hover:bg-neutral-100 md:hover:dark:bg-neutral-800 duration-200'>
                        { isMenuOpen ? <Icon.XMarkIcon onClick={toggle} className='w-[30px] h-[30px]' /> : <Icon.Bars3BottomLeftIcon onClick={toggle} className='w-[30px] h-[30px]' /> }
                    </div>

                    <h5 className='text-[18px] '>{MENU_ITEMS.find((item) => item.path === location?.pathname ?? null)?.name ?? 'Inconnue'}</h5>

                </div>
            
            </div>*/}

        </>
}

function MenuButton({menuOpen, toggle}){

    const { View, play, setDirection  } = useLottie({
        animationData: menuAnimation,
        loop: false,
        autoplay: false,
        onClick: toggle,
    }, {
        width: 30,
        height: 30,
        fill: 'white'
    })


    useEffect(() => {

        setDirection(menuOpen ? 1 : -1)
        play()
        
    }, [ menuOpen ])


    
    return View
}


function Menu({children}){

    const [isOpen, setOpen] = useState(false)
    const [scope, animate] = useAnimate()
    let isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function onClick(name){
        setOpen(false)
    }

    function toggle(){
        setOpen(!isOpen)
    }

    useEffect(() => {

        animate(scope.current, {
            width: isOpen ? 250 : 65
        })
        
    }, [isOpen, isMobile])

    return <>

    <AnimatePresence>
        { isOpen ? <motion.div animate={{ opacity : 1 }} exit={{opacity : 0}} initial={{opacity: 0}} className='absolute top-0 left-0 w-full h-full bg-black/50 z-10' /> : null}
    </AnimatePresence>

    
    <div onClick={toggle} className='w-[50px] h-[50px] translate-x-[-50%] left-[calc((var(--w-nav)/2)-.5rem)] mt-2 absolute flex justify-center items-center dark:text-neutral-300 text-gray-900 rounded-md md:hover:bg-neutral-100 md:hover:dark:bg-neutral-700/10 duration-200'>
        { isOpen ? <Icon.XMarkIcon  className='w-[30px] h-[30px]' /> : <Icon.Bars3BottomLeftIcon className='w-[30px] h-[30px]' /> }
    </div>

    <motion.div onHoverStart={() => setOpen(true)} onHoverEnd={() => setOpen(false)} ref={scope}  className={`h-[calc(100%-1rem)] border-[1px] border-neutral-200/50 dark:border-neutral-700/50 pt-2 md:m-2 md:rounded-lg shadow-lg w-[var(--w-nav)] max-md:h-full max-md:w-[70%] max-md:left-0 max-md:top-0 z-50 dark:text-neutral-300 text-gray-900 dark:bg-neutral-900 bg-white top-0 absolute px-2 select-none flex flex-col gap-0`}>

        {React.Children.map(children, (child) => {

          return child ? React.cloneElement(child, {
            onClick,
            isOpen
          }) : null;
          
        })}

    </motion.div></>
}

function MenuItem({onClick, path, Icon, IconFull, index, children, isOpen}){

    const navigate = useNavigate()

    function handleClick(){
        navigate(path, { replace: true })
        if(onClick)onClick(children)
    }

    function getPath(){ 
        return '/'+window.location.href.split('/').at(-1)
    }

    return <motion.div onClick={handleClick} whileHover={{ transitionDuration: 200 }} exit={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} initial={{x: -50, opacity: 0}} transition={{delay: index * .05, type: 'keyframes', ease: 'easeIn'}} className={`relative h-[50px] cursor-pointer overflow-hidden ${isOpen ? 'flex' : 'block'} max-md:${isOpen ? 'flex' : 'hidden'} flex items-center gap-4 hover:bg-neutral-100/50 ${(getPath() === path) ? 'bg-neutral-100/70 dark:bg-neutral-700/40' : ''} dark:hover:bg-neutral-700/10  px-3 rounded-md dark:text-neutral-200 text-neutral-950`} >
        
        {getPath() === path ? <motion.div animate={{height: '50%'}} exit={{height: '0'}} initial={{height: '0'}} className=' absolute left-0 rounded-full w-[3px] h-[50%] bg-primary' /> : null}

        <div className={`w-${isOpen ? '[22px]' : 'full'}flex justify-center items-center`}>
            {Icon && (getPath() === path ? <IconFull  className={`w-[22px] h-[22px] text-primary`}  /> : <Icon  className={`w-[22px] h-[22px]`}  /> )}
        </div>

        <AnimatePresence>
            {isOpen ? <motion.h1 animate={{ opacity : 1}} initial={{ opacity: 0 }} exit={{opacity : 0}}  className='right-2 whitespace-nowrap text-[14px] font-light'>{children}</motion.h1> : null}
        </AnimatePresence>

    </motion.div>
}