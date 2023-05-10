import { useState } from "react";
import PageConainer from "./PageContainer";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/solid'
export default function Settings(){

    const [deviceName, setDeviceName] = useState(localStorage.getItem('device-name'))


    function handleDeviceNameChange(finish){

        setTimeout(() => {
            finish({
                text: 'Envoyé',
                Icon: Icon.CheckIcon,
                color: '#68BA72'
            })
        }, 3000)

    }

    function handleDevMode(value){

        if(value){
            localStorage.setItem('dev-mode', 'yes')
            console.log(value)
        }else{
            localStorage.removeItem('dev-mode')
        }

    }

    return <PageConainer>

            <Section name={'Appareil'}>
                <Input value={deviceName} setValue={setDeviceName} className='mb-3' label={'Nom de l\'appareil'} placeholder={'Ex: pc bureau...'} />
                <div className="flex justify-end">
                    <Button process={handleDeviceNameChange} width={160} Icon={Icon.ArrowPathIcon} className='' >Mettre à jour</Button>
                </div>
            </Section>

            
            <Section name={'Autres'} className={"h-[70px] flex  items-center justify-between"}>
                <h3 className="ml-3 text-[18px]">Mode developement</h3>
                <CheckBox className='mr-2' defaultValue={!!localStorage.getItem('dev-mode')} onCheck={handleDevMode} />
            </Section>
               
    </PageConainer>


}

function Section({name, children, className}){
    return <>
        <h3 className="ml-3 mt-5">{name}</h3>
        <section className={"m-2 mt-1 bg-neutral-100 rounded-md  p-2  "+className}>
            {children}
        </section>
    </>
}

