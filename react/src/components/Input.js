import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion';
import IconFull from '@heroicons/react/24/solid'

export default function Input({value, setValue, placeholder, error, focus, label, Icon, type, className, passwordToggle, strength, searchResults}){

    const [isFocus, setFocus] = useState(false)
    const [localValue, setLocalValue] = useState('')

    function handleFocus(ev){
        setFocus(true)
        if(focus)focus(true)
    }

    function clearFocus(){
        setFocus(false)
        if(focus)focus(false)
    }

    function handleChange(e){
        if(setValue)setValue(e.target.value)
        setLocalValue(e.target.value)
    }



    return <div className={className}>
        <div className="relative">
            {label ? <h3 className="ml-2 mb-2 text-neutral-700 dark:text-neutral-500 select-none">{label}</h3> : null}
            <div style={{border: isFocus ? 'solid 1px var(--primary)' : (error ? 'solid 1px rgba(225,87,87, .9)' : '')}} className="bg-neutral-50  dark:placeholder-neutral-800 dark:bg-neutral-800/70 border-[1px] dark:text-neutral-100 dark:border-neutral-700 duration-100 relative flex items-center overflow-hidden rounded-lg h-[60px] md:h-[50px]">
                <input placeholder={placeholder} onBlur={clearFocus} onChange={handleChange} value={value} onFocus={handleFocus} className="px-4 text-[18px] border-1 bg-transparent h-full w-[calc(100%-30px)] outline-none" type={type} />
                {Icon && <Icon style={{ color: isFocus ? 'rgb(59 130 246 / var(--tw-bg-opacity))' : (error ? 'rgba(225,87,87, .9)' : '#c8c8c8') }} className='absolute pointer-events-none right-2 w-[20px] h-[20px]' />}
            </div>
            {strength ? <StrengthChecker value={localValue} rules={strength}  /> : null}
            {searchResults ? 
                
                <div className="absolute z-20 bg-neutral-800 rounded-lg w-full mt-2 border-[1px] border-neutral-700/70 p-2 drop-shadow-lg">
                    {searchResults.map((result) => <><div className="hover:bg-neutral-600/50 w-full h-[60px] cursor-pointer rounded-md px-2 flex flex-col justify-center">
                        <h3 className="text-[17px]">{result.title}</h3>
                        <h3 className="opacity-50">{result.location}</h3>
                        <IconFull.ChevronRightIcon className="absolute right-3 w-[20px] h-[20px]" />
                    </div>
                    <div className="h-[1px] w-full bg-neutral-500/50 mb-1 mt-2" />
                    </>)}
                    <h1 className="mx-2 text-[15px] opacity-60">{searchResults.length} résultat(s)</h1>
                </div> 
            
            : null}
        </div>
       
    </div>
}

/**
 * 
 * @param {{rules: Array<Function>}} param0 
 * @returns 
 */
function StrengthChecker({value, rules}){

    const [error, setError] = useState(null);
    const [passed, setPassed] = useState(-1)

    useEffect(() => {

        let passedCount = -1;

        for(let rule of rules){

            let check = rule(value);

            if(check !== true) {
                setError(check)
                break;
            }

            passedCount ++;

        }

        setPassed(passedCount);

    }, [value])

    useEffect(() => {
        console.log(passed)
    }, [passed])

    return <><div className="flex items-center gap-2 mt-2 ml-2">
    {rules.map((rule, index) => <div key={index} style={{ backgroundColor: passed >= index ? '#61bb4a' : null }} className="bg-neutral-400 w-[50px] h-[5px] rounded-full" />)}
    </div>
    {error && value.length > 0 ? <div className="flex items-center gap-2 mt-2 ml-3">  
        <IconFull.ExclamationCircleIcon className="w-[20px] h-[20px] text-neutral-400" />
        <h3 className="dark:text-neutral-600 text-neutral-800">{error}</h3>
    </div> : null}
    </>

}