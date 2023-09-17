import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "./src/lib/auth";

const UNAUTHENTICATED_PATHS = ['/signup', '/signin', '/forgot-password']

export async function middleware(request: NextRequest) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    const domain = baseURL?.split('://')[1]

    const accessToken = request.cookies.get('Authorization')?.value
    const refreshToken = request.cookies.get('Refresh-Token')?.value

    const token = await getAccessToken(accessToken, refreshToken)

    if(token && token.includes("expired")){
        const url = new URL('/signin?isAuthenticated=false', request.url)
        return NextResponse.redirect(url)
    }
    
    const isAuthenticated = !!token

    if (!isAuthenticated && !UNAUTHENTICATED_PATHS.includes(request.nextUrl.pathname)) {
        const url = new URL('/signin', request.url)
        return NextResponse.redirect(url)
      }
}

export const config = {
    matcher: [
      '/',
      '/signup',
      '/signin',
      '/forgot-password',
    ],
  }