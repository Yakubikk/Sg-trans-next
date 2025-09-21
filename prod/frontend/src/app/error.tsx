'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Что-то пошло не так
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            Произошла неожиданная ошибка
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              Извините за неудобства. Наша команда уже работает над исправлением проблемы.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Попробуйте обновить страницу или вернитесь позже.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-left">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg"
              onClick={reset}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Попробовать снова
            </Button>
            
            <Link href="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <Link 
                href="/dashboard" 
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Панель управления
              </Link>
              <span>•</span>
              <Link 
                href="/dashboard/directories" 
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Справочники
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
