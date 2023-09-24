import { NextRequest, NextResponse } from "next/server";
import { UserResponse } from "./src/api/types";
import { ME_PATH } from "./src/api/users";
import { getAccessToken } from "./src/lib/auth";
import { Env } from "./src/lib/fetcher/clientFetcher";
import { baseFetcher } from "./src/lib/fetcher/fetcherUtils";

const UNAUTHENTICATED_PATHS = ['/signup', '/signin', '/forgot-password', '/reset-password'];

async function getUserData(accessToken: string | undefined, refreshToken: string | undefined, environment: Env): Promise<UserResponse | null> {
  try {
      return (await baseFetcher(ME_PATH, accessToken, refreshToken, environment)) as UserResponse;
  } catch (error) {
      console.error(error);
      return null;
  }
}

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
      const userData = await getUserData(accessToken, refreshToken, environment);
      if (!userData) {
          const response = NextResponse.redirect('/signin');
          response.cookies.set('Authorization', "");
          response.cookies.set('Refresh-Token', "");
          response.cookies.delete('Authorization');
          response.cookies.delete('Refresh-Token');
          return response;
      }

      const { role, status } = userData;

      if(role.name === 'USER' && status === 'OK' && !request.nextUrl.pathname.includes('/init-shop')){
        const url = new URL('/init-shop', request.url)
        return NextResponse.redirect(url)
      }

      if(role.name === 'SHOP_ADMIN' && request.nextUrl.pathname.includes('/init-shop')){
        const url = new URL('/', request.url)
        return NextResponse.redirect(url)
      }

      if(status === 'VERIFY' && !request.nextUrl.pathname.includes('/verify')){
        const url = new URL('/verify', request.url)
        return NextResponse.redirect(url)
      }

      if(status !== 'VERIFY' && request.nextUrl.pathname.includes('/verify')){
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
      '/reset-password',
      '/verify',
      '/init-shop'
    ],
  }