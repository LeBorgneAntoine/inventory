import { useEffect, useRef, useState } from "react";
import FolderSheet from "../components/FolderSheet";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useAnimate, useMotionValueEvent, useScroll } from 'framer-motion';
import useSize from "../hooks/useSize";
import Axios from 'axios';
import useFolder from "../hooks/useFolder";
import BottomSheet from "../components/BottomSheet";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Input from "../components/Input";
import { CheckBox, HorizontalScroll, Skeleton } from "../components";
import { ReactComponent as BackgroundPattern } from '../assets/svg/wwwhirl.svg'
import Table from "../components/Table";
import useServer from "../hooks/useServer";
import useContextMenu from "../hooks/useContextMenu";
import { useTranslation } from "react-i18next";
import {Buffer} from 'buffer';
import React from 'react'

export default function Inventory(){

    const [search, setSearch] = useState('');

    const [productSelection, setProductSelection] = useState([]);
    const moveSelection = useRef(false)

    const [global, globalContextMenu] = useContextMenu()
    const [productZone, productZonecontextMenu] = useContextMenu()
    const [gategoryZone, categoryZonecontextMenu] = useContextMenu()

    const navigate = useNavigate()

    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    const { t } = useTranslation()

    const { get, put } = useServer()

    const location = useLocation()

    useEffect(() => {

        fetchCategories()
        fetchProducts()

    }, [location])

    async function moveProduct(){

        let currentCategory = location.state?.category 

        console.log(location)

        for(let selection of productSelection){

            console.log(selection, currentCategory)

            selection.categoryID = currentCategory?.id ?? null
        
            await put('/product' , selection)

        }

        setProductSelection([])
        fetchCategories()
        fetchProducts()
    }

    useEffect(() => {

        if(productSelection.length > 0){

            productZonecontextMenu([
                {text: 'Déplacer la selection ici', Icon: Icon.ArrowDownOnSquareIcon, action: () => moveProduct()}
            ])

        }

    }, [productSelection, location])

    async function fetchCategories(){
        setCategories(null);

        try{
            setCategories(await get('/category', { parent : location.state?.category ?? null }))
        }catch(err){

        }

    }

    async function fetchProducts(){
        setProducts(null);
        try{
            setProducts(await get('/product', { category : location.state?.category ?? null}))
        }catch(err){

        }
    }
   

    return <div ref={global} className="flex flex-col h-full items-center scrollbar dark:scrollbar-dark overflow-y-auto overflow-x-hidden">

                <div className="p-3 w-full max-w-[1600px]">

                    <div className="flex justify-between items-center dark:text-neutral-400 text-neutral-700 mx-2 mb-2 mt-8">
                        <div className="flex gap-2 items-center">
                            <Icon.InboxStackIcon className="w-[20px] h-[20px]" />
                            <h3 className="text-lg ">{t('CATERGORIES')}</h3>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div onClick={() => navigate('/inventory/new-category', {
                                state: {
                                    category: location.state?.category
                                } 
                            })} className="h-[40px] px-3 rounded-md bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 flex gap-3 justify-center items-center text-neutral-700 dark:text-neutral-400 select-none cursor-pointer">
                                <Icon.FolderPlusIcon className="w-[20px] h-[20px]" />
                                <h1>{t('ADD_CATEGORY')}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-neutral-200/50 dark:bg-neutral-200/20 mb-5 mt-2" />
                    
                    <div>

                    <HorizontalScroll>

                        {categories && categories.map((val, index) => <CategoryCard category={val} />)}

                        {categories && categories.length <= 0 ? <div className="w-full relative h-[60px] dark:text-neutral-100 flex flex-col items-center opacity-25 select-none">
                            <Icon.HashtagIcon className="bg-neutral-300/50 rounded-full p-2" />
                            <h1>{t('NO_CATEGORY')}</h1>
                        </div> : null}

                        {!categories ? Array.apply(null, Array(7)).map(() => <Skeleton className={'h-[60px] w-[150px]'} />) : null }

                    </HorizontalScroll>

                    </div>
                    

                       


                    <div className="flex justify-between items-center dark:text-neutral-400 text-neutral-700 select-none  mx-2 mt-8">

                        <div className="flex gap-2 items-center">
                            {/* Categories path */}
                            <Icon.FolderIcon className="w-[20px] h-[20px]" />
                            {
                                location.state?.path ?? false ? location.state.path.map((category, index) => <>
                                    <h2 key={'title'+index} onClick={() => { navigate((location.state.path.length - index)*-1) }} className="xl:hover:opacity-50 opacity-70 cursor-pointer text-lg">{category.name}</h2>
                                    <Icon.ChevronRightIcon key={'icon'+index} className="w-[15px] h-[15px]" />
                                </>) : null 
                            }
                            <h3 className="text-lg text-blue-500">{location.state?.category?.name  ?? t('NO_CATEGORY')}</h3>
                        </div>

                        <div className="flex gap-2 items-center">
                            
                            <div onClick={() => navigate('/inventory/new-product', { state: {
                                category: location.state?.category
                            } })} className="h-[40px] px-3 rounded-md bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 flex gap-3 justify-center items-center text-neutral-700 dark:text-neutral-400 select-none cursor-pointer">
                                <Icon.DocumentPlusIcon className="w-[20px] h-[20px]" />
                                <h1>{t('ADD_PRODUCT')}</h1>
                            </div>
                        </div>

                    </div>

                    <div className="h-[1px] w-full bg-neutral-200/50 dark:bg-neutral-200/20 mb-5 mt-2" />
                        
                    <div ref={productZone} className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 relative">

                        {products && products.map((val, index) => <ProductCard selection={productSelection} setSelection={setProductSelection} product={val} />)}


                        {products && products.length <= 0 ? <div className="absolute h-[100px] w-full gap-4 mt-5 flex flex-col justify-center items-center dark:text-neutral-100 opacity-25 select-none">
                                <Icon.RectangleGroupIcon className="bg-neutral-300/50 rounded-full p-2" />
                                <h1>{t('NO_PRODUCT')}</h1>
                            </div> : null}
                        
                        {!products ? Array.apply(null, Array(5)).map(() => <Skeleton className={'h-[250px] w-[200px]'} />) : null}

                    </div>
                    
                </div>

        </div>
}

