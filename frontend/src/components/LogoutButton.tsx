'use client';

import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout, currentUser, isAuthenticated } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">
        Добро пожаловать, <strong>{currentUser.firstName} {currentUser.lastName}</strong>
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
