
import Icon from '@heroicons/react/24/outline'
import {motion} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useCanvas from '../hooks/useCanvas';
import { Rectangle, Table, Text } from '../utils/canvas/canvasUtils';



const TOOLS = [
    { text: 'Libre', Icon: Icon.CursorArrowRippleIcon , action: (event) => {}},
    { text: 'Texte', Icon: Icon.Bars3BottomLeftIcon , component: (attr) => new Text({value: 'Texte vide',draggable: true, focusable: true, ...attr }), cursor: 'text'},
    { text: 'Rectangle', Icon: Icon.Square2StackIcon , component: (attr) => new Rectangle({style: {fill: '#121212'},width: 100, height:  100, draggable: true, focusable: true, ...attr }), cursor: 'crosshair'},
    { text: 'Tableau', Icon: Icon.TableCellsIcon , component: (attr) => new Table({draggable: true, ...attr}), cursor: 'crosshair'},


]

export  default function Design(){

    const [currentTool, setCurrentTool] = useState(0);
    const [currentFocus, setCurrentFocus] = useState(null)

    return <div className='h-full flex'>
        
        <Tools current={currentTool} setCurrent={setCurrentTool} />

        <Page toolIndex={currentTool} setTool={setCurrentTool} />

        <PropertiesPanel />

    </div>
}

function Tools({current, setCurrent}){


    return <div className="p-1 absolute left-3 top-3 z-10 bg-neutral-800 rounded-md text-neutral-300 border-[1px] border-neutral-600 shadow-lg select-none">

        <h1 className='opacity-75 text-center text-sm'>Outils</h1>
        <div className="h-[1px] w-full bg-neutral-200/50 dark:bg-neutral-200/20 mb-2 mt-2" />

        <div className='grid grid-cols-2'>
            { TOOLS.map((tool, index) => <ToolItem key={index} name={tool.text} index={index} current={current} setCurrent={setCurrent} Icon={tool.Icon} />)}
           
        </div>
      

    </div>
}

function ToolItem({name, Icon, current, setCurrent, index}){

    return <div onClick={( ) => setCurrent(index)} title={name} className={`w-[30px] h-[30px] p-1 ${current === index ? 'bg-neutral-700' : ''} cursor-pointer hover:bg-neutral-700/10 rounded-md`}>
            <Icon className='' />
        </div>

}

function PropertiesPanel(){

    return <div className='w-[400px] h-full bg-neutral-800 border-l-[1px] border-neutral-700'>

    </div>

}

function Page({toolIndex, setTool}){

    const SCROLL_SENSITIVITY = 0.1;
    const MAX_ZOOM = 10;
    const MIN_ZOOM = 0.3;

    const [zoom, setZoom] = useState(.5)
    const [dimension, setDimension] = useState(['21cm', '29.7cm'])
    const [currentFocus, setCurrentFocus] = useState(-1)

    const selectedTool = useRef(TOOLS[toolIndex])

    const { ref, canvas } = useCanvas()

    function onZoom(ev){

        let { deltaY } = ev

        let newValue = zoom + ( (deltaY < 0 ) ? (SCROLL_SENSITIVITY * (1 - zoom * .5)) : -(SCROLL_SENSITIVITY * (1 - zoom * .5)) )

        setZoom(newValue)
    }

    useEffect(() => {
        selectedTool.current = TOOLS[toolIndex]

        if(selectedTool.current.cursor){

            ref.current.style.cursor = selectedTool.current.cursor

        }else{

            ref.current.style.cursor = 'default'

        }

    }, [toolIndex])

    function appendElement(event){

        let tool = selectedTool.current
        
        if(tool.component){

            let component = tool.component({
                x: event.x,
                y: event.y,
            })

            canvas.addElement(component)
            
            setTool(0)
        }

    } 


    useEffect(() => {

        if(canvas){

            canvas.debug()

            let width = 700
    
            canvas.setAttr('width', width)
            canvas.setAttr('height', width * Math.sqrt(2))
            canvas.style('backgroundColor', 'white')
        
            canvas.listener('absoluteclick', (event) => appendElement(event))

        }

    }, [canvas])

    return <div onWheel={onZoom} className='flex justify-center scrollbar-dark scrollbar-visible h-full w-full items-center overflow-auto'>
        
            <canvas className='shadow-lg' ref={ref} />
        
    </div>

}


//render tools

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {{x: Number, y: Number, width: Number, height: Number}} bounds 
 * @param {JSON} attr 
 */
function rect(context, bounds, attr){

    context.fillStyle = attr.color ?? 'grey'
    context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height)

}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {{x: Number, y: Number, width: Number, height: Number}} bounds 
 * @param {JSON} attr 
 */
function root(context){




    return () => {

    }
}