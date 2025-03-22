"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { getDataCreatorByToken } from "@/api/get-data-creator-by-token";
import { CreatorResponse } from "@/api/get-all-posts";

interface AdminContextType {
    creatorId: string
    username: string
    imageProfileUrl: string
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [creatorId, setCreatorId] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [imageProfileUrl, setImageProfileUrl] = useState<string>('')
   
    // useEffect(() => {
    //     const fetchCookies = async () => {
    //         const cookies = await getCookie()   
    //         setCreatorId(cookies.id?.value)
    //         setUsername(cookies.username?.value)
    //         setImageProfileUrl(cookies.imageProfileUrl?.value)
    //     };
    //     fetchCookies()
    // }, [])

    useEffect(() => {
        const fetchDataCreator = async () => { 
            const data = await getDataCreatorByToken<CreatorResponse>(); 
            if(!data) return 
            const { imageProfileUrl, username, id} = data
            setCreatorId(id)
            setUsername(username)
            setImageProfileUrl(imageProfileUrl)
        }

        fetchDataCreator();
    }, []);

    return (
        <AdminContext.Provider value={{ 
            creatorId, 
            username, 
            imageProfileUrl, 
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    const context = useContext(AdminContext)
    if (!context) {
      throw new Error("useAdmin deve ser usado dentro de um AdminProvider")
    }
    return context
  }
