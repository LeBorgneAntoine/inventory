import BackgroundPattern from 'assets/svg/wwwhirl.svg';
import Logo from 'assets/svg/logo.svg';
import { Button, Input } from '../components'
import Icon from '@heroicons/react/24/solid'
import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react'

export default function Register(){

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    function handleRegister(finish){





    }



    return <div className='absolute top-[calc(var(--h-nav)*-1)] flex justify-center items-center h-[calc(100%+var(--h-nav))] w-full'>

        <motion.div className="pointer-events-none fixed h-full w-full" initial={{ opacity: 0, scaleX: .5 }} animate={{ opacity: 1, scaleX: 1 , type: 'linear'}} transition={{ type: "tween", ease: 'easeInOut', duration: .3 }}>
            <BackgroundPattern className='fixed h-full opacity-10 dark:opacity-25' />
        </motion.div>


        <form onSubmit={(e) => {
            e.preventDefault()
            handleRegister()
        }} className='flex flex-col items-center gap-2 w-full max-w-[400px] p-3 max-md:max-h-[700px] overflow-auto'>

            <div className='w-[70px] h-[70px] bg-transparent flex justify-center items-center'>
                <Logo className='w-full h-full mb-4' /> 

            </div>

            <h1 className='dark:text-neutral-200 text-center text-2xl font-bold mb-4 '>Créer un compte</h1>

            <Input className={'w-full'} setValue={setFullName} value={fullName} label={'Nom et Prénom'} placeholder={'Ex: joe Dupond...'} Icon={Icon.UserIcon} />

            <Input className={'w-full'} setValue={setUsername} value={username} label={'Nom d\'utilisateur'} placeholder={'Ex: joeDupond12...'} Icon={Icon.UserIcon} />

            <Input className={'w-full'} setValue={setEmail} value={email} type={'email'} label={'Email'} placeholder={'Ex: example@mail.com...'} Icon={Icon.AtSymbolIcon} />

            <Input strength={[

                (value) => String(value).length > 8 ? true : 'Minimum 8 charactères',
                (value) => /[A-Z]/g.test(value) ? true : 'Au moins une majuscule',
                (value) => /[a-z]/g.test(value) ? true : 'Au moins une minuscule',
                (value) => /[0-9]/g.test(value) ? true : 'Au moins un chiffre',
                (value) => /[&é"'(-è_çà)=$*^ù!:;,¨^£µ%§/.?+°²]*/g.test(value) ? true : 'Au moins un symbole',

            ]} setValue={setPassword} value={password} className={'w-full mt-5'} type={'password'} label={'Mot de passe'} placeholder={'mot de passe...'} Icon={Icon.LockClosedIcon} />

            <Input error={password !== confirm ? 'Ne correspond pas' : false} className={'w-full'} setValue={setConfirm} value={confirm} type={'password'} label={'Confirmer mot de passe'} placeholder={'confirmer...'} Icon={Icon.LockClosedIcon} />


            <Button className={'w-full mt-5'} >Créer mon compte</Button>

            <input type='submit' className='hidden' />
        </form>

        <div className="absolute bottom-2 flex gap-1 items-center mt-3">
                <h3 className="dark:text-neutral-500">Déjà un compte ?</h3>
                <a className="text-blue-500" href="/login">Se connecter</a>
        </div>

    </div>
}