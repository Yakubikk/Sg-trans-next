import { NextRequest } from 'next/server';

// Утилиты для работы с cookies в middleware
export const serverCookieUtils = {
  get: (request: NextRequest, name: string): string | undefined => {
    return request.cookies.get(name)?.value;
  },

  has: (request: NextRequest, name: string): boolean => {
    return request.cookies.has(name);
  }
};

// Константы для имен cookies (дублируем для server-side)
export const SERVER_COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
} as const;
