import { useState } from "react";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import Button from "../components/Button";
import SolidIcon from '@heroicons/react/24/solid'
import useServer from "../hooks/useServer";
import {motion} from 'framer-motion';
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Switch } from "../components";
import React from 'react'

const LANGUAGES = [{name: 'Français', value: 'fr'},{name: 'English', value: 'en'}]

export default function Settings(){

    const [deviceName, setDeviceName] = useState(localStorage.getItem('device_name'))
    const [deviceNameError, setDeviceNameError] = useState(null)
    const { disconnect } = useAuth()
    const { get, post } = useServer()
    const {t, i18n} = useTranslation()
    const { user } = useAuth()

    async function handleDeviceNameChange(finish){


        try{

            await post('/device/rename', {name: deviceName, current: localStorage.getItem('device_name')})

            localStorage.setItem('device_name', deviceName)

            finish({
                text: 'Mis à jour !',
                SolidIcon: SolidIcon.CheckIcon,
                color: '#72b469'
            })

        }catch(err){

            setDeviceNameError(err.response.data)

            finish({
                text: 'Erreur !',
                Icon: SolidIcon.ExclamationCircleIcon,
                color: '#d55656'
            })

        }

       
    }

    function handleDevMode(value){

        if(value){
            localStorage.setItem('dev-mode', 'yes')
        }else{
            localStorage.removeItem('dev-mode')
        }

    }

    function handleDisconnect(){

        disconnect()



    }

    function handleChangeTheme({target}){

        let theme = target.value

        localStorage.setItem('theme', theme)

        if(theme == 'light'){
            document.querySelector('meta[name="theme-color"]').setAttribute('content', 'white');
            document.body.classList.remove('dark')
        }else if(theme == 'dark'){
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#171717');
            document.body.classList.add('dark')
        }

    }

    function handleChangeLanguage({target}){

        let lang = target.value

        localStorage.setItem('lang', lang)

        i18n.changeLanguage(lang)

    }

    return <div className="flex flex-col gap-2 items-center pt-5">

            <Section Icon={SolidIcon.BuildingLibraryIcon} name={t('COMPANY')}>



            </Section>

            <Section editable Icon={SolidIcon.UserIcon} name={t('ACCOUNT')}>

                <div className="text-[18px] flex flex-col mx-5">
                    <div className="flex items-center gap-2 border-b-[1px] dark:border-neutral-800 h-[60px] px-2">
                        <h3 className="w-full select-text flex justify-between" ><span  className="opacity-40 select-none">{t('USERNAME')} </span> {user.name} </h3> 
                    </div>
                    <div className="flex items-center gap-2 border-b-[1px] dark:border-neutral-800 h-[60px] px-2">
                        <h3 className="opacity-40" ><span>{t('EMAIL')}</span> {user.mail} </h3> 
                    </div>
                </div>
                 

                <Button className={'mt-5'} key={i18n.language} onClick={handleDisconnect} >{t('DISCONNECT')}</Button>

            </Section>

            <Section Icon={SolidIcon.DevicePhoneMobileIcon} name={t('DEVICE')}>

                <Input focus={(isFocus) => {if(isFocus)setDeviceNameError(null)}} error={!!deviceNameError} value={deviceName} setValue={setDeviceName} label={t('DEVICE_NAME')} placeholder={t('DEVICE_NAME_EX')} />

                { deviceNameError && 
                
                    <div className="ml-2 mt-1 flex items-center gap-2 text-red-500">
                        <SolidIcon.ExclamationCircleIcon className="w-[20px] h-[20px]" />
                        <h1>{deviceNameError}</h1>
                    </div>

                }

                <div className="flex justify-end mt-3">
                    <Button key={i18n.language} className={'w-[160px]'} process={handleDeviceNameChange} Icon={SolidIcon.ArrowPathIcon} >{t('UPDATE_ACTION')}</Button>
                </div>

            </Section>

            <Section name={t('PRINTER')}>

            </Section>

            <Section Icon={SolidIcon.PaintBrushIcon} name={t('CUSTOMIZATION')} className={"flex flex-col gap-5 items-center justify-between dark:text-neutral-300"}>
                <div className={"w-full flex items-center justify-between"}>
                    <h1>{t('LANGUAGES')}</h1>

                    <select className="w-[200px] select-none hover:opacity-75 cursor-pointer outline-none h-[40px] rounded-lg px-1 bg-neutral-100 dark:bg-neutral-800" onChange={handleChangeLanguage} defaultValue={i18n.language} onSelect={(e) => console.log(e)}>
                        {LANGUAGES.map((lang, index) => <option key={index} value={lang.value}>{lang.name}</option>)}
                    </select>
                </div>

                <div className={"w-full flex items-center justify-between"}>
                    <h1>{t('THEME')}</h1>

                    <select defaultValue={localStorage.getItem('theme')} className="w-[200px] select-none hover:opacity-75 cursor-pointer outline-none h-[40px] rounded-lg px-1 bg-neutral-100 dark:bg-neutral-800" onChange={handleChangeTheme}>
                        <option value={'light'}>{t('LIGHT')}</option>
                        <option value={'dark'}>{t('DARK')}</option>
                    </select>
                </div>

            </Section>

            <Section name={t('OTHER')} className={"h-[40px] flex  items-center justify-between dark:text-neutral-300"}>
                <h3 className="ml-3 text-[18px]">{t('DEV_MODE')}</h3>
                <Switch className='mr-2' defaultValue={!!localStorage.getItem('dev-mode')} onCheck={handleDevMode} />
            </Section>
            

            
               
    </div>


}

function Section({name, editable, Icon, children, className}){

    return <div className="md:max-w-[700px] md:w-[50%] select-none p-2 w-full relative flex flex-col items-center border-[1px] border-neutral-100 dark:border-neutral-700/20 dark:bg-neutral-800/20 bg-neutral-50/50 text-neutral-800 dark:text-neutral-200 rounded-lg">


        <div className="flex w-[calc(100%-25px)] gap-2 items-center mt-2 relative opacity-60 mx-2 dark:text-neutral-50">
          
            <h3 className="text-[20px] font-semibold">{name}</h3>
            { editable ? <SolidIcon.PencilIcon className=" text-neutral-200 p-[4px] cursor-pointer absolute right-1 w-[25px] h-[25px] rounded-full hover:bg-neutral-700" /> : null }
        </div>

        <div className="h-[1px] w-[calc(100%-20px)] bg-neutral-500/20 dark:bg-neutral-500/50 mb-8 mt-2" />

        <motion.section className={"mt-1 rounded-xl w-full"}>
            <div className={className}>
                {children}
            </div>
        </motion.section>


    </div>
}

