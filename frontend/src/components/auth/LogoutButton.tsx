'use client';

import { usePermissions, useLogout } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutButton() {
  const { user, isAuthenticated } = usePermissions();
  const logoutMutation = useLogout();
  const router = useRouter();

  useEffect(() => {
    console.log('LogoutButton mounted', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">
        Добро пожаловать, <strong>{user.firstName} {user.lastName}</strong>
      </span>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Выйти
      </button>
    </div>
  );
}
