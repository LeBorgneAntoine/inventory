import { useNavigate } from "react-router-dom"
import Icon from '@heroicons/react/24/outline'
import { Table } from "../components"

export default function Clients(){

    const navigate = useNavigate()

    return <div className="text-neutral-100">
        
        <div className="w-full flex justify-between items-center py-3 px-3">

            <div>
                <h1 className="text-[25px] font-semibold">Clients</h1>
            </div>

           <div className=" flex gap-3">
                <div className="border-[1px] border-neutral-700 h-[40px] flex items-center rounded-lg px-4">
                    
                    <h1>Export CSV</h1>

                </div>

                <div className="bg-primary h-[40px] flex items-center rounded-lg px-4">
                    
                    <h1>Create client</h1>

                </div>
            </div>

        </div>

        <div className="h-[1px] w-full bg-neutral-500/50 mb-5 mt-2" />
        
    

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


}


function ClientRow({}){
    
}