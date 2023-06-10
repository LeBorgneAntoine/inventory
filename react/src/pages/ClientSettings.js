import { useNavigate } from "react-router-dom";
import { Input } from "../components";
import Icon from '@heroicons/react/24/outline'
 
import React from 'react'


export default function ClientSettings(){

    const navigate = useNavigate()


    return <div className="dark:text-neutral-100 flex flex-col items-center h-full dark:scrollbar-dark overflow-y-auto p-2 pb-5">

    <div onClick={() => navigate(-1, {replace: true})} className="absolute top-2 left-2 py-2 px-3 bg-neutral-800 rounded-lg flex gap-2 items-center select-none xl:hover:opacity-25 cursor-pointer">
        <Icon.ChevronLeftIcon className="w-[20px] h-[20px]" />
        <h1>Annuler</h1>
    </div>

     <div className="relative max-w-[600px] w-full pt-10">

        <h1 className="font-bold text-2xl">Clients Settings</h1>

        <div className="h-[1px] w-full bg-neutral-500/50 my-5" />
        
       

    </div>   

</div>

}