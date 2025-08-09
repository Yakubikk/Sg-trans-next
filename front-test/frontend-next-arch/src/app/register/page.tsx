import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldX, ArrowLeft, Users } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Регистрация отключена
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Самостоятельная регистрация недоступна
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Как получить доступ?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Для создания учётной записи в системе автоматизации РУП СГ-ТРАНС 
                обратитесь к администратору системы.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Контакты для получения доступа:
              </h3>
              <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <p>📧 Email: admin@sgtrans.by</p>
                <p>📞 Телефон: +375 (214) 75-45-35</p>
                <p>🏢 Адрес: г. Новополоцк, ул. Промышленная, 13</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <Button asChild className="w-full">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к входу
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 РУП СГ-ТРАНС. Система автоматизации процессов.</p>
        </div>
      </div>
    </div>
  );
}
