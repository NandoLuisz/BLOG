"use server"

import { cookies } from "next/headers";

export async function setCookie( token: string ){
    const cookieStore  = await cookies()
    cookieStore.set('token-blog-app', token, { maxAge: 3600 })
}   