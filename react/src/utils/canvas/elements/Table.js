import CanvasElement from "../CanvasElement";

export default class Table extends CanvasElement{

    setup(){

        this.renderSpace(100, 100)

    }

    render(){

        this.rect(0, 0, 100, 100)


    }

}