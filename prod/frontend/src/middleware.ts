import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serverCookieUtils, SERVER_COOKIE_NAMES } from '@/lib/server-cookies';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Защищенные маршруты
  const protectedPaths = ['/dashboard', '/admin', '/settings', '/directories'];

  // Проверяем, является ли путь защищенным
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // Получаем токен из cookies
  const hasToken = serverCookieUtils.has(request, SERVER_COOKIE_NAMES.ACCESS_TOKEN);

  // Если пользователь пытается зайти на защищенную страницу без токена
  if (isProtectedPath && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если пользователь с токеном пытается зайти на страницу входа
  if (pathname === '/login' && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Редирект с главной страницы на dashboard если пользователь аутентифицирован
  if (pathname === '/' && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Редирект с главной страницы на login если пользователь не аутентифицирован
  if (pathname === '/' && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
