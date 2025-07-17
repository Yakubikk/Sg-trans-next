import { AboutClient } from '@/components';

export default function About() {
  return (
    <AboutClient>
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">О системе SG Trans</h1>
            <p className="text-lg text-gray-600">Система управления транспортом с ролевым доступом</p>
          </div>

          {/* Информация о системе */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание системы</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Система SG Trans представляет собой современное веб-приложение для управления транспортными 
                процессами и паспортными данными вагонов РУП СГ-ТРАНС. Система разработана с использованием 
                передовых технологий и обеспечивает надежную работу с данными.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Основные возможности системы включают управление справочниками, ведение паспортных данных 
                вагонов, систему ролей и разрешений, а также удобный интерфейс для работы с данными.
              </p>
            </div>
          </div>

          {/* Функции системы */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Справочники</h3>
              <p className="text-gray-600 mb-4">Управление справочными данными системы</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Централизованное хранение справочной информации</li>
                <li>• Удобное редактирование и обновление данных</li>
                <li>• Контроль версий и изменений</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Паспортные данные вагонов</h3>
              <p className="text-gray-600 mb-4">Управление паспортными данными вагонов</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ведение полной информации о вагонах</li>
                <li>• Отслеживание технических характеристик</li>
                <li>• История обслуживания и ремонтов</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Система безопасности</h3>
              <p className="text-gray-600 mb-4">Защита данных и контроль доступа</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ролевая модель доступа</li>
                <li>• Аутентификация пользователей</li>
                <li>• Аудит действий пользователей</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Удобный интерфейс</h3>
              <p className="text-gray-600 mb-4">Современный и интуитивно понятный интерфейс</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Адаптивный дизайн для всех устройств</li>
                <li>• Быстрая навигация и поиск</li>
                <li>• Оптимизация для продуктивной работы</li>
              </ul>
            </div>
          </div>

          {/* Технические характеристики */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Технические характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Технологии:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Next.js 14 (React Framework)</li>
                  <li>• TypeScript для типизации</li>
                  <li>• Tailwind CSS для стилизации</li>
                  <li>• Zustand для управления состоянием</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Особенности:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Адаптивный дизайн</li>
                  <li>• Быстрая загрузка страниц</li>
                  <li>• Безопасность данных</li>
                  <li>• Масштабируемость</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Система ролей */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Система ролей и разрешений</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Роли:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Администратор</strong> - полный доступ к системе</li>
                  <li>• <strong>Пользователь</strong> - базовые функции работы</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Разрешения:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Управление пользователями</li>
                  <li>• Просмотр и редактирование данных</li>
                  <li>• Административные функции</li>
                  <li>• Работа со справочниками</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutClient>
  );
}
