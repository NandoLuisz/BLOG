import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    { path: '/login', dynamic: false, whenAuthenticated: 'redirect' },
    { path: '/register', dynamic: false, whenAuthenticated: 'redirect' },
    { path: '/', dynamic: false, whenAuthenticated: 'next' },
    { path: '/post/', dynamic: true, whenAuthenticated: 'next' },
] as const 

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login'

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const authToken = request.cookies.get('token-blog-app')

    const publicRoute = publicRoutes.find(route => 
        route.path === path || (route.dynamic === true && path.startsWith(route.path)))


    if (!authToken && publicRoute){
        return NextResponse.next()
    }

    if (!authToken && !publicRoute){
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

        return NextResponse.redirect(redirectUrl)
    }   

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/'

        return NextResponse.redirect(redirectUrl)
    }
    
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }