import { NextRequest, NextResponse } from "next/server";
import { UserResponse } from "./src/api/types";
import { ME_PATH } from "./src/api/users";
import { getAccessToken } from "./src/lib/auth";
import { Env } from "./src/lib/fetcher/clientFetcher";
import { baseFetcher } from "./src/lib/fetcher/fetcherUtils";

const UNAUTHENTICATED_PATHS = ['/signup', '/signin', '/forgot-password', '/verify', '/reset-password']

export async function middleware(request: NextRequest) {
    const environment = request.cookies.get('Environment')?.value as Env
    const accessToken = request.cookies.get('Authorization')?.value
    const refreshToken = request.cookies.get('Refresh-Token')?.value
    const token = await getAccessToken(accessToken, refreshToken)
    const isAuthenticated = !!token
    
    if (!isAuthenticated && !UNAUTHENTICATED_PATHS.includes(request.nextUrl.pathname)) {
        const url = new URL('/signin', request.url)
        return NextResponse.redirect(url)
    }

    if (isAuthenticated) {
      
      let userData = null as UserResponse | null
      try {
        userData = (await baseFetcher(
          ME_PATH,
          accessToken,
          refreshToken,
          environment
        )) as UserResponse
      } catch (error) {
        console.log(error)
      }
  
      if (!userData) {
        const url = new URL('/signin', request.url)
        return NextResponse.redirect(url);
      }

      if(userData.status === 'VERIFY' && !request.nextUrl.pathname.includes('/verify')){
        const url = new URL('/verify', request.url)
        return NextResponse.redirect(url)
      }

      if(userData.status !== 'VERIFY' && request.nextUrl.pathname.includes('/verify')){
        const url = new URL('/', request.url)
        return NextResponse.redirect(url)
      }
      
      if (request.nextUrl.pathname === '/signin') {
        const url = new URL('/', request.url)
        return NextResponse.redirect(url)
      }
  
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
      '/',
      '/signup',
      '/signin',
      '/forgot-password',
      '/verify',
      '/reset-password'
    ],
  }