


class CanvasElement{

    isDrag = false
    isHover = false
    isFocus = false
    canvas
    attrs = {
        width:0,
        height:0,
        value: 'Text vide',
        x:0,
        y:0,
        style : {
            fill: 'grey',
            stroke: 'grey',
        }
    }
    
    listeners = []

    constructor(attrs){
        this.attrs = attrs ?? this.attrs
    }

    setCanvas(canvas){
        this.canvas = canvas
    }


    attr(name, value){

        this.attrs[name] = value

        if(this.canvas)this.render(this.canvas.getContext())

    }

    moveFrom(x, y){

        this.attrs.x = this.attrs.x + x
        this.attrs.y = this.attrs.y + y

        if(this.canvas)this.canvas.render()
    }

    moveTo(x, y){
        this.attrs.x = x
        this.attrs.y = y

        if(this.canvas)this.canvas.render()
    }

    style(name, value){

        if(!this.attrs.style){

            this.attrs.style = {}

        }

        this.attrs.style[name] = value
        
        if(this.canvas)this.canvas.render()

       
    }

    hasFocus(){
        return this.isFocus
    }

    /**
     * 
     * @param {Number} x 
     * @param {NUmber} y 
     * @returns {Boolean} 
     */
    intersect(x, y){

        return ( x > this.attrs.x ) && ( x < this.attrs.x + this.attrs.width ) && ( y > this.attrs.y ) && ( y < this.attrs.y + this.attrs.height )
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context){  }

    //events

    onClick(callback){ callback(new CanvasEvent()) }

    listener(type, callback){
        this.listeners.push({
            type,
            callback
        })
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    setup(context){ }

    /**
     * 
     * @param {String} type 
     * @returns {Array<{type: String, callback: Function}>}
     */
    getListeners(type){
        return this.listeners.filter((listener) => type === listener.type)
    }

    onHoverStop(callback){ callback(new CanvasEvent()) }

}

class CanvasEvent{

    target
    x
    y
    nativeEvent

}

class CanvasEnvironement{

    layers = []
    attrs = {
        width: 0,
        height: 0,
        background: '#121212'
    }
    context
    canvas
    clear = true
    renderCount = 0
    debugMode = false
    listeners = []
    tempData = {}
    selectionDimesion =  {x: 0, y: 0, width: 0, height: 0}
    onSelect = false;

