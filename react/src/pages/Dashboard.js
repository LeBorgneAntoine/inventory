import { Suspense, useEffect, useRef, useState } from "react";
import { Button, Input, Skeleton } from "../components";
import {AnimatePresence, motion} from 'framer-motion'
import Icon from '@heroicons/react/24/outline'
import useServer from "../hooks/useServer";
import { ReactComponent as BackgroundPattern } from '../assets/svg/wwwhirl.svg'
import useCompany from "../hooks/useCompany";

export default function Dashboard(){

    const [needSetup, setNeedSetup] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { get } = useServer()
    const { currentCompany, switchCompany } = useCompany()

    const [testValue, setTest] = useState('')

    async function fetchCompany(){

        try{

            let companies = await get('/company')

            console.log('companies', companies)

            if(companies){

                if(companies.length === 0){
                    setNeedSetup(true);
                }else{
                    switchCompany(companies[0])
                }

            }

            

        }catch(err){
            console.log('err',err)
        }


    }

    useEffect(() => {

        fetchCompany()

    }, [needSetup])



    return <div className="w-full h-full relative">

        {currentCompany ? <div className="p-2 text-neutral-100">

            <h1 className=" text-2xl">{currentCompany?.name}</h1>

        </div> : null}
        
        <SetupCompany isOpen={needSetup} setOpen={setNeedSetup} />

    </div>
}

function SetupCompany({isOpen, setOpen}){

    const filePicker = useRef();
    const [image, setImage] = useState(null)
    const [imgFile, setImgFile] = useState(null)
    const { post, get } = useServer()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    
    
    function handleOnChooseImage(){

        filePicker.current.click()

    }

    function onChooseImage(ev){

        let img = ev.target.files[0];
        if(img){
            setImage(URL.createObjectURL(img))
            setImgFile(img)
        }
    }   

    async function handleCreateClick(finish){

        try{


         

            //await post('/company/logo', { logo : imgFile})

            await post('/company' , {
                name,
                description
            })
            
            finish({
                text: 'Ajouté !',
                color: 'var(--green)',
                Icon: Icon.CheckIcon
            }).onAnimationEnd(() =>  {

                setOpen(false);

            })

        }catch(err){

            console.log(err)

            finish({
                text: 'Erreur !',
                color: 'var(--red)',
                Icon: Icon.XMarkIcon
            })

        }

       


    }

    

    return <>
        <AnimatePresence>
            {
                isOpen ?  <motion.div animate={{y: '-50%',x: '-50%', opacity: 1}} initial={{y: '-40%',x: '-50%', opacity: 0}} className="absolute w-[400px] dark:bg-neutral-900 bg-white rounded-lg left-[50%] top-[50%] translate-x-[-50%] p-2 translate-y-[-50%] drop-shadow-lg">
                <form className="flex w-full h-full flex-col gap-5 content-evenly">
                    <div className="flex items-center gap-3">
                        <div onClick={handleOnChooseImage} className="w-[150px] h-[150px] dark:bg-neutral-600 bg-neutral-100 rounded-lg flex items-center relative justify-center md:hover:opacity-50 cursor-pointer overflow-hidden">
                            {
                                image ? <img  src={image} /> : <>
                                    <Icon.PhotoIcon className="w-[60px] h-[60px] text-neutral-500" />
                                    <Icon.PlusIcon className="text-neutral-500 w-[30px] h-[30px] absolute bottom-1 right-1" />
                                </>
                            }
                           
                        </div>    
                        <input onChange={onChooseImage} ref={filePicker} type="file" className="hidden" />
                        <div className=" h-[150px] flex-1 pt-3">
                            <h1 className="text-lg text-center dark:text-neutral-100 text-neutral-900 font-bold">Ajouter une entreprise</h1>
                            <p className="dark:text-neutral-400 text-neutral-600 text-center">
                                au moins une entreprise est requise
                            </p>
                        </div>
                    </div>
                    <Input setValue={setName} value={name} placeholder={'BikeShop, Saler...'} label={'Nom de l\'entreprise *'} />
                    <div className="w-full">
                    <h3 className="text-neutral-500 mb-2 ml-2">Description</h3>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Vends des articles de..." className="dark:bg-neutral-800 bg-neutral-100 h-[100px] rounded-lg w-full border-[.5px] border-neutral-200 dark:border-neutral-600 dark:focus:border-neutral-500 focus:border-neutral-300 outline-none p-2 text-neutral-300" />
                    </div>
                    
                    <Button process={handleCreateClick} Icon={Icon.PlusIcon} >Ajouter l'entreprise</Button>
                </form>
    
        </motion.div> : null
            }
        </AnimatePresence>
       
    </>
}