import { ArrowRight } from "lucide-react";

export default function HeaderAllPosts(){
    return(
        <header className='w-full h-[20vh]'>
            <div className="flex items-center justify-between px-12 py-3">
                <div className='flex items-center cursor-pointer'>
                    <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                    <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                </div>
                <div className="flex items-center justify-center px-4 py-2 border-[0.5px] 
                            border-black text-black text-base cursor-pointer shadow-links hover:shadow-links-move">
                Começar
                <ArrowRight />
                </div>
            </div>
        </header>
    )
}