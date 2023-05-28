import CanvasElement from "./CanvasElement"


export default class CanvasEvent{

    target
    x
    y
    type
    nativeEvent
    selection
    elements

    /**
     * 
     * @param {{
     * target: CanvasElement,
     * x: Number, 
     * y: Number, 
     * innerX: Number,
     * innerY: Number,
     * type: String, 
     * nativeEvent: Event,
     * seletion: { x: Number, y: Number, width: Number, height: Number }
     * }} param0 
     */
    constructor({target, x, y, type, nativeEvent, seletion, innerX, innerY}){
        this.target = target
        this.x = x
        this.y = y
        this.type = type
        this.nativeEvent = nativeEvent
        this.selection = seletion
        this.innerX = innerX
        this.innerY = innerY
    }

 

}


/**
 * @param {Event} event native event
 * @param {Array<CanvasElement>} elements list of possible targets 
 * @param {String} type of canvas event is process for 
 */
function processNativeEvent(event, elements){

    let { x, y } = relativeHTMLPosition(event.target, event.clientX, event.clientY)
    
    let target = getTarget(x, y, elements)

    let { innerX, innerY } = relativeElementPosition(target, x, y)


    let finalEvent = new CanvasEvent({
        target,
        x,
        y,
        nativeEvent: event,
        innerX,
        innerY
    })

    return finalEvent

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
function getTarget(x, y, elements){

    for (let i = elements.length - 1; i >= 0; i--) {
        if( elements[i].hasPoint(x, y) ) return elements[i];
    }
    
    return null

}

function relativeHTMLPosition(container, eventX, eventY){

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
function relativeElementPosition(container, x, y){

    if(!container)return {x: -1, y: -1}

    const rect = container.attrs;

    let xPos =  x - rect.x;
    let yPos =  y - rect.y;
    
    return {
        innerX: xPos, innerY: yPos
    }   
}

export {
    processNativeEvent
}