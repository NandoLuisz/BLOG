"use server"

import { cookies } from "next/headers";

export async function deleteCookie(){
    const cookieStore  = await cookies()
    cookieStore.delete('id-blog-app')
    cookieStore.delete('username-blog-app')
    cookieStore.delete('imageProfileUrl-blog-app')
    cookieStore.delete('token-blog-app')
}   