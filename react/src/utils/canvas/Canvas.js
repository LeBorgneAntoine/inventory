import CanvasEvent from "./CanvasEvent"
import EventHandler from "./EventHandler"
import CanvasElement from "./CanvasElement"
import Historyhandler from "./HistoryHandler"

export default class Canvas{

    elements = []
    listeners = []
    attrs = { }
    context
    htmlCanvas
    eventsHandler
    isClearOnRender = true
    metrics = {
        renderCount: 0,
        avgRenderTime: 0,
        lastFrameRenderTime: 0,
        startTime: 0
    }
    debugMode = false

    lastSelectionArea = {x: 0, y: 0, width: 0, height: 0}
    onSelectArea = false;
    selectedElements = []
    history

    /**
     * 
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas){

        if(!canvas)throw Error('No canvas !')

        this.htmlCanvas= canvas
        this.context = canvas?.getContext('2d')
        this.eventsHandler = new EventHandler(this)
        this.history = new Historyhandler()

    }

    debug(){
        this.debugMode = true;
    }

    /**
     * 
     * @param {String} type 
     * @param {(event: CanvasEvent) => void} callback 
     */
    on(type, callback){
        this.listeners.push({type, callback})
    }

    trigger(type, event){
        this.listeners.filter((listener) => listener.type === type).forEach(({callback}) => callback(event))
    }

    getSelectedElements(){

        let { x, y, width, height } = this.lastSelectionArea

        return this.getElements().filter((element) => element.isInBounds( x, y, width, height ) )

    }

    clearOnRender(value){
        this.isClearOnRender = value
    }

    /**
     * @returns {Array<CanvasElement>}
     */
    getElements(){
        return this.elements
    }

    deleteElement(element){

        if(element){

            this.elements.splice(this.elements.findIndex((value) => value === element), 1)

            this.render()
        }

    }

    getContext(){
        return this.context
    }

    attr(attrName, value){

        let oldValue = this.htmlCanvas[attrName]

        this.history.save(
            () => { this.htmlCanvas[attrName] = value; this.render() }, 
            () => { this.htmlCanvas[attrName] = oldValue; this.render() }
        )

    }

    style(name, value){

        let oldValue = this.htmlCanvas.style[name]

        this.history.save(
            () => { this.htmlCanvas.style[name] = value; this.render() }, 
            () => { this.htmlCanvas.style[name] = oldValue; this.render() }
        )

    }

    renderMetrics(context){

        this.metrics.lastFrameRenderTime = (performance.now() - this.metrics.startTime)
        if(this.metrics.renderCount > 0){
            this.metrics.avgRenderTime = this.metrics.avgRenderTime + this.metrics.lastFrameRenderTime
        }

        context.font = "16px Arial";
        context.fillStyle = 'red'
        context.fillText('Debug metrics', 5, 30)
        context.font = "15px Arial";
        context.fillStyle = '#d96161'
        context.fillText(' Renders frames: '+this.metrics.renderCount, 5, 60)
        context.fillText(' Elements to render: '+this.getElements().length, 5, 90)
        context.fillText(' Last render time: '+ this.metrics.lastFrameRenderTime + ' nanosec', 5, 120)
        context.fillText(' Avg render time: '+ (this.metrics.avgRenderTime / this.metrics.renderCount) + ' nano sec', 5, 150)
        this.context.fillStyle = null
        this.context.strokeStyle = null

    }


    /**
     * 
     * @param {CanvasElement} element 
     */
    addElement(element){
        
        element.setCanvas(this)
        element.setup(this.context)

        this.elements.push(element)

        this.render()

    }

    setDimension(width, height){

        this.setAttr('wdith', width)
        this.setAttr('height', height)

    }

    setCursor(type){
        this.htmlCanvas.style.cursor = type ?? 'default'
    }

    render(){

        window.requestAnimationFrame(() => {

            console.log('Render start...')

            this.metrics.startTime = performance.now()//get start nano time

            console.log('Start path...')

            this.context.beginPath()


            console.log('Cleaning render...')

            if(this.isClearOnRender)this.context.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);//clear canvas
            
            console.log('Rendering '+this.getElements().length+' element(s)...')

            for (let i = 0; i < this.getElements().length; i++) {
                
                
                const element = this.getElements()[i];
                
                if(element){

                    console.log('Rendering '+element.constructor.name+'...')
                    
                    element.renderNative(this.context)

                }
    
            }

            console.log('fill...')

            this.context.fill()


            console.log('rendering selection...')

            //display the selection area
            if( this.eventsHandler.isOnSelection() ){

                let { x, y, height, width } = this.eventsHandler.getAbsoluteSelectionArea()
                this.context.fillStyle = '#369BFF2B'
                this.context.strokeStyle = '#369BFF'
                this.context.fillRect(x, y, width, height)
                this.context.strokeRect(x, y, width, height)
                this.context.fillStyle = null
                this.context.strokeStyle = null

            }

            console.log('rendering metrics...')
    
            //display debug metrics if needed
            if(this.debugMode) this.renderMetrics(this.context)
        
            this.metrics.renderCount++

            console.log('end render')

       })

       
    }   


}