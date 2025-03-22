"use server"

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { CreatorResponse } from "./get-all-posts";

export async function getDataCreatorByToken<CreatorResponse>(){
    const cookieStore = await cookies();
    
    const tokenCookie = cookieStore.get('token-blog-app');

    if(!tokenCookie) return null

    const token = tokenCookie.value

    const response = await api.get<CreatorResponse>(`/creator/data-creator-by-token/${token}`, )

    return response.data
    
}   