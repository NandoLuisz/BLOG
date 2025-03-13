import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface CardPostProps{
    id: number
    imagePost: string
    imageProfile: string
    type: string
    creator: string
    title: string
}

export default function CardPost({ id, imagePost, imageProfile, type, creator, title }: CardPostProps){
    return (
        <div className="border-[0.5px] border-black hover:shadow-links">
            <img src={imagePost} alt="" className='w-full h-[200px]'/>
            <div className="w-full px-2 py-2 flex flex-col gap-2">
                <div className="w-full flex items-center justify-between ">
                <img src={imageProfile} alt="" className='w-[50px] h-[50px]'/>
                <p className="bg-black text-white px-1 py-1 text-xs">{type}</p>
                </div>
                <p className="font-serif">{creator}</p>
                <p className="tracking-tighter">{title}</p>
                <Link href={`/post/${id}`}>
                <button className="flex bg-zinc-100 px-2 py-[0.5px] rounded-md hover:bg-zinc-200 cursor-pointer">
                    Ler mais  
                    <ArrowUpRight />
                </button>
                </Link>
            </div>
        </div>
    )
}