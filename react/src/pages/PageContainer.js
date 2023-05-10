export default function PageConainer({children}){
    return <div className="w-full max-md:h-[calc(100%-100px)] h-[calc(100%-70px)] absolute top-[70px] max-md:top-[100px]">
        {children}
    </div>
}