import HomeClient from '@/components/HomeClient';
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { ProtectedComponent } from "@/components/ProtectedComponent";

export default function Home() {
  return (
    <HomeClient>
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Кнопка выхода */}
          <div className="flex justify-end mb-6">
            <LogoutButton />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SG Trans</h1>
            <p className="text-lg text-gray-600">Система управления транспортом</p>
          </div>

          {/* Административные ссылки для администраторов */}
          <ProtectedComponent requiredPermissions={["manage_system"]}>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-red-900 mb-4">Административные функции</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Панель администратора
                </Link>
                <Link
                  href="/users"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Управление пользователями
                </Link>
              </div>
            </div>
          </ProtectedComponent>

          {/* Основные функции для всех пользователей */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Справочники</h3>
              <p className="text-gray-600 mb-4">Управление справочными данными системы</p>
              <Link
                href="/references"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Перейти к справочникам
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Паспортные данные вагонов</h3>
              <p className="text-gray-600 mb-4">Управление паспортными данными вагонов</p>
              <Link
                href="/wagon-passports"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Перейти к паспортным данным
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Добро пожаловать</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Система управления транспортом СГ-ТРАНС. Выберите нужный раздел для работы.
            </p>
          </div>
        </div>
      </div>
    </HomeClient>
  );
}
