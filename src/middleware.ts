import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { USER_USERNAME_COOKIE, USER_JOBTITLE_COOKIE } from './constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/register') {
        return NextResponse.next();
    }

    const usernameCookie = request.cookies.get(USER_USERNAME_COOKIE);
    const jobtitleCookie = request.cookies.get(USER_JOBTITLE_COOKIE);

    if (!usernameCookie?.value || !jobtitleCookie?.value) {
        return NextResponse.redirect(new URL('/register', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
