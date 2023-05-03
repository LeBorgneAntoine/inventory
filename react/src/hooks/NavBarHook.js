import { useState } from "react"

export function useNavBar(defaultName){

    const [title, setTitle] = useState(defaultName)

    return [title, setTitle]
}