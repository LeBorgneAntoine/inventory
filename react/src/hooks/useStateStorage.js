import { useEffect, useRef, useState } from "react"

export default function useStateStorage(defaultValue, saveID){

    const loadedValue = load(saveID)

    const [value, setValue] = useState( loadedValue ?? defaultValue);
    const previousValue = useRef( loadedValue ?? defaultValue)

    function load(id){

        try {
            return JSON.parse(localStorage.getItem(id))
        }catch(err){
            console.log(err)
            localStorage.removeItem(id)
            return null;
        }

    }

    useEffect(() => {

        console.log(value)

        if(value !== previousValue.current){
            if(value === null){
                localStorage.removeItem(saveID)
            }else{
                localStorage.setItem(saveID, JSON.stringify(value))
                previousValue.current = value;
            }
        }

    }, [value])

    return [value, setValue]
}