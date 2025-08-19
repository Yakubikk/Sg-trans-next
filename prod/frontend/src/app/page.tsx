'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cookieUtils, COOKIE_NAMES } from '@/lib/cookies';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Middleware должен обрабатывать редирект, но добавляем fallback
    const hasToken = cookieUtils.has(COOKIE_NAMES.ACCESS_TOKEN);
    if (hasToken) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
