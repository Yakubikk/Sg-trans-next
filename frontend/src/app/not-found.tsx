import Link from 'next/link';
import { BackButton } from '@/components';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Страница не найдена
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            К сожалению, запрашиваемая страница не существует
          </p>
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
            <BackButton className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Назад
            </BackButton>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Если вы считаете, что это ошибка, пожалуйста{' '}
            <a
              href="mailto:support@example.com"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              свяжитесь с поддержкой
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
