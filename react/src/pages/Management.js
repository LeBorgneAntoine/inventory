import { useEffect, useState } from "react";
import FolderSheet from "../components/FolderSheet";
import PageConainer from "./PageContainer";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/solid'
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import useSize from "../hooks/useSize";

export default function Management({}){

    const [selection, setSelection] = useState(['test']);
    const [references, setRefenerences] = useState({
        references: [],
        folders: []
    })
    const [searchValue, setSearchValue] = useState('');
    const windowSize = useSize()

    useState(() => {

        fakeAPICall((data) => {

            setRefenerences(data)

        })

    }, [])

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
                
                <div className="absolute w-full h-full bg-zinc-700 flex-col overflow-auto container-snap">

                    <div className=""></div>
                    
                    <div className="bg-white rounded-md m-3 p-2 ">
                            <Input placeholder={'Rechercher...'} />
                        </div>
                    <div className="flex overflow-x-auto space-x-2 rounded-md mx-3" >
                        <div className="h-[40px] px-3 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <Icon.ChevronLeftIcon className="w-4 h-4" />
                        </div>
                        <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>
                        <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>  <div className="h-[40px] px-7 bg-white rounded-md justify-center items-center flex text-neutral-700 border-[1px] select-none">
                            <h5>Casques</h5>
                        </div>
                    </div>
                    <div className="h-full m-3 flex-col flex gap-3">
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="h-[70px] px-3 bg-white rounded-md flex items-center  text-neutral-700 border-[1px] select-none">
                            <div>
                                <h5 className="text-[18px] font-bold">Casques</h5>
                                <h5 className="text-[15px] text-neutral-400">Réference: 1AZED34</h5>
                            </div>
                            <Icon.ChevronRightIcon className="absolute right-5 w-5 h-5 text-neutral-600" />
                        </div>
                    </div>

                </div> : 

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

                        <Panel />
                        <Panel />
                        <Panel />
                        <Panel />

                    </div>
                </div>
            }

          
        </PageConainer>
}


function Panel({item}){

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
        const data = JSON.parse(ev.dataTransfer.getData("object"));
        setCurrentItem(data)
    }


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
        </AnimatePresence> : currentItem === 'folder' ? <FolderForm /> : null
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

function Input({value, setValue, placeholder, label, Icon, type}){

    const [focus, setFocus] = useState(false)

    function handleFocus(ev){
        setFocus(true)
    }

    function clearFocus(){
        setFocus(false)
    }

    return <div>
        <h3>{label}</h3>
        <div style={{border: focus ? 'solid 1px rgba(150,150,150, .9)' : ''}} className="bg-neutral-100 overflow-hidden rounded-md h-10">
            <input placeholder={placeholder} onBlur={clearFocus} onFocus={handleFocus} className="shadow-inner px-2 border-1 bg-transparent h-full w-full outline-none" type={type} />
        </div>
    </div>
}

function ReferenceForm(){

}