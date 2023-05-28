
export default class Historyhandler{

    actionsStack = []
    currentIndex = 0

    load(index){
        
    }

    save(action, undo){

        action()

        this.actionsStack.push({
            action,
            undo
        })

        this.currentIndex++;

    }


}