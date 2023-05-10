const { useState } = require("react")

export default function useFolder(){
 
    const [stack, setStack] = useState([])
    const [current, setCurrent] = useState(null)
    

    function go(folder){

        if(current)setStack([...stack, current])
        setCurrent(folder)
        
    }

    function back(){

        let value = stack.at(-1)
        if(value)setStack(stack.slice(0, -1))
        setCurrent(value? value : null)

        

    }

    return {
        go,
        back,
        current,
        stack
    }
}