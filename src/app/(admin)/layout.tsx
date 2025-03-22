"use client"

import { CirclePlus, SquarePen, UserPen, X } from "lucide-react";
import Link from "next/link";
import { AdminProvider, useAdmin } from "./AdminContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminProvider> 
            <AdminContent>{children}</AdminContent>
        </AdminProvider>
    );
}

function AdminContent({ children }: { children: React.ReactNode }) {  

    return (
        <AdminProvider>
            <div className="min-h-screen flex relative">
                <SideBar />
                <div className="w-[1px] h-screen bg-gray-800"></div>
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </AdminProvider>
  );
}

function SideBar(){
    return (
        <div className="h-screen bg-gray-200 flex flex-col gap-10">
            <Link href="/">
            <div className="flex items-center px-12 py-3 border-b-2 border-gray-800">
                <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
            </div>
            </Link>
            <div className="flex flex-col items-end gap-5">
                <Link href="/add-blog">
                    <div className="w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                    <CirclePlus />
                    <span>Add blogs</span>
                    </div>
                </Link>
                <Link href="/blog-list">
                    <div className="w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                    <SquarePen />
                    <span>Lista de blogs</span>
                    </div>
                </Link>
                <Link href="/update-profile">
                    <div className="w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                    <UserPen />
                    <span>Meu perfil</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

function MainContent({ children }: { children: React.ReactNode }) {
    const { imageProfileUrl, username } = useAdmin(); 
  
    return (
        <div className='w-full h-screen flex-1 relative'>
            <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                <span>Painel do administrador</span>
                {(imageProfileUrl && username) ? (
                    <img 
                        src={imageProfileUrl}  
                        alt={username} 
                        className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover' />
                ): (
                    <img 
                        src="/perfil.jpeg" 
                        width={50} 
                        height={50} 
                        alt="username" 
                        className='rounded-4xl cursor-pointer' />
                )}
            </div>
            <main className="w-full relative pl-16 pt-10">{children}</main>
        </div>
    );
  }

