'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { login, isLoading } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      // После успешного входа перенаправляем на главную
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    }
  };

  // Быстрый вход для демонстрации
  const quickLogin = async (role: 'admin' | 'manager' | 'user') => {
    const credentials = {
      admin: { email: 'admin@example.com', password: 'password' },
      manager: { email: 'manager@example.com', password: 'password' },
      user: { email: 'user@example.com', password: 'password' }
    };

    try {
      await login(credentials[role]);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в систему
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введите ваши данные для входа
          </p>
        </div>

        {/* Кнопки быстрого входа для разработки */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-3">
            Быстрый вход для разработки:
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('admin')}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm bg-red-100 hover:bg-red-200 rounded border border-red-300 disabled:opacity-50"
            >
              👑 Админ (admin@example.com)
            </button>
            <button
              onClick={() => quickLogin('manager')}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm bg-green-100 hover:bg-green-200 rounded border border-green-300 disabled:opacity-50"
            >
              👨‍💼 Менеджер (manager@example.com)
            </button>
            <button
              onClick={() => quickLogin('user')}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 text-sm bg-yellow-100 hover:bg-yellow-200 rounded border border-yellow-300 disabled:opacity-50"
            >
              👤 Пользователь (user@example.com)
            </button>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email адрес"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-red-800 text-sm">{error}</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Запомнить меня
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Забыли пароль?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
