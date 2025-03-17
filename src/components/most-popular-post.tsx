"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { PostResponse } from "@/api/get-all-posts"
import { useEffect, useState } from "react"
import { lastPost } from "@/api/get-last-post"
import formatarData from "@/api/date-format"


export default function MostPopularPost(){

    const [mostPopularPost, setMostPopularPost] = useState<PostResponse | null>(null)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const post = await lastPost()
                if (post != null) {
                    setMostPopularPost(post) 
                }
            } catch (error) {
                console.error("Erro ao buscar o post:", error)
            }
        }

        fetchPosts()

    }, [])

    if (!mostPopularPost) return <p>Carregando...</p>

    return(
        <div className='w-[80%] px-4 py-4'>
            {mostPopularPost ? (
                <div className="w-full relative">
                <img src={mostPopularPost.imagePostUrl} alt={mostPopularPost.title} className='w-full h-[600px] object-cover border-[0.5px] border-black'/>
                <div className="absolute left-10 bottom-10 flex items-center gap-4">
                    <img 
                        src={mostPopularPost.creator.imageProfileUrl} 
                        alt={mostPopularPost.creator.username} 
                        className="w-[80px] h-[80px] border-2 border-white rounded-full object-cover z-10"/>
                    <div>
                        <div>
                            <p className="font-poppins text-white">{formatarData(mostPopularPost.createdAt)}</p>
                            <p className="z-10 text-white text-2xl font-serif">{mostPopularPost.creator.username}</p>
                            <p className="z-10 text-white text-3xl tracking-tighter">{mostPopularPost.title}</p>
                        </div>
                    </div>
                </div>
                <Link href={`/post/${mostPopularPost.id}`}>
                    <button 
                        className="flex bg-zinc-100 px-4 py-2 rounded-md hover:bg-zinc-200 cursor-pointer absolute bottom-10 right-10 z-50 pointer-events-auto">
                        Ler mais  
                        <ArrowUpRight />
                    </button>
                </Link>
            </div>
            ) : (
                <h2>Não tem posts. Seja o primeiro a fazer um!</h2>
            )}
        </div>
    )
}
function fisrtPost() {
    throw new Error("Function not implemented.")
}

