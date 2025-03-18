import { NextRequest, NextResponse } from "next/server"
import { getAuthenticated } from "./api/get-authenticated"

export default async function middleware(request: NextRequest){
    const isAuthenticated = await getAuthenticated()
    if (
        (request.nextUrl.pathname.startsWith('/auth/login') || 
         request.nextUrl.pathname.startsWith('/auth/register')) 
        && isAuthenticated
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/admin/addBlog') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}
