import { LoginForm, LoginClient } from '@/components';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <LoginClient>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в систему SG Trans
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Система управления транспортом
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <LoginForm />
            
            <div className="text-center">
              <Link 
                href="/guest" 
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Узнать больше о системе
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoginClient>
  );
}
