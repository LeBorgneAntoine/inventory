import CanvasElement from "./CanvasElement"

export default class ShapeTool{

    element
    points = []
    current = -1;
    attrs = {  }

    /**
     * 
     * @param {CanvasElement} element 
     */
    constructor(element){
        this.element = element
    }

    /**
     * @returns {Array<Shape>}
     */
    getShapes(){

    }

    moveTo(x, y){


    }

    point(x, y){
        this.points.push({x, y})
    }

    fill(){
        this.attrs.fill = true
    }

    stroke(){
        this.attrs.stroke = true
    }

}


class Shape{

    points = []



}