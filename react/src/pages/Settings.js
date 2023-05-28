import { useState } from "react";
import PageConainer from "./PageContainer";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/solid'
import useServer from "../hooks/useServer";
import {motion} from 'framer-motion';
import useMeasure from "react-use-measure";
import useAuth from "../hooks/useAuth";

export default function Settings(){

    const [deviceName, setDeviceName] = useState(localStorage.getItem('device_name'))
    const [deviceNameError, setDeviceNameError] = useState(null)

    const { disconnect } = useAuth()
    const { get, post } = useServer()

    async function handleDeviceNameChange(finish){


        try{

            await post('/device/rename', {name: deviceName, current: localStorage.getItem('device_name')})

            localStorage.setItem('device_name', deviceName)

            finish({
                text: 'Mis à jour !',
                Icon: Icon.CheckIcon,
                color: '#72b469'
            })

        }catch(err){

            setDeviceNameError(err.response.data)

            finish({
                text: 'Erreur !',
                Icon: Icon.ExclamationCircleIcon,
                color: '#d55656'
            })

        }

       
    }

    function handleDevMode(value){

        if(value){
            localStorage.setItem('dev-mode', 'yes')
            console.log(value)
        }else{
            localStorage.removeItem('dev-mode')
        }

    }

    function handleDisconnect(){

        disconnect()



    }

    return <div className="flex flex-col items-center">


            <Section Icon={Icon.UserIcon} name={'Compte'}>

                <Button onClick={handleDisconnect} >Se Déconnecter</Button>

            </Section>

            <Section Icon={Icon.DevicePhoneMobileIcon} name={'Appareil'}>
                <Input focus={(isFocus) => {if(isFocus)setDeviceNameError(null)}} error={!!deviceNameError} value={deviceName} setValue={setDeviceName} label={'Nom de l\'appareil'} placeholder={'Ex: pc bureau...'} />
                {deviceNameError && 
                
                <div className="ml-2 mt-1 flex items-center gap-2 text-red-500">
                    <Icon.ExclamationCircleIcon className="w-[20px] h-[20px]" />
                    <h1>{deviceNameError}</h1>
                </div>

                }

                <div className="flex justify-end mt-3">
                    <Button className={'w-[160px]'} process={handleDeviceNameChange} Icon={Icon.ArrowPathIcon} >Mettre à jour</Button>
                </div>

            </Section>

            
            <Section name={'Autres'} className={"h-[40px] flex  items-center justify-between text-neutral-300"}>
                <h3 className="ml-3 text-[18px]">Mode developement</h3>
                <CheckBox className='mr-2' defaultValue={!!localStorage.getItem('dev-mode')} onCheck={handleDevMode} />
            </Section>

            
               
    </div>


}

function Section({name, Icon, children, className}){

    return <div className="md:max-w-[700px] md:w-[50%] w-full">

        <div className="flex gap-2 items-center mt-5 ml-3 opacity-60 dark:text-neutral-300">
            {Icon && <Icon className='w-[20px] h-[20px]' />}
            <h3 >{name}</h3>
        </div>

        <div className="h-[1px] w-full bg-neutral-500/50 mb-5 mt-2" />

        <motion.section className={"m-2 mt-1 rounded-xl  p-2 "}>
            <div className={className}>
                {children}
            </div>
        </motion.section>


    </div>
}

