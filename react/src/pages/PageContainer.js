export default function PageConainer({children}){
    return <div className="w-full max-md:h-[calc(100%-var(--h-nav))] h-[calc(100%-70px)] absolute top-[70px] max-md:top-[var(--h-nav)]">
        {children}
    </div>
}