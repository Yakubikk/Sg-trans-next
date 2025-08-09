import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Truck, BookOpen, BarChart3, Users, Settings, ArrowRight, Train, Database } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/guest");

  const mainModules = [
    {
      title: "Справочники",
      description: "Управление основными справочниками системы",
      icon: Database,
      href: "/directories",
      color: "bg-blue-500",
      badge: "Система",
    },
    {
      title: "Паспорт вагона",
      description: "Просмотр и редактирование паспортов вагонов-цистерн",
      icon: Train,
      href: "/wagon-passport",
      color: "bg-green-500",
      badge: "Транспорт",
    },
    {
      title: "Отчёты",
      description: "Аналитика и отчётность по перевозкам",
      icon: BarChart3,
      href: "/reports",
      color: "bg-purple-500",
      badge: "Аналитика",
    },
    {
      title: "Управление персоналом",
      description: "Сотрудники, роли и разрешения",
      icon: Users,
      href: "/personnel",
      color: "bg-orange-500",
      badge: "HR",
    },
  ];

  const quickActions = [
    {
      title: "Личный кабинет",
      description: "Ваши данные и настройки",
      href: "/dashboard",
      icon: Settings,
    },
    {
      title: "Документация",
      description: "Руководство пользователя",
      href: "/docs",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">СГ-ТРАНС</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Система автоматизации</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{session.email}</p>
                <div className="flex gap-1 justify-end">
                  {session.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Добро пожаловать в систему автоматизации
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Управляйте транспортными процессами, ведите учёт вагонов и анализируйте эффективность работы РУП СГ-ТРАНС
          </p>
        </div>

        {/* Main Modules Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Основные модули</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mainModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card
                  key={module.href}
                  className="group hover:shadow-lg transition-all duration-200 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {module.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full group-hover:bg-blue-600 transition-colors hover:bg-blue-700">
                      <Link href={module.href}>
                        Открыть
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Быстрые действия</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card
                  key={action.href}
                  className="group hover:shadow-md transition-shadow border-0 bg-white/60 dark:bg-gray-800/60"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={action.href}>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">800+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Вагонов-цистерн</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Стран-партнеров</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">30K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Тонн в месяц</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">55+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Лет опыта</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
