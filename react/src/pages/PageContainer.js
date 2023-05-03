export default function PageConainer({children}){
    return <div className="w-full h-[calc(100%-70px)] absolute top-[70px]">
        {children}
    </div>
}