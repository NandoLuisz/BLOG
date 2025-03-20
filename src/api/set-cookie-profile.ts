"use server"

import { cookies } from "next/headers";

export async function setCookieProfile( imageProfileUrl: string ){
    const cookieStore  = await cookies()
    cookieStore.set('imageProfileUrl-blog-app', imageProfileUrl, { maxAge: 3600 })
}   