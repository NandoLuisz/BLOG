"use server";

import { cookies } from "next/headers";

export async function getAuthenticated() {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token-blog-app");

    if(token){
        return true
    }
    
    return false
    

}