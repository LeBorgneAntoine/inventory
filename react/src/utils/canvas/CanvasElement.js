import Canvas from "./Canvas"

export default class CanvasElement{

    isDrag = false
    isHover = false
    isFocus = false
    canvas
    attrs = { style: { }, resolution: {width: 0, height: 0} }
    listeners = []
    renderShape = []
    shape;
    currentLayer = 0;

    constructor(attrs){
        this.attrs = attrs ?? this.attrs
        this.shape = new Path2D()
    }

    /**
     * 
     * @param {Canvas} canvas 
     */
    setCanvas(canvas){

        this.canvas = canvas
    }


    attr(name, value){

        if(name){
            let old = this.attrs[name]

            this.canvas.history.save(
                () => { this.attrs[name] = value;  this.forceRerender() },
                () => { this.attrs[name] = old; this.forceRerender()  }
            )
        }else{
            return this.attrs[name]
        }

    }

    moveFrom(x, y){

        this.canvas.history.save(
            () => { 

                this.attrs.x = this.attrs.x + x
                this.attrs.y = this.attrs.y + y

                this.forceRerender() 
            },
            () => { 

                this.attrs.x = this.attrs.x + x
                this.attrs.y = this.attrs.y + y

                this.forceRerender()
            }
        )

       

    }

    moveTo(x, y){

        this.attrs.x = x
        this.attrs.y = y

        this.forceRerender()

    }

    resize(width, height){

        this.attrs.width = width
        this.attrs.height = height

        this.forceRerender()
    }


   
    style(name, value){

        if(!this.attrs.style){
            this.attrs.style = {  } 
        }

        this.attrs.style[name] = value
        
        this.forceRerender()

    }

    getStyle(name){
        if(!this.attrs.style){
            this.attrs.style = {  } 
        }
        return this.attrs.style[name]
    }

    hasFocus(){
        return this.isFocus
    }

    /**
     * Chack if a point is in element bounds
     * 
     * @param {Number} x 
     * @param {NUmber} y 
     * @returns {Boolean} 
     */
    hasPoint(x, y){

        let intersectionCount = 0;

        let points = this.renderShape.filter((value) => value.type === 'point')

        for ( let i = 0; i < points.length; i++ ) {

            let nextIndex = ( ( (i + 1) % points.length ) + points.length ) % points.length //to connect the last vertesis with to first

            const point = points[i];
            const nextPoint = points[nextIndex];

            let line = {
                A: point,
                B: nextPoint
            }

            let isBetweenABonYAxis = ( y < line.A.y != y < line.B.y )
            let isIntersectLineOnXAxis =  ( x < (line.B.x - line.A.x) * (y - line.A.y) / (line.B.y - line.A.y) + line.A.x )

            if(  isBetweenABonYAxis && isIntersectLineOnXAxis ){

                intersectionCount++;

            }

        }

        //console.log(intersectionCount)

        return intersectionCount % 2 != 0
    }

    /**
     * check if the element object bounds is in an other bounds
     * 
     * @param {Number} x top left x coordonate origin of bounds
     * @param {Number} y top left y coordonate origin of bounds
     * @param {Number} width width of the bounds
     * @param {Number} height height of the bounds
     * 
     * @return {Boolean} true if element is in bounds
     */
    isInBounds(x, y, width, height){

        return (
            ( x < this.attrs.x ) &&
            ( this.attrs.x < x + width ) &&
            ( y < this.attrs.y ) &&
            ( this.attrs.y < y + height ) &&
            ( this.attrs.width < width - this.attrs.x ) &&
            ( this.attrs.height < height - this.attrs.y )
        )

    }
    
    isTouchBounds(x, y, width, height){

        return (
            ( this.attrs.x < x + width ) &&
            ( this.attrs.x + this.attrs.width > x ) &&
            ( this.attrs.y < y + height ) &&
            ( this.attrs.height + this.attrs.y > y )
        )

    }


    on(type, callback){
        this.listeners.push({
            type,
            callback
        })
    }

    trigger(type, event){
        this._getListeners(type).forEach(({callback}) => callback(event))
    }


    /**
     * 
     * @param {String} type 
     * @returns {Array<{type: String, callback: Function}>}
     */
    _getListeners(type){
        return this.listeners.filter((listener) => type === listener.type)
    }

    forceRerender(){
        if(this.canvas)this.canvas.render()
    }

    /**
         * 
         * @param {CanvasRenderingContext2D} context 
         */
    render(){  }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    renderNative(context){ 

        //reset shape
        this.renderShape = []

        this.render()

        let savedPoint;

        for (const shape of this.renderShape) {
            
            if(shape.type === 'point'){

                if(savedPoint){
                    context.lineTo(shape.x, shape.y)
                }else{
                    savedPoint = shape
                    context.moveTo(shape.x, shape.y)
                }   

            }else if(shape.type === 'background'){

                context.fillStyle = shape.color

            }else if(shape.type === 'boder'){

                context.strokeStyle = shape.color
                context.lineWidth = shape.width

            }

        }

     }

    getScale(){
        return {
            scaleX: this.attrs.width / this.attrs.resolution.width,
            scaleY: this.attrs.height / this.attrs.resolution.height
        }
    }


    //drawing functions

    renderSpace(width, height){
        this.attrs.resolution = { width, height }
    }

    background(color){
        this.renderShape.push({
            type: 'background',
            color,
            layer: this.currentLayer
        })
    }

    border(width, color){
        this.renderShape.push({
            type: 'border',
            width,
            color,
            layer: this.currentLayer

        })
    }

    point(x, y){

        let { scaleX, scaleY } = this.getScale()

        this.renderShape.push({
            type: 'point',
            x: (x * scaleX) + this.attrs.x,
            y: (y * scaleY) + this.attrs.y,
            layer: this.currentLayer

        })
    }

    rect(x, y, width, height){

        this.point(x, y)
        this.point(x + width, y)
        this.point(x + width, y + height)
        this.point(x, y + height)
        
    }

    cercle(x, y, radius){
        this.renderShape.push({
            type: 'cercle',
            x,
            y,
            radius
        })
    }

    text(value, x, y){
        this.renderShape.push({
            type: 'text',
            x,
            y,
            value,
            layer: this.currentLayer
        })
    }

    line(x, y, x1, y1){
        this.point(x, y)
        this.point(x1 ,y1)
    }

    nextLayer(){
        this.currentLayer++;
    }
}