"use client"

import formatarData from '@/api/date-format'
import { deletePostByPost } from '@/api/delete-post-by-id'
import { PostResponse } from '@/api/get-all-posts'
import { getAllPostsByCreator } from '@/api/get-all-posts-by-creator'
import { getCookie } from '@/api/get-cookie'
import { api } from '@/lib/api'
import { CirclePlus, SquarePen, UserPen, X  } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'


export default function BlogList(){

    const [username, setUsername] = useState<RequestCookie | undefined>(undefined)
    const [imageProfileUrl, setImageProfileUrl] = useState<RequestCookie | undefined>(undefined)
    const [creatorIdCookie, setCreatorIdCookie] = useState<RequestCookie | undefined>(undefined)
    const [postsByCreator, setPostByCreator] = useState<PostResponse[]>([])
    const [modalDeleteSure, setModalDeleteSure] = useState<boolean>(false)
    const [titlePost, setTitlePost] = useState<string>('')
    const [idPost, setIdPost] = useState<string>('')


    useEffect(() => {
        const fetchCookies = async () => {
            const cookies = await getCookie(); 
            setImageProfileUrl(cookies.imageProfileUrl)
            setUsername(cookies.username)
            setCreatorIdCookie(cookies.id)
        }

        fetchCookies()
    }, [])

    useEffect(() => {
        if(!creatorIdCookie) return

        const creatorId = creatorIdCookie?.value
        console.log("creatorId" + creatorId)
        const fetchPosts = async () => {
            const posts = await getAllPostsByCreator(creatorId)
            setPostByCreator(posts)
        }

        fetchPosts()
    }, [creatorIdCookie])

    function truncateText(text: string, maxLength: number = 45): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    function truncateTextName(text: string, maxLength: number = 12): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <main className="w-full h-[120vh] flex items-start font-poppins relative">
            {modalDeleteSure && (
                <div className='w-full min-h-screen bg-black/60 fixed flex items-center justify-center'>
                    <div className='w-[320px] h-[220px] bg-white rounded-md flex flex-col items-center justify-center gap-5 p-2 relative'>
                        <X 
                            className='absolute right-2 top-2 text-zinc-700 hover:text-zinc-900 cursor-pointer'
                            onClick={() => setModalDeleteSure(false)}
                        />
                        <div className='w-full text-center'>
                            <h3 className='text-xl'>Tem certeza que deseja deletar o post:</h3>
                            <p className='font-medium'>{titlePost}</p>
                        </div>
                        <div className='flex gap-3'>
                            <button 
                                className='px-10 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                                onClick={() => [deletePostByPost(idPost), handleReload()]}>
                                    Sim
                            </button>
                            <button 
                                className='px-10 py-1 rounded-md bg-zinc-400 hover:bg-zinc-500 text-white cursor-pointer'
                                onClick={() => setModalDeleteSure(false)}>
                                    Não
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="min-h-[120vh] bg-gray-200 flex flex-col gap-10">
                <Link href="/">
                    <div className="flex items-center px-12 py-3 border-b-[2px] border-gray-800">
                        <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                        <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                    </div>
                </Link>
                <div className='flex flex-col items-end gap-5'>
                    <Link href="/admin/addBlog">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <CirclePlus />
                            <span>Add blogs</span>
                        </div>
                    </Link>
                    <Link href="/admin/blogList">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <SquarePen />
                            <span>Lista de blogs</span>
                        </div>
                    </Link>
                    <Link href="/admin/updateProfile">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <UserPen /> 
                            <span>Meu perfil</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="w-[1px] h-[120vh] bg-gray-800"></div>
            <div className='w-full h-screen flex-1'>
                <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                    <span>Painel do administrador</span>
                    {(imageProfileUrl && username) ? (
                        <img 
                            src={imageProfileUrl.value} 
                            alt={username.value} 
                            className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover' />
                    ) : (
                        <img 
                            src="/perfil.jpeg" 
                            alt="username" 
                            className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover' />
                    )}
                </div>
                <div className='w-full h-full p-10'>
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
                                                className='text-zinc-700 hover:text-zinc-900'
                                                onClick={() => [setModalDeleteSure(true), setTitlePost(post.title), setIdPost(post.id)]}/>
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className='text-zinc-400 text-center'>Não tem posts para serem exibidos.</span>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}