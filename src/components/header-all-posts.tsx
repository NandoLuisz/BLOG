"use client"

import { deleteCookie } from "@/api/delete-cookie";
import { getCookie } from "@/api/get-cookie";
import { ArrowRight, LogOut, X } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderAllPosts(){

    const [creatorAuthenticated, setCreatorAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<RequestCookie | undefined>(undefined)
    const [imageProfileUrl, setImageProfileUrl] = useState<RequestCookie | undefined>(undefined)
    const [token, setToken] = useState<RequestCookie | undefined>(undefined)
    const [modalPerfil, setModalPerfil] = useState<boolean>(false)

    console.log(imageProfileUrl)
    
    useEffect(() => {
        const fetchCookies = async () => { 
            const cookies = await getCookie(); 
            setImageProfileUrl(cookies.imageProfileUrl)
            setUsername(cookies.username)
            setToken(cookies.token)
            setCreatorAuthenticated(!!cookies.token);
        }

        fetchCookies();
    }, []);

    const handleLogout = () => {
        deleteCookie()
        window.location.reload()
    };


    return(
        <header className='w-full h-[20vh]'>
            <div className="flex items-center justify-between px-12 py-3 relative">
                {modalPerfil && (
                    <div className="absolute min-w-[100px] h-[100px] flex flex-col justify-between rounded-md px-3 py-3 right-12 top-20 border-[2px] border-black">
                        <p className="text-base">{username?.value}</p>
                        <div className="w-full h-[2px] bg-zinc-600"></div>
                        <div className="w-full flex gap-2" onClick={() => handleLogout()}>
                            <LogOut className="size-5 text-red-600 cursor-pointer"/>
                            <span className="text-sm text-red-600 cursor-pointer">sair</span>
                        </div>
                    </div>
                )}
                <Link href="/">
                    <div className='flex items-center cursor-pointer'>
                        <img src={"/icon-logo.png"} width={66} height={66} alt="Logo" />
                        <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                    </div>
                </Link>
               {creatorAuthenticated ? (
                <div className="flex items-center gap-5">
                    <Link href="/admin/addBlog">
                        <div className='bg-white flex items-center gap-3 p-2 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <span>Meu inventário</span>
                        </div>
                    </Link>
                    {(imageProfileUrl && username) ? (
                        <img src={imageProfileUrl.value} 
                            alt={username.value} 
                            className={`rounded-full cursor-pointer w-[55px] h-[55px] object-cover ${modalPerfil ? "border-[2px] border-black" : "border-2 border-white"}`} 
                            onClick={() => setModalPerfil(!modalPerfil)}
                            />
                    ): (
                        <img src="/perfil.jpeg" alt="username" className='rounded-full cursor-pointer w-[55px] h-[55px] object-cover' />
                    )}
                </div>
               ) : (
                <Link href="auth/login">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-[0.5px] 
                                    border-black text-black text-base cursor-pointer shadow-links hover:shadow-links-move">
                            Começar
                            <ArrowRight />
                        </div>
                </Link>
               )}
            </div>
        </header>
    )
}