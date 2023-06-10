import Button from "./Button"
import CheckBox from "./CheckBox"
import Icon from "@heroicons/react/24/outline"
import React from 'react'

export default function Table({dataset, headers}){


    return <div className="w-full h-full rounded-lg overflow-hidden border-[1px] dark:bg-neutral-900/50 bg-neutral-50  dark:border-neutral-700/50 border-neutral-300">

        <table className="w-full h-full ">
            
            <thead className=" border-b-[1px] dark:border-neutral-700/50 border-neutral-300">
                <tr >
                    { headers?.map((header, index) => <Header title={header.title} key={index} />) ?? null }
                </tr>
            </thead>
           
            <tbody>
                { dataset?.map((data, index) => <Row data={data} isLastRow={index > dataset.length-1} key={index} headers={headers} />) }
            </tbody>
           
        </table>

        <div className="w-full h-[70px] relative flex items-center justify-center px-2">
            <h1 className="text-neutral-600">pages 1 - 50 of 73</h1>
            <div className="absolute right-3 flex gap-3 text-neutral-600 items-center">
                <h1>1 2 3 ... 8 9 10</h1>
                <Button secondary RightIcon={Icon.ArrowRightIcon} >Next</Button>
            </div>
        </div>

    </div>


}

function Header({ title }){
    return <th className="h-[20px] select-none p-3 py-4 dark:hover:bg-neutral-700/10 hover:bg-neutral-400/10 text-left text-[15px] dark:text-neutral-500 text-neutral-400 font-medium dark:bg-neutral-900">
        { title }
    </th>
}

function Row({ data, headers, isLastRow }){

    return <tr className="dark:hover:bg-neutral-700/20 hover:bg-neutral-300/20 relative">
        { headers.map(({datasetKey}, index) => <Cell key={index} value={data[datasetKey]} />) }
        { !isLastRow ? <div className="w-[calc(100%-30px)] h-[1px] bottom-0 left-[50%] translate-x-[-50%] absolute dark:bg-neutral-700/20 bg-neutral-300/40" /> : null }
    </tr>

}

function Cell({value}){
    return <td className="h-[20px] relative select-text p-3 py-4 text-left text-[16px] dark:text-neutral-200 font-normal">
        {value}
    </td>
}