import { useEffect, useRef, useState } from "react";
import FolderSheet from "../components/FolderSheet";
import PageConainer from "./PageContainer";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/solid'
import { AnimatePresence, motion, stagger, useAnimate, useScroll } from 'framer-motion';
import useSize from "../hooks/useSize";
import Axios from 'axios';
import useFolder from "../hooks/useFolder";
import BottomSheet from "../components/BottomSheet";
import { useLocation, useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import Input from "../components/Input";
import NumberScroll from "../components/NumberScroll";

export default function Management(){

    const [selection, setSelection] = useState(['test']);
    const [references, setRefenerences] = useState({
        references: [],
        folders: []
    })
    const [searchValue, setSearchValue] = useState('');
    const windowSize = useSize()
    let {go, back, current, stack} = useFolder()
    const [selectedItem, setSelectedItem] = useState(null)
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [quantity, setQuantity] = useState(0);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        console.log(scrollYProgress)
    }, [scrollYProgress])

    useEffect(() => {
        setSelectedItem(location.state ? references.references.find((val) => val.id === location.state.item) : null);
    }, [location])

    useEffect(() => {
        setBottomSheetVisible(!!selectedItem)
    }, [selectedItem])

    useState(() => {

        request()

    }, [])

    async function request(){

        let data = (await Axios.get('http://192.168.50.41:5000/inventory')).data

        setRefenerences(data)

    }

    function fakeAPICall(callback, delay){

        let data = {
            references: [],
            folders: []
        }


        if(delay){
            setTimeout(() => {
                callback(data)
            }, delay)
        }else{  
            callback(data)
        }
       
    }

    useEffect(() => {
        console.log(current, stack)
    }, [current])

    function sendModifications(finished){

        setTimeout(() => {
            finished({
                Icon: Icon.CheckCircleIcon,
                text: 'Modifs enregistré !'
            })
        }, 2000)


    }

    function onSelection(item){
        setSelection([...selection, item])
    }

    return <PageConainer>

            {
                windowSize.width < 1300 ? 
                
                <div className="absolute w-full h-full bg-white flex-col overflow-auto container-snap">

                    <div className=""></div>
                    
                    <div className="bg-neutral-100 rounded-md m-3 p-2 ">
                            <Input Icon={Icon.MagnifyingGlassIcon} placeholder={'Rechercher...'} />
                    </div>

                    
                    <div className="pl-5 flex gap-2 opacity-75">
                        <Icon.InboxStackIcon className="w-[20px] h-[20px]" />
                        <h1 >Categorie(s)</h1>
                    </div>

                    <div className="flex overflow-x-auto items-center space-x-2 rounded-md mx-3 mt-2 mb-5" >
                    
                        <div onClick={() => back()} className="h-[40px] px-4 justify-center bg-neutral-100 rounded-md flex items-center  text-neutral-700 select-none">
                        <Icon.ChevronLeftIcon className=" w-5 h-5 text-neutral-600" />
                        </div>

                        {references.folders.filter((val) => val.parent === current).map((folder) => <motion.div whileTap={{scale: .9}} animate={{opacity: 1}}  initial={{opacity: 0}} onClick={() => {
                            go(folder.name)
                        }} className="h-[40px] px-3 bg-neutral-100 rounded-md flex items-center  text-neutral-600  select-none">
                                <h5 className="text-[18px] truncate max-w-[20rem]">{String(folder.name).toLowerCase()}</h5>
                        </motion.div>)}

                        {references.folders.filter((val) => val.parent === current).length <= 0 ? 
                            <div className="absolute left-[50%] translate-x-[-50%] opacity-25">
                                <h3>Aucune catégorie(s)</h3>
                            </div> : null
                        }
                      

                    </div>
                    {current && <div className="opacity-60 flex items-center gap-2 pl-5 h-[20px] select-none">
                            <Icon.FolderIcon className="w-[20px] h-[20px]" />
                            <div className="inline-flex overflow-x-auto items-center h-[20px] gap-2 w-full">
                                <AnimatePresence>
                                    {
                                        stack.map((val) => <>
                                        <motion.h1  onClick={() =>go(val)} >{String(val).toLowerCase()}</motion.h1>
                                        <Icon.ChevronRightIcon className="w-[15px] h-[15px]" />
                                        </>)
                                    }
                                </AnimatePresence>
                                <motion.h1 className="text-blue-500" key={stack} animate={{x: 0, opacity: 1}} initial={{x: -50, opacity: 0}} >{String(current).toLowerCase()}</motion.h1>

                            </div>
                           

                             
                    </div>}
                    

                    <div className="m-3 flex-col flex gap-3">
                    
            
                    {references.references.filter((val) => val.folder === current).map((reference, i) => <motion.div whileTap={{scale: .85, opacity: .6}} animate={{height: 80}} initial={{height: 0}} onClick={() => {
                        navigate('/', {
                            state : {
                                item: reference.id
                            }
                        })
                       
                    }} className="h-[80px] px-3 bg-neutral-100 relative rounded-md flex flex-col justify-center text-neutral-700  select-none">
                            <h5 className="text-[18px] truncate max-w-[20rem] font-bold ">{reference.name}</h5>
                            <h5 className="text-[15px] text-neutral-400">Réference: {reference.ref}</h5>
                            <Icon.ChevronRightIcon className="absolute w-[20px] h-[20px] right-1 opacity-50" />
                        </motion.div>)}

                        {references.references.filter((val) => val.folder === current).length <= 0 ? <div className="absolute top-[45%] left-[50%] translate-x-[-50%] opacity-20 select-none">
                            <Icon.RectangleGroupIcon className="w-[100px] h-[100px]" />
                            <h1 className="">Aucune réference</h1>
                        </div> : null}

                    </div>

                    <BottomSheet isShow={bottomSheetVisible} >

                        {
                            selectedItem && <>
                                <div className="flex flex-col items-center">
                                    <div className="flex w-full justify-between p-3">
                                        <div className="flex flex-col p-2">
                                            <h1 className="font-bold truncate max-w-[220px]">{selectedItem.name}</h1>
                                            <h3 className="opacity-50">Réf: {selectedItem.ref}</h3>
                                        </div>
                                        <div>
                                            <img className="top-2 right-2  rounded-md drop-shadow-md" src={selectedItem.image} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full justify-center items-center h-[200px]">
                                        <div className="bg-neutral-100 rounded-md m-3 w-[200px] px-2">
                                            <h1 className="text-[30px] font-bold">{quantity}</h1>
                                        </div>
                                        <div className="flex gap-3 justify-around w-full px-3">

                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">-100</div>            
                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">-10</div>            
                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">-1</div>            
                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">+1</div>            
                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">+10</div>    
                                            <div className="bg-neutral-200 flex-1 h-[50px] flex justify-center items-center rounded-md select-none text-[16px]">+100</div>            

                                        </div>
                                    </div>
                                 
                                    

                                  
                                </div>
                               
                                <div className="absolute flex bottom-8 w-full items-center gap-5 justify-end pr-3">
                                    <Button width={130} Icon={Icon.PaperAirplaneIcon} >Envoyer</Button>
                                    <Button Icon={Icon.ArrowUpCircleIcon} >Enregistrer</Button>
                                </div>
                                

                            </>
                        }
                       
                    </BottomSheet  >
                   
                   <AnimatePresence>
                    {!selectedItem && <motion.div initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 100}} whileTap={{scale: .9, opacity: .5}} className="fixed bottom-5 flex justify-center items-center right-5 w-[70px] h-[70px] bg-blue-500 rounded-lg drop-shadow-xl" >
                            <Icon.QrCodeIcon className="w-[50px] h-[50px] text-white" />
                        </motion.div>}
                   </AnimatePresence>
                  

                </div> 
                
                : 

                <div className="absolute w-full h-full bg-zinc-700 flex">

                    <div className="h-full">

                        <div className="bg-white rounded-md m-3 p-2 ">
                            <Input placeholder={'Rechercher...'} />
                        </div>


                            <FolderSheet onDrag={(item) => console.log(item)} filesList={references.references} foldersList={references.folders} className={'m-3 relative'} />
                            <div className="bg-white rounded-md m-3 py-2 ">
                                <Button process={sendModifications} Icon={Icon.ArrowUpOnSquareIcon} >Enregistrer les modifs</Button>
                            </div>
                        </div>
                    <div className="bg-white w-full mr-3 mt-3 mb-3 rounded-md drop-shadow-lg grid grid-cols-2 grid-rows-2 p-2 gap-3">

                        <Panel files={references.references} folders={references.folders} />
                        <Panel files={references.references} folders={references.folders} />
                        <Panel files={references.references} folders={references.folders} />
                        <Panel files={references.references} folders={references.folders} />

                    </div>
                </div>

            }

          
        </PageConainer>
}


