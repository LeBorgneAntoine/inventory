import CanvasElement from "../CanvasElement"


export default class Rectangle extends CanvasElement{

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    setup(){

        this.renderSpace(100, 100)

    }

    render(){

        
        this.background(this.getStyle('background-color') ?? 'grey')
        this.rect(0, 0, 100, 100)

        if(this.isFocus){

            this.border(1, 'blue')

        }else{

            this.border(this.getStyle('border-width') ?? 1, this.getStyle('border-color') ?? 'transparent')

        }
    }   



}
