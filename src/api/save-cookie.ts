"use server"

import { cookies } from "next/headers";

export async function saveCookie(id: string, username: string, imageProfileUrl: string, token: string){
    const cookieStore  = await cookies()
    cookieStore.set('id-blog-app', id, { maxAge: 3600 })
    cookieStore.set('username-blog-app', username, { maxAge: 3600 })
    cookieStore.set('imageProfileUrl-blog-app', imageProfileUrl, { maxAge: 3600 })
    cookieStore.set('token-blog-app', token, { maxAge: 3600 })
}   