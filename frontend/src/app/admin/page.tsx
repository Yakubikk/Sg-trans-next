import { withRoleProtection } from "@/hoc/hoc.pages";
import { Permission, Role } from "@/types/permissions";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Управление пользователями</h3>
                <p className="text-blue-700">Просмотр, создание и редактирование учётных записей пользователей</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-900 mb-2">Аналитика</h3>
                <p className="text-green-700">Просмотр статистики и отчётов по системе</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-purple-900 mb-2">Системные настройки</h3>
                <p className="text-purple-700">Настройка параметров системы и управление конфигурацией</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Защищённая область</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        {
                          'Эта страница доступна только пользователям с ролью Администратор и разрешением "view_dashboard"'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleProtection(AdminDashboard, {
  requiredPermissions: [Permission.VIEW_DASHBOARD],
  requiredRoles: [Role.ADMIN],
});
