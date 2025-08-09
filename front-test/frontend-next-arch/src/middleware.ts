import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface CustomJWTPayload {
  userId?: string;
  email?: string;
  roles?: string[];
  perms?: string[];
  iat?: number;
  exp?: number;
}

function getAccessSecret() {
  const s = process.env.JWT_ACCESS_SECRET;
  if (!s) throw new Error("JWT_ACCESS_SECRET not set");
  return new TextEncoder().encode(s);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/dashboard", "/admin", "/"];
  const publicPaths = ["/guest", "/login", "/register"];
  const publicApiPaths = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];
  
  // Разрешаем доступ к публичным путям и публичным API эндпоинтам
  if (publicPaths.some((p) => pathname.startsWith(p)) || 
      publicApiPaths.some((p) => pathname === p)) {
    return NextResponse.next();
  }
  
  // Для API роутов (кроме публичных) требуем авторизацию
  if (pathname.startsWith("/api/")) {
    const access = req.cookies.get("access_token")?.value;
    
    if (!access) {
      return NextResponse.json(
        { error: "Доступ запрещен. Требуется авторизация." },
        { status: 401 }
      );
    }
    
    try {
      await jwtVerify(access, getAccessSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { error: "Недействительный токен авторизации." },
        { status: 401 }
      );
    }
  }
  
  // Для корневого пути и защищенных путей проверяем авторизацию
  if (pathname === "/" || protectedPaths.some((p) => pathname.startsWith(p))) {
    const access = req.cookies.get("access_token")?.value;
    const refresh = req.cookies.get("refresh_token")?.value;
    
    // Если нет access токена, но есть refresh токен - редиректим на страницу с обновлением
    if (!access && refresh) {
      return NextResponse.redirect(new URL("/guest?refresh=true", req.url));
    }
    
    if (!access) {
      return NextResponse.redirect(new URL("/guest", req.url));
    }
    
    try {
      const { payload } = await jwtVerify(access, getAccessSecret());
      const { roles } = payload as unknown as CustomJWTPayload;
      
      // Для админ страниц проверяем роль
      if (pathname.startsWith("/admin") && !roles?.includes("Admin")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      
      return NextResponse.next();
    } catch {
      // Если access токен недействителен и есть refresh токен - редиректим на страницу с обновлением
      if (refresh) {
        return NextResponse.redirect(new URL("/guest?refresh=true", req.url));
      }
      return NextResponse.redirect(new URL("/guest", req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