    /**
     * 
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas){

        if(!canvas)throw Error('No canvas !')
        this.canvas = canvas
        this.context = canvas?.getContext('2d')

        this.eventHandler()

    }

    debug(){
        this.debugMode = true;
    }

    listener(type, callback){
        this.listeners.push({type, callback})
    }

    execListeners(type, event){
        this.listeners.filter((listener) => listener.type === type).forEach(({callback}) => callback(event))
    }

    eventHandler(){

        let enter = null;
        let onDrag;
        let dragPosition = {x: 0, y: 0}
        let focused;

        //non clicks events
        let hoverEvents = (ev) => {

            let { x, y } = relativePosition(ev.target, ev.clientX, ev.clientY)
            let element = getTarget(x, y, this.layers)

            let event = new CanvasEvent()
            event.nativeEvent = ev
            event.x = x
            event.y = y

            if(this.onSelect){

                this.selectionDimesion.width =  x - this.selectionDimesion.x
                this.selectionDimesion.height = y- this.selectionDimesion.y

                this.render()
            }

            if(onDrag){

                this.canvas.style.cursor = 'grabbing'

                onDrag.getListeners('drag').forEach(({callback}) => callback(event))
                
                onDrag.moveTo(x - dragPosition.x, y - dragPosition.y)

            }else{

                if(element){

                    event.target = element
    
                    element.getListeners('hover').forEach(({callback}) => callback(event))
    
                    if(!enter){

                        enter = element;

                        element.getListeners('enter').forEach(({callback}) => {
                            callback(event)
                        })

                    }
    
                    if(enter){
    
                        if(enter !== element){
                            event.target = enter
                            enter.getListeners('leave').forEach(({callback}) => callback(event))
    
                            event.target = element
                            enter = element
                            element.getListeners('enter').forEach(({callback}) => callback(event))
    
                        }
    
                    }
    
                }else{
                    if(enter){
                        event.target = enter
                        enter.getListeners('leave').forEach(({callback}) => callback(event))
                        enter = null
                    }
                   
                }

            }

           
        
        }

        let exitCanvas = (ev) => {

            onDrag = null;

        } 

        //click events
        let mouseDownEvents = (ev) => {

            let { x, y } = relativePosition(ev.target, ev.clientX, ev.clientY)
            let element = getTarget(x, y, this.layers)

            
            if(element){

                console.log(element.attrs)

                if(element.attrs.draggable) {
                    console.log('start drag')
                    dragPosition = relativeInnerPosition(element, x, y)

                    console.log(dragPosition)

                    onDrag = element;
                }
            }else{

                this.selectionDimesion.x = x
                this.selectionDimesion.y = y
                this.onSelect = true

            }
        }

        let mouseUpEvents = (ev) => {

            let { x, y } = relativePosition(ev.target, ev.clientX, ev.clientY)
            let element = getTarget(x, y, this.layers)

            if(this.onSelect){

                this.onSelect = false
                
                this.render()
            }

            if(onDrag){

                onDrag.getListeners('dragend').forEach(({callback}) => callback({x, y}))
                
                onDrag = null;

                this.canvas.style.cursor = 'default'

            }else{
                if(element){

                   
                }
            }

            

        
        }

        let keyPressEvents = (ev) => {
        
            if(focused){

                focused.attr('value', focused.attrs.value + ev.key)

            }

        }

        let clickEvents = (ev) => {
            
            let { x, y } = relativePosition(ev.target, ev.clientX, ev.clientY)
            let element = getTarget(x, y, this.layers)

            this.execListeners('absoluteclick', { x, y })

            if(element){

                if(focused && focused !== element){

                    focused.getListeners('focusend').forEach(({callback}) => callback({ target: focused }))
                    focused.isFocus = false
                    focused = null;

                }else{

                    element.getListeners('click').forEach(({callback}) => callback({ target: element }))

                    if(element.attrs.focusable){
    
                        element.getListeners('focus').forEach(({callback}) => callback({ target: element }))
                        element.isFocus = true
                        focused = element;
        
                    }else{
    
                        focused = null;
                    }

                }

               

            }else{

                this.execListeners('click', { x, y })

                if(focused){

                    focused.getListeners('focusend').forEach(({callback}) => callback({ target: focused }))
                    focused.isFocus = false
                    focused = null;

                }


            }

        }   

        let doubleClickEvents = (ev) => {

            let { x, y } = relativePosition(ev.target, ev.clientX, ev.clientY)
            let element = getTarget(x, y, this.layers)

            if(element){


            }

            

        }

        this.canvas.removeEventListener('click', clickEvents)
        this.canvas.addEventListener('click', clickEvents)

        this.canvas.removeEventListener('dblclick', doubleClickEvents)
        this.canvas.addEventListener('dblclick', doubleClickEvents)

        this.canvas.removeEventListener('mouseleave', exitCanvas)
        this.canvas.addEventListener('mouseleave', exitCanvas)

        this.canvas.removeEventListener('mousemove', hoverEvents)
        this.canvas.addEventListener('mousemove', hoverEvents)

        this.canvas.removeEventListener('mousedown', mouseDownEvents)
        this.canvas.addEventListener('mousedown', mouseDownEvents)
        
        this.canvas.removeEventListener('mouseup', mouseUpEvents)
        this.canvas.addEventListener('mouseup', mouseUpEvents)

        this.canvas.removeEventListener('keydown', keyPressEvents)
        this.canvas.addEventListener('keydown', keyPressEvents)
    }

    clearOnRender(value){
        this.clear = value
    }

    /**
     * @returns {Array<CanvasElement>}
     */
    getLayers(){
        return this.layers
    }

  
    getContext(){
        return this.context
    }

    setAttr(attrName, value){

        this.canvas[attrName] = value

        this.render()
    }

    style(name, value){

        this.canvas.style[name] = value

        this.render()
    }


    /**
     * 
     * @param {CanvasElement} element 
     */
    addElement(element){
        
        element.setCanvas(this)
        element.setup(this.context)

        if(!element.attrs.setDimensionOnPlace){

            let { height, width, x, y } = this.selectionDimesion

            element.attrs.width = Math.abs(width)
            element.attrs.height = Math.abs(height)

            //if selection went from bottom right or top left, put element origin on top left corner
            element.attrs.x = (width < 0) ?  x + width : x
            element.attrs.y = (height < 0) ?  y + height : y

        }

        this.layers.push(element)

        this.render()

    }

