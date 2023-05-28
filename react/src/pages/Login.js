import { Button, Input } from "../components";
import Icon from '@heroicons/react/24/solid'
import {  ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import useServer from "../hooks/useServer";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as BackgroundPattern } from '../assets/svg/wwwhirl.svg'
import { ReactComponent as Logo } from '../assets/svg/logo.svg'
import { motion } from 'framer-motion'
import useAuth from "../hooks/useAuth";
import validator from "validator";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const { post } = useServer()

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const loginButton = useRef(null)
    const { auth } = useAuth()
    const [company, setCompany] = useState(null)
    
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {

        let [companyName, username] = usernameOrEmail.split('\\');

        if(username){

            setCompany(companyName);
            setUsername(username);

        }else{

            setCompany(null);

        }
    

    }, [usernameOrEmail])

    async function handleLogin(finish) {
        
        document.activeElement.blur()

        try{

            await auth(usernameOrEmail, password)

            if(finish)finish({
                text: 'Connecté !',
                Icon: Icon.CheckIcon,
                color: '#83bc67'
            }).onAnimationEnd(() => {
                navigate('/', { replace: true })
            })

        }catch(err){

            if(finish)finish({
                text: 'Erreur',
                Icon: Icon.XMarkIcon,
                color: '#ec4e4e'
            })

            setErrorMessage(err.response.data)
        }

    }




    return <div className="absolute top-0 left-[calc(var(--w-nav)*-1)] flex max-md:justify-center items-center h-full w-[calc(100%+var(--w-nav))]">


      

        <div className="flex-1 flex flex-col justify-center items-center overflow-hidden z-1">

            <motion.div className="pointer-events-none fixed h-full w-full" initial={{ opacity: 0, scaleX: .5 }} animate={{ opacity: 1, scaleX: 1 , type: 'linear'}} transition={{delay: .2, type: "tween", ease: 'easeInOut', stiffness: 100 }}>
                <BackgroundPattern className='h-full opacity-10 dark:opacity-25 ' />
            </motion.div>


            <form onSubmit={(e) => {
                e.preventDefault()
                loginButton.current.click()
                console.log(loginButton.current)
            }} className="flex flex-col gap-3 z-1 items-center justify-center md:w-[400px] max-md:w-full m-5 rounded-m"> 

                <Logo className='w-20 h-20 mb-4' />

                <h1 className="text-[25px] font-black text-center dark:text-white">Connectez vous à {company ? company : 'Inventory'}</h1>

                <Input error={errorMessage} focus={(isFocus) => setErrorMessage(null)} value={usernameOrEmail} setValue={setUsernameOrEmail} label={'Nom d\'utilisateur ou mail'} className={"w-[calc(100%-20px)]"} placeholder={'example@mail.com'} Icon={Icon.UserIcon} />
                <Input error={errorMessage} focus={(isFocus) => setErrorMessage(null)} value={password} setValue={setPassword} label={'Mot de passe'} className={"w-[calc(100%-20px)]"} placeholder={'********'} type={'password'} Icon={Icon.LockClosedIcon} />

                {errorMessage ?<div className="text-red-400 flex gap-2 items-center">
                    <Icon.ExclamationCircleIcon className="w-[25px] h-[25px] " />
                    <h3>{errorMessage}</h3>
                </div>  : null}

                <a href="#" className=" w-[calc(100%-30px)] text-right opacity-30 dark:text-neutral-300">Mot de passe oublié</a>

                <div className="w-full flex flex-col items-center justify-end mt-3 z-2">
                    <Button refAction={(ref) => { loginButton.current = ref }} process={handleLogin} className={'w-[calc(100%-20px)]'} Icon={Icon.ArrowRightOnRectangleIcon}>Se connecter</Button>
                </div>

                <input type='submit' className='hidden' />
               

            </form>


            <div className="w-[calc(100%-50px)] max-w-[400px] rounded-full flex mt-5 mb-5 justify-center items-center">
                <div className="h-[2px] w-[100px] bg-neutral-200  dark:bg-neutral-700 rounded-full" />
                <h3 className="text-neutral-400 text-center mx-6 ">ou</h3>
                <div className="h-[2px] w-[100px] bg-neutral-200  dark:bg-neutral-700 rounded-full" />
            </div>

            <div className="cursor-pointer rounded-md p-2 bg-neutral-100 dark:bg-neutral-900">
                <GoogleIcon className='w-[30px] h-[30px]' />
            </div>

            <div className="absolute bottom-2 flex gap-1 items-center mt-3">
                <h3 className="dark:text-neutral-500">Auccun compte ?</h3>
                <a className="text-blue-500 md:hover:text-blue-400 duration-200" href="/register">Créer un compte</a>
            </div>


        </div>


    </div>

}

