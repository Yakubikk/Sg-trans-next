import { getSession } from "@/server/auth";
import { Guard } from "@/components/Access";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        <p className="text-muted-foreground">Добро пожаловать, {session?.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Информация о пользователе</h3>
          <p>
            <span className="font-medium">Роли:</span> {session?.roles.join(", ") || "нет"}
          </p>
          <p>
            <span className="font-medium">Права:</span> {session?.perms.join(", ") || "нет"}
          </p>
        </div>

        <div className="space-y-4">
          <Guard roles="Admin">
            <div className="border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Админ панель</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Этот блок видят только администраторы</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <Link href="/admin">Перейти в админку</Link>
              </Button>
            </div>
          </Guard>

          <Guard roles={["Admin", "User"]} requireAll={false}>
            <div className="border border-purple-200 bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">Любая роль</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">Видят все с ролью Admin ИЛИ User</p>
            </div>
          </Guard>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}