function CategoryCard({category, onClick}){

    const navigate = useNavigate()
    const location = useLocation()
    const [ref, menu] = useContextMenu()
    const { t } = useTranslation()

    function open(){

        let path = location.state?.path ?? [{name: 'Sans categorie'}]

        let prevCategory = location.state?.category

        if(prevCategory)path.push(prevCategory);

        navigate('/inventory', { 
            state : {
                path,
                category
            }
        })
    }

    return <div ref={ref} onClick={open} className="flex whitespace-nowrap h-[60px] justify-between gap-4 items-center border-[1px] border-neutral-300/40 dark:border-neutral-300/10 dark:bg-neutral-800 bg-neutral-100/50 xl:hover:opacity-50 duration-200 rounded-md p-1 px-2 pr-5 dark:text-neutral-200 select-none cursor-pointer">
        <div className="flex flex-col gap-[2px]">
            <h1>{category.name}</h1>
            <h3 className="opacity-50 text-[12px]">{category.productsQuantity} {t('PRODUCT')}(s)</h3>
        </div>
    </div>
}

function ProductCard({product, selection, setSelection}){

    const [ref, menu] = useContextMenu()
    const { t } = useTranslation()
    const [image, setImage] = useState(null)
    const { get, getImage } = useServer()

    useEffect(() => {

        async function fetchImage(){

            try{

                let imageData = await getImage(`/product/image/${product.id}`)

                let base64ImageString = Buffer.from(imageData.data , 'binary').toString('base64')
                
                setImage(base64ImageString)
                
            }catch(err){

            }

           
        }

        fetchImage()


    }, [])


    function handleClick(){

        if(selectionMode()){

            toggleSelet()

        }

    }

    function select(){

        setSelection([...selection, product])

    }

    function toggleSelet(){

        if(isSelected()){
            unSelect()
        }else{
            select()
        }

    }

    useEffect(() => {

        
        console.log('selected: ',selection)

        if(isSelected()){

            menu([ 
                {text: 'Copier la selection', action: () => {}, Icon: Icon.ClipboardIcon},
                {text: 'Supprimer la selection', action: () => {}, Icon: Icon.TrashIcon},
                {text: 'Déselectioner', action: () => toggleSelet(), Icon: Icon.CursorArrowRippleIcon},
            ])

        }else{

            menu([ 
                {text: 'Ouvrir', action: () => {}, Icon: Icon.ArrowTopRightOnSquareIcon},
                {text: 'Modifier', action: () => {}, Icon: Icon.PencilIcon},
                {text: 'Supprimer', action: () => {}, Icon: Icon.TrashIcon},
                {text: 'Selectionner', action: () => toggleSelet(), Icon: Icon.CursorArrowRippleIcon},
            ])


        }


    }, [selection])

    function unSelect(){

        let selectionCopy = [...selection];

        selectionCopy.splice(selectionCopy.findIndex((value) => value.id === product.id), 1)

        setSelection(selectionCopy)

    }

    function selectionMode(){
        return selection.length > 0
    }

    function isSelected(){
        return !!selection.find((val) => val.id === product.id)
    }



    return <div draggable onClick={handleClick} ref={ref} className={`flex relative justify-center items-center  ${isSelected() ? 'border-blue-500/40' : ' dark:hover:border-neutral-500 hover:border-neutral-300 border-neutral-200 dark:border-neutral-700 '} overflow-hidden border-[1px]  cursor-pointer flex-1 dark:bg-neutral-800/70 rounded-md`}>

            { isSelected() ? <Icon.CheckIcon className="absolute w-[20px] h-[20px] text-primary top-2 right-2" /> :null }

            <motion.div style={{ scale : selectionMode() ? .8 : 1, y: selectionMode() ? 30 : 0 }} className="flex relative flex-col duration-100 dark:hover:border-neutral-500 drop-shadow-2xl hover:border-neutral-300 overflow-hidden cursor-pointer flex-1 dark:bg-neutral-800/70 rounded-md">
                
                <div className="relative flex justify-center items-center h-[300px] dark:bg-neutral-700 overflow-hidden pointer-events-none select-none">
                    {image ? <img loading="lazy" src={`data:image/png;base64,${image}`} className="relative w-full h-full object-cover" /> : <Icon.PhotoIcon className="w-[50px] dark:text-neutral-500 h-[50px]" />}
                </div>
            
                <div className="absolute bottom-0 left-0 w-full flex flex-col p-2 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 justify-center gap-1 text-sm whitespace-nowrap">
                    <h1 className="dark:text-neutral-100 font-semibold" >{product.name}</h1>
                   
                </div>
                
            </motion.div>

        </div>

}