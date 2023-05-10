import { useState } from "react"

export default function Input({value, setValue, placeholder, label, Icon, type, className}){

    const [focus, setFocus] = useState(false)

    function handleFocus(ev){
        setFocus(true)
    }

    function clearFocus(){
        setFocus(false)
    }

    function handleChange(e){
        if(setValue)setValue(e.target.value)
    }

    return <div className={className}>
        <h3 className="ml-2">{label}</h3>
        <div style={{border: focus ? 'solid 1px rgba(150,150,150, .9)' : ''}} className="bg-white border-[1px] relative flex items-center overflow-hidden rounded-md h-[50px]">
            <input placeholder={placeholder} onBlur={clearFocus} onChange={handleChange} value={value} onFocus={handleFocus} className="px-2 text-[18px] border-1 bg-transparent h-full w-[calc(100%-30px)] outline-none" type={type} />
            {Icon && <Icon className='absolute opacity-30 right-2 w-[25px] h-[25px]' />}
        </div>
    </div>
}