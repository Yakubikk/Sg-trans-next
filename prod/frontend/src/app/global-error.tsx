'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-red-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Критическая ошибка
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Приложение столкнулось с серьёзной проблемой
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Извините, произошла критическая ошибка, которая привела к сбою приложения.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Пожалуйста, перезагрузите страницу. Если проблема повторится, обратитесь в службу поддержки.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md text-left border border-red-200 dark:border-red-800">
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                    Детали ошибки (только в режиме разработки):
                  </h4>
                  <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  size="lg"
                  onClick={reset}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Перезагрузить приложение
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.location.href = '/'}
                >
                  Перейти на главную страницу
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Если проблема повторяется, пожалуйста, свяжитесь с технической поддержкой
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
