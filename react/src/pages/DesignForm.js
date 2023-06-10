import Icon from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export  default function DesignForm(){

    const navigate = useNavigate()

    return <div className="text-neutral-100 p-2">

        <div>
            <div onClick={() => navigate('/design/new')} className='select-none my-3 h-[60px] w-[200px] flex items-center gap-2 p-1 px-3 cursor-pointer xl:hover:opacity-75 bg-neutral-700/50 rounded-lg'>
                <Icon.PlusIcon className='w-[25px] h-[25px]' />
                <h1 className='flex-1 text-right'>Nouveau document</h1>
            </div>
        </div>
        
        <div className="flex gap-2 items-center">
            <Icon.ClockIcon className='w-[20px] h-[20px]' />
            <h1>Récents</h1>
        </div>
        <div className="h-[1px] w-full bg-neutral-500/50 mb-5 mt-2" />

    
    </div>
}