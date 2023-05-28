export default function Table({dataset, setDataset, editable, headers}){


    return <div>
        <table className="">

            <th className="w-full">
                {headers?.map((header, index) => <Header title={header.title} key={index} />) ?? null}
            </th>

            
            
        </table>
    </div>


}

function Header({title}){
    return <td className="w-full h-[30px] text-[16px] px-3 text-neutral-200 font-normal border-[1px] border-neutral-600">
        {title}
    </td>
}

function Row({data}){
    return <tr>

    </tr>
}