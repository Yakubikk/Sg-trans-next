import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка выхода */}
        <div className="flex justify-end mb-6">
          <LogoutButton />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Добро пожаловать в SG Trans</h1>
          <p className="text-lg text-gray-600">Система управления транспортом с ролевым доступом</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Вход в систему</h3>
            <p className="text-gray-600 mb-4">Авторизуйтесь для доступа к функциям системы</p>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Войти
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Управление пользователями</h3>
            <p className="text-gray-600 mb-4">Просмотр, создание и редактирование пользователей</p>
            <Link
              href="/users"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Пользователи
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Панель администратора</h3>
            <p className="text-gray-600 mb-4">Доступ только для администраторов и менеджеров</p>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Админ панель
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Демо страницы</h3>
            <p className="text-gray-600 mb-4">Протестируйте различные сценарии доступа</p>
            <div className="space-y-2">
              <Link
                href="/access-denied"
                className="block text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Нет доступа
              </Link>
              <Link
                href="/nonexistent-page"
                className="block text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                404 страница
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Информация о системе разрешений</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Роли:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Admin</strong> - полный доступ
                </li>
                <li>
                  • <strong>Manager</strong> - управление пользователями
                </li>
                <li>
                  • <strong>User</strong> - базовые функции
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Разрешения:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Управление пользователями</li>
                <li>• Просмотр данных</li>
                <li>• Административные функции</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Защита:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Автоматическое перенаправление</li>
                <li>• Проверка разрешений</li>
                <li>• Информативные страницы ошибок</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
