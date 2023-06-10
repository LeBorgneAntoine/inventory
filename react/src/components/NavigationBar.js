import Icon from '@heroicons/react/24/outline'
import IconFull from '@heroicons/react/24/solid'
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useAuth from '../hooks/useAuth';
import Logo from 'assets/svg/logo.svg'
import useCompany from '../hooks/useCompany';
import Input from './Input';
import { useTranslation } from 'react-i18next';


const MENU_ITEMS = [
    {Icon: Icon.Squares2X2Icon, IconFull: IconFull.Squares2X2Icon , name: 'DASHBOARD', path: '/'},
    {Icon: Icon.InboxStackIcon, IconFull: IconFull.InboxStackIcon, name: 'INVENTORY', path: '/inventory'},
    {Icon: Icon.PaintBrushIcon, IconFull: IconFull.PaintBrushIcon, name: 'DESIGNER', path: '/design'},
    {Icon: Icon.UserGroupIcon, IconFull: IconFull.UserGroupIcon, name: 'CLIENTS', path: '/clients'},
    {Icon: Icon.BanknotesIcon, IconFull: IconFull.BanknotesIcon, name: 'TRANSACTIONS', path: '/transactions'},
    {Icon: Icon.Cog6ToothIcon, IconFull: IconFull.Cog6ToothIcon, name: 'SETTINGS', path: '/settings'},
    {Icon: Icon.CodeBracketIcon, IconFull: IconFull.CodeBracketIcon, name: 'DEV_MODE', path: '/dev', condition: () => !!localStorage.getItem('dev-mode')}
]

export default function NavigationBar(){

    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    let isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { info } = useCompany()
    const { user } = useAuth()
    const { t } = useTranslation()
    
    const location = useLocation()
    
    function isElectron() {
        // Renderer process
        if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
            return true;
        }
    
        // Main process
        if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
            return true;
        }
    
        // Detect the user agent when the `nodeIntegration` option is set to true
        if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
            return true;
        }
    
        return false;
    }

    function toggle(){
        setMenuOpen(!isMenuOpen)    
    }

    return <>

        <div className='w-full dark:text-neutral-300 drag-window px-2 justify-between h-[var(--h-nav)] bg-white dark:bg-neutral-900 border-b-[1px] flex items-center border-neutral-200 dark:border-neutral-700/50'>
                
            <div className='no-drag-window flex gap-4 px-2 items-center'>   
                {!isMobile ?<>
                    <Logo className='w-[30px] h-[30px]' />
                    <h1 className='text-[20px]'>InvManager</h1>
                </>: <>
                    <div onClick={toggle}>
                        { !isMenuOpen ? <Icon.Bars3Icon className='w-[30px] h-[30px]' /> :  <Icon.XMarkIcon className='w-[30px] h-[30px]' /> }
                    </div>
                </>}
            </div> 

            {!isMobile ? <Input placeholder={t('SEARCH')+'...'} Icon={Icon.MagnifyingGlassIcon} className={'no-drag-window w-[30%] max-w-[500px]'} /> : null}

            <div className={`flex no-drag-window items-center gap-4 px-2 ${ isElectron ? 'mr-[130px]' : ''}`}>
                <div>
                    <h1 className='text-[16px]'>{info?.name}</h1>
                    <h5 className='opacity-40 text-[14px text-right w-full'>{user?.name}</h5>
                </div>
                <Icon.ComputerDesktopIcon className='w-[30px] h-[30px]'/>
            </div>

        </div>



        <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} >

            {MENU_ITEMS.filter((item) => item.condition?.() ?? true).map((item, index) => <MenuItem index={index} IconFull={item.IconFull} key={index} Icon={item.Icon} path={item.path} >{t(item.name)}</MenuItem>)}

        </Menu>
        
        <AnimatePresence>
            { isMenuOpen ? <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='bg-black/70 absolute w-full h-full z-10' /> : null}
        </AnimatePresence>
    </>
}


function Menu({children, isOpen, setOpen}){

    //  const [isOpen, setOpen] = useState(false)
    const [scope, animate] = useAnimate()
    let isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    
    function onClick(name){
       if(isMobile)setOpen(false)
    }




    useEffect(() => {

        if(scope.current){

            

            animate(scope.current, {
                width: isOpen ? 250 : isMobile ? 0 : 65,
                opacity: isMobile ? isOpen ? 1 : 0 : 1
            })
        }
       

    }, [isOpen, isMobile])

    return <>


        {(!isMobile || isOpen) ? <motion.div  onHoverStart={() => !isMobile && setOpen(true)} onHoverEnd={() => !isMobile && setOpen(false)} ref={scope}  className={`h-[calc(100%-var(--h-nav))] border-r-[1px] border-neutral-200 dark:border-neutral-700/50 pt-2 w-[var(--w-nav)] top-[var(--h-nav)] max-md:w-[70%] left-0 overflow-hidden  z-50 dark:text-neutral-300 text-gray-900 dark:bg-neutral-900 bg-white absolute px-2 select-none flex flex-col gap-0`}>

            {React.Children.map(children, (child) => {

            return child ? React.cloneElement(child, {
                onClick,
                isOpen
            }) : null;
            
            })}

        </motion.div> : null}


    </>
}

function MenuItem({onClick, path, Icon, IconFull, index, children, isOpen}){

    const navigate = useNavigate()
    const location = useLocation()

    function handleClick(){
        navigate(path, { replace: true })
        if(onClick)onClick(children)
    }

    function getPath(){ 
        return '/'+location.pathname.split('/').at(1)
    }

    return <motion.div onClick={handleClick} whileHover={{ transitionDuration: 200 }} exit={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} initial={{x: -50, opacity: 0}} transition={{delay: index * .05, type: 'keyframes', ease: 'easeIn'}} className={`relative h-[50px] cursor-pointer overflow-hidden px-3 flex items-center gap-4  ${(getPath() === path) ? 'bg-blue-600/10 text-primary' : 'hover:bg-neutral-100/50 dark:hover:bg-neutral-700/10 dark:text-neutral-200'}  rounded-md  text-neutral-950`} >
        
        {getPath() === path ? <motion.div animate={{height: '35%'}} exit={{height: '0'}} initial={{height: '0'}} className=' absolute left-0 rounded-full w-[3px] h-[35%] bg-primary' /> : null}

        <div className={`flex justify-center items-center`}>
            { Icon && (getPath() === path ? <motion.div animate={{rotate: [0, 10, 0]}} initial={{scale: 1}}><IconFull  className={`w-[25px] h-[22px] text-primary`}  /></motion.div> : <Icon  className={`w-[25px] opacity-80 h-[22px]`}  /> ) }
        </div>

        <AnimatePresence>
            {isOpen ? <motion.h1 animate={{ opacity : 1}} initial={{ opacity: 0 }} exit={{opacity : 0}}  className='right-2 whitespace-nowrap text-[14px] font-light'>{children}</motion.h1> : null}
        </AnimatePresence>

    </motion.div>
}