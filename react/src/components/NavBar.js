import Icon from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import { generateDeviceName } from '../utils/strUtils';
import { io } from 'socket.io-client';

export default function NavBar({router}){

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [serverConnected, setServerConnected] = useState(false);
    const [title, setTitle] = useState('Inventaire')//default

    useEffect(() => {

        if(!localStorage.getItem('device_name'))localStorage.setItem('device_name', generateDeviceName())
        
        let socket = io('http://192.168.50.41:5000', {query: 'name='+localStorage.getItem('device_name')})

        socket.on('connect', () => {
            setServerConnected(true)
        })

        socket.on('disconnect', () => {
            setServerConnected(false)
        })

    }, [])

    function openMenu(){
        setMenuOpen(true)
    }

    function closeMenu(){
        setMenuOpen(false)
    }

    return <>
            <AnimatePresence>
                {isMenuOpen && <Menu setTitle={setTitle} router={router} setMenuOpen={setMenuOpen} >
                    <MenuItem Icon={Icon.Square3Stack3DIcon} path={'/'} >Inventaire</MenuItem>
                    <MenuItem Icon={Icon.Cog6ToothIcon} path={'/settings'}>Parametres</MenuItem>
                    {localStorage.getItem('dev-mode') && <MenuItem Icon={Icon.CodeBracketIcon} path={'/dev'} router={router} >Developement</MenuItem>}
                </Menu>}
            </AnimatePresence>
        
        <div className=" px-3 h-[70px] max-md:h-[100px] w-full bg-white flex items-end gap-4 pb-3 select-none text-gray-900 border-b-[1px] z-10 shadow-md fixed">
            <div className='flex gap-4 items-center'>
                {isMenuOpen ? 
                    <Icon.XMarkIcon onClick={closeMenu} className='w-10 h-10 hover:bg-gray-400/10 rounded-full p-[3px] cursor-pointer' /> 
                    : 
                    <Icon.Bars3BottomLeftIcon onClick={openMenu} className='w-10 h-10 hover:bg-gray-400/10 rounded-full  p-[3px] cursor-pointer'/>}
                <h5 className='text-[18px] '>{title}</h5>
                <div className='absolute right-5 flex gap-4 items-center'>
                    <div style={{backgroundColor: serverConnected ? '#6AB768' : '#DE5757'}} className='h-[15px] w-[15px] bg-green-400 rounded-full' title='Connecté au serveur' />
                    <h5 className=''>{localStorage.getItem('device_name')}</h5>

                </div>
            </div>
           
        </div>

        </>
}


function Menu({children, setMenuOpen, setTitle, router}){

    function onClick(name){
        setMenuOpen(false)
        if(setTitle) setTitle(name)
    }

    return <>
    <motion.div onClick={() => setMenuOpen(false)} animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity:0}} className='absolute h-full w-full bg-neutral-600/50 top-0 left-0 z-10' />

    <motion.div exit={{left: '-300px'}} initial={{left: '-300px'}} animate={{left: '0'}} className='pt-2 h-[calc(100%-70px)] max-md:h-[calc(100%-100px)] w-[300px] z-50 border-r-[1px] text-gray-900 bg-white top-[70px] max-md:top-[100px] absolute px-2 select-none'>
        {React.Children.map(children, (child) => {

          return child ? React.cloneElement(child, {
            router,
            onClick
          }) : null;
        })}
    </motion.div></>
}

function MenuItem({router,  onClick, path, Icon, children}){

    const [isPressed, setPressed] = useState()

    useEffect(() => {

    }, [])

    function handleClick(){
        if(router)router.navigate(path)
        if(onClick)onClick(children)
    }

    function getPath(){
        return '/'+window.location.href.split('/').at(-1)
    }

    return <div style={{backgroundColor: getPath() === path ? '#3399ff' : null, color: getPath() === path ? 'white' : null}} onClick={handleClick} className='h-[50px] flex items-center gap-4 hover:bg-neutral-200 px-3 rounded-md text-neutral-700' >
        {Icon && <Icon className='w-[20px] h-[20px]' />}
        <h1 className='text-[18px]'>{children}</h1>
    </div>
}