import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion';
import { Button, HorizontalScroll, Input } from "../components"
import Icon from '@heroicons/react/24/outline'
import useServer from "../hooks/useServer"

export default function ProductForm(){
    
    const location = useLocation()
    const navigate = useNavigate()
    const { get, post } = useServer()
    const imagePicker = useRef();

    const [name, setName] = useState('')
    const [fields, setFields] = useState([])
    const [image, setImage] = useState(null)

    function onImageSelected(ev){

        let img = ev.target.files[0];
        if(img){
            setImage(URL.createObjectURL(img))
        }

    }

    function handlePickImage(){

        imagePicker.current.click()

    }

    async function fetchFields(){


        if(location.state?.category ?? false){

            setFields(await get('/product/fields', { category : location.state.category }))

        }
    }

    useEffect(() => {

        fetchFields()

    }, [])


    async function handleSubmit(finish){

        try{

            await post('/product', {
                name,
                category : location.state?.category ?? null
            })

            finish({
                text: 'Produit ajouté !',
                Icon: Icon.CheckIcon,
                color: 'var(--green)'
            }).onAnimationEnd(() => {
                navigate(-1)
            })  

        }catch(err){

            finish({
                text: 'Erreur !',
                Icon: Icon.XMarkIcon,
                color: 'var(--red)'
            })

        }
    }
    

    return <div className="dark:text-neutral-100 flex flex-col items-center h-full dark:scrollbar-dark overflow-y-auto pb-5">

         <div className="relative max-w-[600px] xl:max-w-[50%] w-full pt-10">

            <h1 className="font-bold text-2xl">Nouveau produit {location.state?.category?.name ?? null}</h1>

            <p className="opacity-60">Le produit sera listé sous la categorie <span className="text-blue-500"> {location.state?.category?.name}</span></p>

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />
            <div className="flex">
                <div onClick={handlePickImage} className="w-[150px] h-[150px] dark:bg-neutral-600 bg-neutral-100 rounded-lg flex items-center relative justify-center md:hover:opacity-50 cursor-pointer overflow-hidden">
                        {
                            image ? <img  src={image} /> : <>
                                <Icon.PhotoIcon className="w-[60px] h-[60px] text-neutral-500" />
                                <Icon.PlusIcon className="text-neutral-500 w-[30px] h-[30px] absolute bottom-1 right-1" />
                            </>
                        }
                            
                </div> 

                <div className="px-3">
                    
                    <h1>Selectioner une image</h1>
                    <h1 className="opacity-50">Format recommender: .png .jpg </h1>



                </div>
            </div>
            

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            <input onChange={onImageSelected} ref={imagePicker} type="file" className="hidden" />

            <Input value={name} setValue={setName} label={'Nom du produit'} placeholder={''} Icon={Icon.DocumentIcon} />
            <h3 className="opacity-40 mt-5 mb-2">Références</h3>

            <ReferenceTable headers={[
                {text: 'Code', Icon: Icon.DocumentIcon, id: 'code'},
                {text: 'Vendeur', Icon: Icon.BuildingStorefrontIcon, id: 'vendorName'},
                {text: 'Prix de vente', Icon: Icon.BanknotesIcon, id: 'salePrice'},
                {text: 'Prix d\'achat', Icon: Icon.BanknotesIcon, id: 'buyPrice'},
                {text: 'Quantité', Icon: Icon.RectangleStackIcon, id: 'quantity'},

            ]} />

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            {
                fields.length > 0 ? fields.map((field) => <Input className={'mt-5'} label={field.name} />)
                :
                <div className="flex justify-center items-center flex-col select-none opacity-50"> 
                    <h1>Aucun champs de categorie</h1>
                </div>
            }



            { fields.length > 0  ? <div className="h-[1px] w-full bg-neutral-500/50 my-5" /> : null}

            <div className="h-[1px] w-full bg-neutral-500/50 my-5" />

            <div className="w-full flex items-center justify-end" >
                <Button process={handleSubmit} className={'w-[200px]'} Icon={Icon.PlusIcon} >Nouveau Produit</Button>
            </div>

        </div>   

    </div>
}



function ReferenceTable({references, headers}){

    const [refs, setRefs] = useState([{}])

    useEffect(() => {

        let lastRow = refs.at(-1);

        if(Object.keys(lastRow).length > 0){

            setRefs([...refs, {}])

        }

    }, [refs])
    

    return <div className="border-[1px] border-collapse border-neutral-700 rounded-lg overflow-hidden">
       
        <div className="w-full bg-neutral-800 border-collapse ">

                <Headers headers={headers} />

                {refs.map((val, index) => <ReferenceRow setRefs={setRefs} key={index} refs={refs} index={index} headers={headers} />)}
            
        </div>
        
       
    </div>

}

function Headers({headers}){

    return <div className="flex">
        { headers.map((head, index) => <Head key={index} text={head.text} Icon={head.Icon} />) }
    </div>

}

function Head({Icon, text}){
    return <div className="w-full flex gap-2 relative items-center whitespace-nowrap justify-between border-[1px] flex-1 bg-neutral-900 text-neutral-400 h-[30px] text-left px-1 border-collapse border-neutral-700">
            <h1 className="whitespace-nowrap w-[70%] truncate">{text}</h1>
            {Icon ? <Icon className='w-[18px] absolute right-2  h-[18px]' /> : null}
        </div>
 
}

function ReferenceRow({refs, setRefs, index, headers}){

    const [isHover, setHover] = useState(false)

    function handleChange(id, value){

        console.log(id, value)

        let refsCopy = [...refs];

        refsCopy[index][id] = value;

        setRefs(refsCopy);

    }

    function handleDelete(){

        

    }

    return <motion.div onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} className="flex items-center">
    
    { headers.map((head, key) => <Data id={head.id} placeholder={head.text} setRow={handleChange} row={refs[index]} key={key} />) }

    {
        isHover ? 
        <Icon.TrashIcon onClick={handleDelete} className="absolute hover:bg-neutral-700 p-1 cursor-pointer right-2 w-[25px] h-[25px] rounded-md"/>
        :
        null
    }

    </motion.div>
}

function Data({id, row, setRow, placeholder}){

    function handleChange({target}){

        let newValue = target.value;

        setRow(id, newValue)

    }

    return <td className="border-[1px] flex-1 p-1 outline-none border-collapse border-neutral-700" placeholder='Code' >
        <input value={row?.[id] ?? ''} placeholder={placeholder} onChange={handleChange} className="bg-transparent placeholder:text-neutral-700 w-full border-none outline-none" />
    </td>
}

