import CheckBox from "./CheckBox"
import Icon from "@heroicons/react/24/outline"

export default function Table({dataset, headers}){


    return <div className="w-full rounded-lg overflow-hidden border-[1px] bg-neutral-900/50  border-neutral-700/50">
        <table className="w-full h-full ">
            
            <thead className=" border-b-[1px] border-neutral-700/50">
                <tr >
                    { headers?.map((header, index) => <Header title={header.title} key={index} />) ?? null }
                </tr>
            </thead>
           
            <tbody>
                { dataset?.map((data, index) => <Row data={data} isLastRow={index > dataset.length-1} key={index} headers={headers} />) }
            </tbody>
           
        </table>
        <div className="w-full h-[70px] relative flex items-center justify-center">
            <h1 className="text-neutral-600">pages 1 - 50 of 73</h1>
            <div className="absolute right-0 flex gap-3 text-neutral-600 items-center">
                <h1>1 2 3 ... 8 9 10</h1>
                <div className="text-neutral-300 flex items-center gap-2 p-2 rounded-md border-[1px] border-neutral-600/50 mx-3">
                    <h1>Next</h1>
                    <Icon.ArrowRightIcon className="w-[20px] h-[20px]" />
                </div>
            </div>
        </div>
    </div>


}

function Header({ title }){
    return <th className="h-[30px] select-none p-3 py-6 hover:bg-neutral-700/10 text-left text-[15px] text-neutral-500 font-medium bg-neutral-900">
        { title }
    </th>
}

function Row({ data, headers, isLastRow }){

    return <tr className="hover:bg-neutral-700/20 relative">
        { headers.map(({datasetKey}, index) => <Cell key={index} value={data[datasetKey]} />) }
        { !isLastRow ? <div className="w-[calc(100%-30px)] h-[1px] bottom-0 left-[50%] translate-x-[-50%] absolute bg-neutral-700/20" /> : null }
    </tr>

}

function Cell({value}){
    return <td className="h-[30px] relative select-text p-3 py-6 text-left text-[16px] text-neutral-200 font-normal">
        {value}
    </td>
}