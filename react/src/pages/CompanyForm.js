import React, { useRef, useState } from "react"
import useServer from "../hooks/useServer";
import { Button, Input } from "../components";
import Icon from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";

export default function CompanyForm(){


    const imagePicker = useRef();
    const [image, setImage] = useState(null)
    const { post, postImage } = useServer()
    const navigate = useNavigate();
    const [name, setName] = useState('')

    function onImageSelected(ev){

        let img = ev.target.files[0];
        setImage(img)
       
    }

    function handlePickImage(){

        imagePicker.current.click()

    }


    async function handleSubmit(finish){

        try{

            let imageName = await postImage('/company/logo', { image })

            await post('/company', {
                name,
                logo: imageName
            })
    
            finish({
                text: 'Produit ajouté !',
                Icon: Icon.CheckIcon,
                color: 'var(--green)'
            }).onAnimationEnd(() => {
                navigate('/', { replace: true })
            })  

        }catch(err){
            console.log(err)
            finish({
                text: 'Erreur !',
                Icon: Icon.XMarkIcon,
                color: 'var(--red)'
            }) 
        }

      

    }

    return <div className="dark:text-neutral-100 flex flex-col items-center h-full dark:scrollbar-dark overflow-y-auto pb-5">

         <div className="relative max-w-[400px] xl:max-w-[40%] w-full pt-10">

            <h1 className="font-bold text-2xl">New company</h1>

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            <div className="flex">
                <div onClick={handlePickImage} className="w-[150px] h-[150px] dark:bg-neutral-600 bg-neutral-100 rounded-lg flex items-center relative justify-center md:hover:opacity-50 cursor-pointer overflow-hidden">
                    { image ? <img src={URL.createObjectURL(image)} /> : <Icon.PhotoIcon className="w-[30px] h-[30px] opacity-40" />}
                </div>  

                <div className="px-3">
                    
                    <h1>Selectioner une image pour votre logo</h1>
                    <h1 className="opacity-50">Format recommender: .png .jpg </h1>
                    <input onChange={onImageSelected} ref={imagePicker} type="file" className="hidden" />
                </div>
            </div>

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            <Input value={name} setValue={setName} label={'Nom de l\'entreprise'} placeholder={'Bakery, BikeShop...'} />

            <div className="w-full flex items-center mt-5 justify-end" >
                <Button process={handleSubmit} className={'w-[200px]'} Icon={Icon.PlusIcon} >Nouvelle Entreprise</Button>
            </div>
        </div>
    </div>
}