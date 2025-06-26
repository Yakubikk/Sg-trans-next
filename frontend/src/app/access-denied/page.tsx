import Link from 'next/link';
import { BackButton } from '@/components/BackButton';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-24 w-24 text-red-600">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6V9a4 4 0 00-8 0v2M7 13h10a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6a1 1 0 011-1z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-red-600 mt-4">403</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Доступ запрещён
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            У вас нет прав для просмотра этой страницы
          </p>
        </div>
        
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Недостаточно прав
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Для доступа к этому разделу необходимы дополнительные права.
                  Обратитесь к администратору системы.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Вернуться на главную
            </Link>
          </div>
          
          <div>
            <Link
              href="/login"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Войти под другой учётной записью
            </Link>
          </div>
          
          <div>
            <BackButton className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Назад
            </BackButton>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Если вы считаете, что у вас должен быть доступ к этой странице,{' '}
            <a
              href="mailto:admin@example.com"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              свяжитесь с администратором
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
