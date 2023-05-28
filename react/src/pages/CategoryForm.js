import { useEffect, useRef, useState } from "react";
import { Button, Input } from "../components";
import Icon from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion';
import useServer from "../hooks/useServer";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import useCompany from "../hooks/useCompany";

export default function CategoryForm(){

    const [fields, setFields] = useState([])
    const [categoryName, setCategoryName] = useState('');
    const { post, get } = useServer()
    const location = useLocation()
    const navigate = useNavigate()

    function handleNewField(emptyField){
        setFields([...fields,emptyField]);
    }

    async function onSubmit(finish){

        try{

            await post('/category', {
                name: categoryName,
                parent : Number(location.state?.category?.id) ?? null,
                fields,
            })

            finish({
                text: 'Validé',
                color: 'var(--green)',
                Icon: Icon.CheckIcon
            }).onAnimationEnd(() => {
                navigate(-1)
            })

        }catch(err){
            console.log(err)
            finish({
                text: 'Erreur',
                color: 'var(--red)',
                Icon: Icon.XMarkIcon
            })
        }

       

    }

    return <div className="dark:text-neutral-100 flex flex-col items-center h-full dark:scrollbar-dark overflow-y-auto p-2 pb-5">

        <div onClick={() => navigate(-1, {replace: true})} className="absolute top-2 left-2 py-2 px-3 bg-neutral-800 rounded-lg flex gap-2 items-center select-none xl:hover:opacity-25 cursor-pointer">
            <Icon.ChevronLeftIcon className="w-[20px] h-[20px]" />
            <h1>Annuler</h1>
        </div>

         <div className="relative max-w-[600px] w-full pt-10">

            <h1 className="font-bold text-2xl">Nouvelle categorie</h1>

            <p className="opacity-60">Une categorie contiens une liste de produits</p>

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />
            
            <Input value={categoryName} setValue={setCategoryName} Icon={Icon.InboxIcon} placeholder={'Fleurs, Moteurs...'} label={'Nom de cette categorie *'} />

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />
            <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-lg">Champs</h1>
                <AddButton onNew={handleNewField} />
            </div>
            <div className=" flex items-center gap-2 opacity-60 mb-3">
                <Icon.InformationCircleIcon className="w-[20px] h-[20px]" />
                <p>Les champs 
                    <span className="text-blue-500"> Nom</span>, 
                    <span className="text-blue-500"> Photo</span> et
                    <span className="text-blue-500"> Références</span> sont déja ajoutés par défaut.</p>
            </div>

            <div className="flex flex-col gap-3">
                    {
                        fields.length > 0 ? 
                        
                            
                                fields.map((value, index) => <Field key={index} fields={fields} index={index} field={value} setFields={setFields} />) 
                            
                        
                        
                        : <div className="flex items-center my-5 flex-col justify-center">
                            <h1 className="text-lg">Aucun champ</h1>
                            <div className=" flex items-center gap-2 opacity-60">
                                <Icon.InformationCircleIcon className="w-[20px] h-[20px]" />
                                <p>Au moins un champ est requis</p>
                            </div>
                        </div>
                    }
                
            </div>
           

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            <div className="w-full flex items-center justify-end" >
                <Button process={onSubmit} className={'w-[200px]'} Icon={Icon.PlusIcon} >Nouvelle categorie</Button>
            </div>



        </div>   

    </div>

}

function AddButton({onNew}){


    function handleClick(){
        
        onNew({})

    }


    return  <div onClick={handleClick} className="select-none cursor-pointer xl:hover:opacity-50 duration-100 flex gap-2 p-2 px-3 items-center bg-neutral-200 dark:bg-neutral-600/50 rounded-lg">
            <h1 className="">Ajouter un champ</h1>
            <Icon.PlusIcon className="w-[20px] h-[20px] pointer-events-none" />
        </div>

}

function Field({field, fields, setFields, index}){



    function handleChange(newValue){

        let fieldsCopy = [...fields];

        fieldsCopy[index].value = newValue;

        setFields(fieldsCopy)

    }

    function handleDelete(){

        let fieldsCopy = [...fields];

        console.log(index)

        console.log(fieldsCopy.splice(index, 1))

        setFields(fieldsCopy)

    }


    return <motion.div
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    initial={{ scale: 0.8, opacity: 0  }}
    transition={{ type: "spring" }}
    className="p-3 flex flex-col gap-3 relative w-full rounded-lg bg-neutral-200/40 border-[1px] border-neutral-800 dark:bg-neutral-800/30">

        <Input value={field.value ?? ''} Icon={Icon.AdjustmentsHorizontalIcon} setValue={handleChange} placeholder={'Taille, Age...'} label={'Nom du champ'} />
        
        <div className="flex justify-end items-center">
            <div onClick={handleDelete} className="bg-[var(--red)] text-white select-none cursor-pointer opacity-50 xl:hover:opacity-100 p-2 top-1 flex items-center gap-2 rounded-lg" >
                <Icon.TrashIcon className="w-[20px] h-[20px]" />
                <h1>Supprimer le champ</h1>
            </div>  
        </div>

    </motion.div>


}