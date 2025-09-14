import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

const PUBLIC_ROUTES = ['/login' ,'signup']
const AUTH_ROUTES = ['/home', '/recipes', '/recipes/[id]', '/your-posts', '/favourites', '/profile']

export async function middleware(request: NextRequest){
    const token = request.cookies.get('token')?.value
    const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname)
    const isAuthRoute = AUTH_ROUTES.some(route => request.nextUrl.pathname.startsWith(route))

    if(token && isPublicRoute){
        return NextResponse.redirect(new URL('/home' , request.url))
    }

    if(isAuthRoute){
        if(!token){
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            await verifyJWT()
        } catch (error) {
            console.log(error);
            const response = NextResponse.redirect(new URL('/login' , request.url))
            response.cookies.delete('token')
            return response
        }
    }

    return NextResponse.next()

}