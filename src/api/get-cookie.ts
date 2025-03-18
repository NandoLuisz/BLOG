"use server"

import { cookies } from "next/headers";

export async function getCookie(){
    const cookieStore = await cookies();
    
    const id = cookieStore.get('id-blog-app');
    const username = cookieStore.get('username-blog-app');
    const imageProfileUrl = cookieStore.get('imageProfileUrl-blog-app');
    const token = cookieStore.get('token-blog-app');

    return { id, username, imageProfileUrl, token };
    
}   