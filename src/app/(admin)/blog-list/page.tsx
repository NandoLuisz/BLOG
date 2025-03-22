"use client"

import formatarData from "@/api/date-format";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";
import { getAllPostsByCreator } from "@/api/get-all-posts-by-creator";
import { PostResponse } from "@/api/get-all-posts";
import { deletePostById } from "@/api/delete-post-by-id";

export default function BlogListPage(){

    const { creatorId } = useAdmin();

    const [postsByCreator, setPostByCreator] = useState<PostResponse[]>([])

     useEffect(() => {
        if(!creatorId) return

        const fetchPosts = async () => {
            const posts = await getAllPostsByCreator(creatorId)
            setPostByCreator(posts)
        }

        fetchPosts()
    }, [creatorId, postsByCreator])

    function truncateText(text: string, maxLength: number = 45): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    function truncateTextName(text: string, maxLength: number = 12): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    return ( 
        <div className='w-full h-full'>
            <h3 className='text-xl font-semibold mb-5'>Teus Posts</h3>
            <div className='w-[852px] min-h-[10vh] border-[1px] border-black text-center'>
                <div className='w-[850px] grid grid-cols-[200px_400px_200px] bg-zinc-200 p-2'>
                    <span className='font-medium'>Nome do autor</span>
                    <span className='font-medium'>Título do post</span>
                    <div className='w-[220px] flex justify-between'>
                        <span>Data</span>
                        <span>Ação</span>
                    </div>
                </div>
                {postsByCreator.length > 0 ? (
                    postsByCreator.map((post) => (
                        <div 
                            className='w-[850px] grid grid-cols-[200px_400px_150px] p-2 border-t-[1px] border-zinc-200'
                            key={post.id}>
                            <div className='flex gap-2 items-center'>
                                <img 
                                    src={post.creator.imageProfileUrl}     
                                    alt={post.creator.username}
                                    className='rounded-4xl cursor-pointer w-[35px] h-[35px] object-cover' />
                                    <span>{truncateTextName((post.creator.username).toString())}</span>
                                </div>
                                <span className='flex items-center'>{truncateText((post.title).toString())}</span>
                            <div className='w-[210px] flex justify-between'>
                                <span className='flex items-center'>{formatarData(post.createdAt)}</span>
                                <span className='flex items-center'>
                                    <X 
                                        className='text-zinc-700 hover:text-red-700'
                                        onClick={() => deletePostById(post.id)}/>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='text-zinc-400 text-center'>Não tem posts para serem exibidos.</span>
                )}
            </div>
        </div>
    )
}