    setDimension(width, height){

        this.setAttr('wdith', width)
        this.setAttr('height', height)

    }


    render(){

        window.requestAnimationFrame(() => {

            let startTime = window.performance.now()

            if(this.clear)this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.context.font = "16px Arial";
    
            if(this.debugMode){
    
                this.context.fillStyle = 'red'
                this.context.fillText('Debug Mode', 5, 30)
                this.context.fillStyle = '#d96161'
                this.context.fillText('Frame: '+this.renderCount, 5, 60)
                this.context.fillText('Elements to render: '+this.getLayers().length, 5, 90)
    
            }
    
            for (let i = this.getLayers().length; i >= 0; i--) {
                
                const element = this.getLayers()[i];
    
                if(element){
                    element.render(this.context)
                }
    
            }

            if(this.onSelect){
                let { x, y, height, width } = this.selectionDimesion
                
                this.context.fillStyle = '#369BFF2B'
                this.context.strokeStyle = '#369BFF'
                this.context.fillRect(x, y, width, height)
                this.context.strokeRect(x, y, width, height)

            }
    
            if(this.debugMode){
    
                this.context.fillStyle = '#d96161'
                this.context.fillText('render time: '+(window.performance.now() - startTime) + ' nanosec', 5, 120)
    
            }
    
            this.renderCount++

        })

       
    }   


}



/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Array<CanvasElement>} elements 
 * @param {HTMLCanvasElement} canvas 
 * @returns {CanvasElement}
 * 
 */
function getTarget(x, y, elements, canvas){

    for (const element of elements) {
        
        let isInter = element.intersect(x, y)

        if(isInter){
            
            return element;
        }
    }

    return null

}

function relativePosition(container, eventX, eventY){

    const rect = container.getBoundingClientRect();

    let x =  eventX - rect.left;
    let y =  eventY - rect.top;
    
    return {
        x, y
    }   
}

/**
 * 
 * @param {CanvasElement} container 
 * @param {Number} eventX 
 * @param {Number} eventY 
 * @returns 
 */
function relativeInnerPosition(container, x, y){

    const rect = container.attrs;

    let xPos =  x - rect.x;
    let yPos =  y - rect.y;
    
    return {
        x: xPos, y: yPos
    }   
}

class Rectangle extends CanvasElement{

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    setup(context){

        
        this.listener('focus', () => {

            this.style('border-color', 'blue')
            this.style('border-size', 1)

        })

        this.listener('focusend', () => {

            this.style('border-color', null)
            this.style('border-size', null)

        })

    }


    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context){

        context.fillStyle = this.attrs.style.fill
        context.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height)
        context.fillRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height)

    }


}


class Text extends CanvasElement{

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    setup(context){

        this.listener('enter', () => {
            if(!this.hasFocus()){
                this.style('border-color', '#becae4')
                this.style('border-size', 1)
            }
        })

        this.listener('leave', () => {

            if(!this.hasFocus()){
                this.style('border-color', null)
                this.style('border-size', null) 
            }
            

        })


        this.listener('focus', () => {

            this.style('border-color', '#2c6bf3')
            this.style('border-size', 1)

        })

        this.listener('focusend', () => {

            this.style('border-color', null)
            this.style('border-size', null)

        })

    }


    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context){

        context.font = "16px Arial";
        context.fillStyle = this.attrs.style?.fill ?? 'black'
        this.attrs.width = context.measureText(this.attrs.value).width
        this.attrs.height = context.measureText(this.attrs.value).actualBoundingBoxAscent

        if(this.attrs.style){

            if(this.attrs?.style?.['border-color'] || this.attrs?.style?.['border-size']){
                context.lineWidth = this.attrs?.style?.['border-size'];
                context.strokeStyle = this.attrs?.style?.['border-color'] ?? 'transparent'
                context.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height)
            }

        }

        
        context.fillText(this.attrs.value, this.attrs.x, this.attrs.y + this.attrs.height);

    }


}




export {
    CanvasEnvironement,
    CanvasElement,
    Rectangle,
    Text
}

