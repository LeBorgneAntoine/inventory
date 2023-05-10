import { useEffect, useState } from "react"
import Icon from '@heroicons/react/24/solid';
import { AnimatePresence, useAnimate, motion } from "framer-motion";


export default function FolderSheet({filesList, foldersList, className, onSelect, searchValue}){

    const [files, setFiles] = useState([]);

    const [folders, setFolders] = useState([]);

    function changeFolder(targetFolder, transfertData){
        if(transfertData.type === 'file'){
            setFiles([...files].map((file) => {
                if(file.id === transfertData.id)file.folder = targetFolder
                return file
            }))
        }else{

        }
    }

    useEffect(() => {
        setFolders(foldersList)
    }, [foldersList])

    useEffect(() => {
        setFiles(filesList)
    }, [filesList])

    return <div className={" w-[400px] overflow-auto max-h-[calc(100%-170px)] bg-white drop-shadow-lg rounded-md p-1 "+className}>

        {folders.filter((val) => !val.insideFolder).map((folder, i) => <Folder search={searchValue} onSelect={onSelect} key={i} title={folder.name} FolderIcon={Icon.FolderIcon} folders={folders} files={files} switchFolder={changeFolder} />)}
        {files.filter((val) => !val.folder).map((file, i) => <File search={searchValue} onSelect={onSelect} key={i} id={file.id} title={file.name} Icon={Icon.DocumentIcon} />)}

    </div>
}

function Folder({title, FolderIcon, folders, files, onSelect, switchFolder, search}){

    const [isCollapse, setCollapse] = useState(true);
    const [ChevronScope, animateChevron] = useAnimate()
    const [dragOver, setDragOver] = useState(false);
    const [isDrag, setDrag] = useState(false);
    const [size, setSize] = useState(0);
    const [children, setChildren] = useState([])

    function onDrag(e){

        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("object", JSON.stringify({
            title,
            type: 'folder'
        }));
        setDrag(true)
    }

    useEffect(() => {
        setChildren(files.filter((val, i) => val.folder && val.folder === title))
    }, [files])

    useEffect(() => {

        animateChevron(ChevronScope.current, {
            rotate: isCollapse ? 0 : -180 
        })

    },[isCollapse])

    function collapseToggle(){
        setCollapse(!isCollapse)
    }

    function onClick(){
        if(onSelect)onSelect({
            type: 'folder',
            name: title
        })
    }

    function dragover(ev){
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = "move";
        setDragOver(true)
    }

    function dragExist(e){
        e.stopPropagation();
        setDragOver(false)
    }

    function drop(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        let data = ev.dataTransfer.getData("object");

        console.log(data)

        if(data){
            data = JSON.parse(data)
            setDragOver(false)
            switchFolder(title, data)
        }

    }

    return <div>
       
            <div title={title} draggable onDragOver={() => setCollapse(false)} onDrag={onDrag} className="h-[30px] w-full flex items-center">
                <Icon.ChevronDownIcon onClick={collapseToggle} ref={ChevronScope} className='w-[30px] h-[30px] p-1 text-gray-500 hover:bg-gray-100 rounded-md duration-100 cursor-pointer'  />
                <div onClick={onClick} className="flex h-full w-full items-center gap-3 rounded-md hover:bg-gray-100 select-none px-2">
                    {FolderIcon && <FolderIcon className='pointer-events-none w-5 h-5 text-gray-500' />}
                    <h3 className="truncate max-w-[17rem] pointer-events-none">{String(title).toUpperCase()}</h3>
                    <h4 className="pointer-events-none opacity-25 text-[13px] text-center align-middle" >{children.length}</h4>
                </div>
            </div>
            <AnimatePresence>
            {!isCollapse ? 
                <><motion.div onDragLeave={dragExist} style={{backgroundColor: dragOver ? 'rgba(150, 150, 150, .2)' : 'white'}} onDragOver={dragover} onDrop={drop} animate={{height: 'auto', opacity: 1}} initial={{height: 1, opacity: 0}} exit={{height: 1, opacity: 0}} 
                            className="pl-2 relative overflow-hidden ml-[43px] border-l-2 rounded-md bg-white" >
                    {folders.filter((val) => val.parent && val.parent === title && (search && search === val.title)).map((folder, i) => <Folder search={search} disable={dragOver} switchFolder={switchFolder} key={i} title={folder.name} FolderIcon={FolderIcon} folders={folders} files={files} />)}
                    {children.map((file, i) => <File search={search} reference={file.ref} disable={dragOver} key={i} Icon={Icon.DocumentIcon} id={file.id} title={file.name} />)}
                </motion.div>
                </>
             : null}
             </AnimatePresence>
        
    </div>
}

function File({title, id, Icon, reference, onSelect, disable}){



    const [isDrag, setDrag] = useState(false);

    function onClick(){
        if(onSelect)onSelect({
            type: 'file',
            id,
            name: title
        })
    }

    function onDrag(e){
        
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("object", JSON.stringify({
            title,
            id,
            type: 'file'
        }));
        setDrag(true)
    }

    return <motion.div title={title} draggable onDragStart={onDrag} onClick={onClick} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-[30px] duration-100 overflow-hidden w-full flex items-center gap-3 px-1 rounded-md hover:bg-gray-100 select-none" >
         {Icon && <Icon className='w-5 h-5 text-gray-500/50 pointer-events-none ' />}
        <h5  className="truncate max-w-[10rem] block pointer-events-none">{title}</h5>
        <h5 className=" pointer-events-none opacity-25 text-[13px] text-center align-middle">({reference})</h5>
    </motion.div>
}