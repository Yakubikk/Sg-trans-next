// Утилиты для работы с cookies на клиенте и сервере
export const cookieUtils = {
  // Установка cookie
  set: (name: string, value: string, days: number = 7) => {
    if (typeof window !== 'undefined') {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    }
  },

  // Получение cookie
  get: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  // Удаление cookie
  remove: (name: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
    }
  },

  // Проверка наличия cookie
  has: (name: string): boolean => {
    return cookieUtils.get(name) !== null;
  }
};

// Константы для имен cookies
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
} as const;
