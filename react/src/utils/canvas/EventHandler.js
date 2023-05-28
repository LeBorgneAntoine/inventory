import Canvas from "./Canvas";
import { processNativeEvent } from "./CanvasEvent";


export default class EventHandler{

    hoverElement
    draggedElement
    originDragPosition = {x: 0, y: 0}
    focusedElement;
    isMouseDown = false;
    lastSelectionArea = {x: 0, y: 0, width: 0, height: 0}
    onSelectArea = false;
    selectedElements = []
    canvas

    /**
     * 
     * @param {Canvas} canvas 
     */
    constructor(canvas){
        if(!canvas)throw new Error('No canvas to bind !')

        this.canvas = canvas;

        this.bindsEvents()
    }

    bindsEvents(){

        let move = (ev) => this.native_MoveEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('mousemove', move)
        this.canvas.htmlCanvas.addEventListener('mousemove', move)

        let click = (ev) => this.native_ClickEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('click', click)
        this.canvas.htmlCanvas.addEventListener('click', click)

        let doubleClick = (ev) => this.native_DoubleClickEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('dblclick', doubleClick)
        this.canvas.htmlCanvas.addEventListener('dblclick',  doubleClick)

        let exit = (ev) => this.native_ExitEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('mouseleave', exit)
        this.canvas.htmlCanvas.addEventListener('mouseleave', exit)

        let press = (ev) => this.native_MouseDownEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('mousedown', press)
        this.canvas.htmlCanvas.addEventListener('mousedown', press)

        let release = (ev) => this.native_MouseUpEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('mouseup', release)
        this.canvas.htmlCanvas.addEventListener('mouseup', release)

        let keyboard = (ev) => this.native_KeyboradEvent(ev)
        this.canvas.htmlCanvas.removeEventListener('keydown', keyboard)
        this.canvas.htmlCanvas.addEventListener('keydown', keyboard)

        let contextMenu = (ev) => this.native_ContextMenu(ev)
        this.canvas.htmlCanvas.removeEventListener('contextmenu', contextMenu)
        this.canvas.htmlCanvas.addEventListener('contextmenu', contextMenu)

    }

  

    native_ContextMenu(nativeEvent){

        nativeEvent.preventDefault()

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())

        this.canvas.trigger('contextmenu', event)

        if(event.target)event.target.trigger('contextmenu', event)

    }

    native_MoveEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())

        //drag event has higher priority    
        if(this.draggedElement){

            this.canvas.setCursor('grabbing')

            this.draggedElement.moveTo(event.x - this.originDragPosition.x, event.y - this.originDragPosition.y)
            this.draggedElement.trigger('drag', event)
            this.canvas.trigger('drag_element', event)

        }else{

            if(this.isMouseDown){

                this.onSelectArea = true

                this.lastSelectionArea.width =  event.x - this.lastSelectionArea.x
                this.lastSelectionArea.height = event.y - this.lastSelectionArea.y
                
                event.selection = this.getAbsoluteSelectionArea()

                this.canvas.trigger('selection', event)

                this.canvas.render()
            }else{

                this.canvas.trigger('hover', event)
                this.hoverEvent(event)
            }


        }

    }

    native_ExitEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())
        this.canvas.trigger('exit', event)

    }

    native_ClickEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())
        this.canvas.trigger('click', event)

        if(event.target)event.target.trigger('click', event)
        
        this.focusEvent(event)

    }


    native_DoubleClickEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())
        this.canvas.trigger('double_click', event)

        if(event.target)event.target.trigger('double_click', event)

    }

    native_MouseDownEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())
        this.canvas.trigger('press', event)
        this.isMouseDown = true
        if(event.target){

            event.target.trigger('press', event)

            if(event.target.attrs.drag) {

                this.draggedElement = event.target
                this.originDragPosition = { x: event.innerX, y: event.innerY }

            }

        }else{

            this.canvas.trigger('selection_start', event)

            this.lastSelectionArea.x = event.x
            this.lastSelectionArea.y = event.y

        }

    }

    native_MouseUpEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())
        this.canvas.trigger('release', event)
        this.isMouseDown = false

        if(event.target)event.target.trigger('release', event)

        if(this.onSelectArea){

            this.onSelectArea = false

            event.selection = this.getAbsoluteSelectionArea();

            this.canvas.trigger('selection_end', event)

            this.canvas.render()
        }else{

            if(this.draggedElement){

                this.draggedElement.trigger('drag_end', event)
                this.canvas.setCursor()
                this.draggedElement = null

            }

        }

       


    }

    native_KeyboradEvent(nativeEvent){

        let event = processNativeEvent(nativeEvent, this.canvas.getElements())

        event.key = nativeEvent.key
        event.ctrl= nativeEvent.ctrlKey
        event.sift = nativeEvent.shiftKey
        event.alt = nativeEvent.altKey

        this.canvas.trigger('key', event)

        if(this.focusedElement){
            this.focusedElement.trigger('key', event)
        }
    }

    //canvas elements events

    focusEvent(event){

        //click outside element
        if( !event.target && this.focusedElement ){
            this.focusedElement.trigger('blur', event)
            this.focusedElement.isFocus = false
            this.focusedElement = null

        }

        //click on another element 
        if( event.target && this.focusedElement && event.target !== this.focusedElement ){
            this.focusedElement.trigger('blur', event)
            this.focusedElement.isFocus = false

            if( event.target.focus ){
                this.focusedElement = event.target
                event.target.trigger('focus', event)
                event.target.isFocus = true
            }
            
        }

        //click on element focusable
        if( event.target && event.target.attrs.focus ){
            this.focusedElement = event.target
            this.focusedElement.isFocus = true
            this.focusedElement.trigger('focus', event)

        }

    }

    hoverEvent(event){

            //exiting an element
            if(!event.target && this.hoverElement){
                this.hoverElement.trigger('exit', event)
                this.hoverElement = null
            }
    
            //entering an element
            if(event.target && !this.hoverElement){
                this.hoverElement = event.target
                this.hoverElement.trigger('enter', event)
            }
    
            //hover event
            if(event.target && this.hoverElement && event.target === this.hoverElement ){
                this.hoverElement.trigger('hover', event)
            }
    
            //transition between to elements
            if(event.target && this.hoverElement && event.target !== this.hoverElement){
                this.hoverElement.trigger('exit', event)
                this.hoverElement = event.target
                this.hoverElement.trigger('enter', event)
            }
    
    }

    isOnSelection(){
        return this.onSelectArea
    }

    getAbsoluteSelectionArea(){

        let { x, y, width, height } = this.lastSelectionArea

        return {
            x : (width < 0) ?  x + width : x,
            y : (height < 0) ?  y + height : y,
            width :  Math.abs(width),
            height : Math.abs(height)
        }

    }

}