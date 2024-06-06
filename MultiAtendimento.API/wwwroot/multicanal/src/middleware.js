import { NextResponse } from 'next/server';

const rotasPrivadas = ['/chats', '/admin'];

export function middleware(request) {
  const token = request.localStorage.getItem('tokenDeAcesso');

  if (rotasPrivadas.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: rotasPrivadas
};