function Panel({item, files, folders}){

    const [currentItem, setCurrentItem] = useState(null);
    const [isDragOn, setDragOn] = useState(false);
    const [showDefault, setShowDefault] = useState(false)
    const [scope, animate] = useAnimate()

    function dragover(ev){
        setDragOn(true)
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    function dragExit(){
        setDragOn(false)

    }

    function drop(ev) {
        setDragOn(false)
        ev.preventDefault();
        try{
            const data = JSON.parse(ev.dataTransfer.getData("object"));

            if(data.id && files){
                setCurrentItem(files.find((file) => file.id === data.id))
            }else{
                console.log(files)
            }
        }catch(err){

        }
      

       
    }

    useEffect(() => {
        console.log(currentItem)

    }, [currentItem])


    function showCreate(){

        setShowDefault(true)

        setTimeout(() => {
            setShowDefault(false)
        }, 3000)

    }

    return <div onClick={showCreate} onDrop={drop} onDragLeave={dragExit} style={{backgroundColor: isDragOn ? 'rgba(150,150,150, .3)' : null}} onDragOver={dragover} onDragEnd={console.log} onMouseUp={console.log} className="overflow-hidden duration-100 min-h-[100px] min-w-[100px] rounded-md border-[1px] drop-shadow-md border-slate-200 bg-whit flex items-center justify-center">

    {
        !currentItem ?
        <AnimatePresence onExitComplete>
        {
            !showDefault ? <motion.div key={'plus'} animate={{opacity: 1, y: 0}} initial={{opatity: 0, y: -30}} exit={{opacity: 0, y: 0}} className="absolute">
                    <Icon.PlusIcon className="pointer-events-none text-neutral-400 w-20 h-20" />
            </motion.div> : 
            
                <motion.div key={'create'} animate={{opacity: 1, y: 0}} initial={{opatity: 0, y: -30}} exit={{opacity: 0, y: -30}} className="absolute  flex gap-5 items-center">

                    <Button onClick={() => setCurrentItem('folder')} Icon={Icon.FolderPlusIcon}>Nouveau dossier</Button>
                    <Button Icon={Icon.PlusIcon} >Nouvelle reference</Button>

                </motion.div>
            
        }
        </AnimatePresence> : currentItem === 'folder' ? <FolderForm /> : <ProductCard product={currentItem} />
        }
    
    </div>
}

function FolderForm(){
    return <motion.div className="bg-white h-full w-full flex flex-col items-center" animate={{scale: 1, opacity: 1}} initial={{scale: .5, opacity: 0}}>
        <div className="flex items-center justify-center w-full h-8 bg-gray-600 text-white select-none">
            <h1>Nouveau Dossier</h1>
            <Icon.XMarkIcon className="absolute right-2 w-6 p-1 text-red-400 hover:bg-red-400/20 rounded-full" />
        </div>
        
        <div>
            <Input placeholder={'Véhicule, Pieces...'} label={'Nom du dossier'} />
        </div>
        <div>

        </div>
    </motion.div>
}

function ReferenceForm(){

}

function ProductCard({product}){
    return <div className="bg-white h-full w-full flex p-5">
            <div className="w-[50%]">
                <Input label={'Nom du produit'} value={product.name} />
                <Input label={'Réference'} value={product.ref} />
            </div>
            <div className="w-[50%] flex flex-col items-center">
                <div className="h-[300px] w-[300px] rounded-lg overflow-hidden drop-shadow-md bg-black select-none">
                    <img src={product.image} className="" />
                </div>
            </div>

    </div>
}