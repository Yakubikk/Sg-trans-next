'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FileQuestion className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            404
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            Страница не найдена
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              Извините, запрашиваемая страница не существует или была перемещена.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Проверьте правильность введённого адреса или воспользуйтесь навигацией.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full" 
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
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
