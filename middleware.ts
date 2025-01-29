import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const isPublicRoute = ['/', '/signup'].includes(nextUrl.pathname);

  // Redirect authenticated users from auth pages to dashboard
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect unauthenticated users to signin
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL('/', req.url);
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/', '/signup']
};
