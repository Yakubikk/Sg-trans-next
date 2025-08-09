import { Button } from "@/components/ui/button";
import { Guard } from "@/components/Access";
import Link from "next/link";

function AdminOnlyWidget() {
  return (
    <div className="border border-purple-200 bg-purple-50 dark:bg-purple-950/20 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
        Административная панель
      </h3>
      <p className="text-purple-600 dark:text-purple-300 mb-4">
        Управление системой доступно только администраторам
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Управление пользователями</Button>
        <Button size="sm" variant="outline">Настройки системы</Button>
      </div>
    </div>
  );
}

function PermissionWidget({ perm }: { perm: string }) {
  const permLabels: Record<string, string> = {
    "manage.users": "Управление пользователями",
    "view.reports": "Просмотр отчётов",
  };
  
  return (
    <div className="border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
      <h4 className="font-semibold text-amber-800 dark:text-amber-200">
        {permLabels[perm] || perm}
      </h4>
      <p className="text-sm text-amber-600 dark:text-amber-300">
        Компонент для права: {perm}
      </p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Администрирование</h1>
        <p className="text-muted-foreground">Панель управления системой</p>
      </div>
      
      <div className="grid gap-6">
        {/* Компонент только для админов */}
        <Guard roles="Admin" fallback={
          <div className="border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-300">Нет доступа к административной панели</p>
          </div>
        }>
          <AdminOnlyWidget />
        </Guard>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Компонент для конкретного разрешения */}
          <Guard perms="manage.users">
            <PermissionWidget perm="manage.users" />
          </Guard>
          
          <Guard perms="view.reports">
            <PermissionWidget perm="view.reports" />
          </Guard>
          
          {/* Компонент для нескольких разрешений (любое из) */}
          <Guard perms={["manage.users", "view.reports"]} requireAll={false}>
            <div className="border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Управление или отчёты
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Видно если есть любое из разрешений: manage.users ИЛИ view.reports
              </p>
            </div>
          </Guard>
          
          {/* Компонент для всех разрешений одновременно */}
          <Guard perms={["manage.users", "view.reports"]} requireAll={true}>
            <div className="border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Полный доступ
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                Видно только если есть ВСЕ разрешения: manage.users И view.reports
              </p>
            </div>
          </Guard>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <Button variant="outline" asChild>
          <Link href="/dashboard">← Вернуться в личный кабинет</Link>
        </Button>
      </div>
    </div>
  );
}
