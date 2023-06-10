import { useNavigate } from "react-router-dom"
import Icon from '@heroicons/react/24/outline'
import { Button, Table } from "../components"
import { motion } from 'framer-motion'
import React from 'react'

export default function Clients(){

    const navigate = useNavigate()

    return <div className="dark:text-neutral-100 text-neutral-900 ">
        
        <div className="w-full flex justify-between items-center py-3 px-3">

            <div className="flex gap-2 items-center">

                <h1 className="text-[26px] font-semibold">Clients</h1>

                <motion.div onClick={() => navigate('/clients/settings')} className="w-[30px] h-[30px] dark:bg-neutral-700/50 dark:text-neutral-400 cursor-pointer bg-neutral-200 rounded-full flex justify-center items-center" whileHover={{scale: 1.1}}  >
                    <Icon.Cog6ToothIcon  className="w-[20px] h-[20px]" />
                </motion.div>

            </div>

           <div className=" flex gap-3">
                <Button secondary >Export CSV</Button> 

                <Button RightIcon={Icon.PlusIcon} >Create Client</Button>
            </div>

        </div>

        <div className="h-[1px] w-full dark:bg-neutral-500/50 bg-neutral-500/20 mb-5 mt-2" />
        
    
        <div className="h-full w-full flex flex-col">
            <Table dataset={[
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},
                {fullname: 'Usert1', email: 'mail@ùmail.com', updateDate : '13/09/2000'},

            ]} headers={[
                {title: 'Fullname', datasetKey: 'fullname'},
                {title: 'Email', datasetKey: 'email'},
                {title: 'Last update', datasetKey: 'updateDate'},
            ]} />
        </div>
       

    </div>


}


function ClientRow({}){
    
}