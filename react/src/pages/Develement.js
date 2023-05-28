import { useEffect } from "react";
import useCanvas from "../hooks/useCanvas";
import useContextMenu from "../hooks/useContextMenu";
import Icon from '@heroicons/react/24/outline'
import Rectangle from "../utils/canvas/elements/Rectangle";
import CanvasEvent from "../utils/canvas/CanvasEvent";

export default function Developement(){

    const { contextMenu } = useContextMenu()
    const { ref, canvas } = useCanvas()

    
    useEffect(() => {
        if(canvas){
               
            canvas.debug()

            let width = 700
    
            canvas.attr('width', width)
            canvas.attr('height', width * Math.sqrt(2))
            canvas.style('backgroundColor', 'white')

            canvas.on('selection_end', (event) => {

                let rect = new Rectangle({
                    drag: true,
                    focus: true,
                    resizable: true,
                    x: event.selection.x,
                    y: event.selection.y,
                    width: event.selection.width,
                    height: event.selection.height
                })
                
                rect.on('release', () => {
                
                })
    
                rect.on('enter', () => {
    
                    rect.style('background-color', 'red')
    
                })


                rect.on('exit', () => {
    
                    rect.style('background-color', null)
    
                })

                canvas.addElement(rect)


            })

            


        }
    }, [canvas])

    return <div>
        <canvas tabIndex='1' ref={ref} />
    </div>
}