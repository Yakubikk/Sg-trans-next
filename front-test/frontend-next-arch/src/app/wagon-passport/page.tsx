import { getSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { prisma } from "@/server/db";
import WagonSearchDialog from "@/components/WagonSearchDialog";
import {
  ArrowLeft,
  Train,
  Plus,
  Calendar,
  MapPin,
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  Eye,
  Search,
} from "lucide-react";

export default async function WagonPassportPage() {
  const session = await getSession();

  // Получаем актуальные данные из базы
  const cisterns = await prisma.railwayCistern.findMany({
    include: {
      manufacturer: true,
      wagonType: true,
      wagonModel: true,
      affiliation: true,
    },
    take: 3, // Показываем последние 3 вагона
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Статистика из базы данных
  const totalCisterns = await prisma.railwayCistern.count();
  const inServiceCisterns = await prisma.railwayCistern.count({
    // Можно добавить условие для статуса "в эксплуатации"
  });

  const stats = [
    {
      title: "Всего вагонов",
      value: totalCisterns.toString(),
      icon: Train,
      color: "bg-blue-500",
    },
    {
      title: "В эксплуатации",
      value: inServiceCisterns.toString(),
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "На ремонте",
      value: "45", // Временно статичное значение
      icon: Settings,
      color: "bg-orange-500",
    },
    {
      title: "Требуют ТО",
      value: "12", // Временно статичное значение
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Главная
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Паспорт вагона</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Управление подвижным составом</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.email}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Паспорта вагонов-цистерн</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Управление техническими паспортами и документацией подвижного состава РУП СГ-ТРАНС
              </p>
            </div>
            <div className="flex gap-3">
              <WagonSearchDialog>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Поиск вагона
                </Button>
              </WagonSearchDialog>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить вагон
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.title} className="border-0 bg-white/80 dark:bg-gray-800/80">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 mb-6">
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Часто используемые операции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <WagonSearchDialog>
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Найти вагон по номеру
                  </Button>
                </WagonSearchDialog>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Создать паспорт
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Планировать ТО
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Журнал ремонтов
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80">
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>Важные события</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-200">
                      12 вагонов требуют планового ТО
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-300">До 31.08.2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Settings className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-200">45 вагонов на ремонте</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">Средний срок: 12 дней</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-200">15 вагонов прошли ТО</p>
                    <p className="text-xs text-green-700 dark:text-green-300">За последнюю неделю</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Wagons */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80">
              <CardHeader>
                <CardTitle>Последние изменения</CardTitle>
                <CardDescription>Недавно обновленные паспорта вагонов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cisterns.map((cistern) => (
                    <div key={cistern.id}>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <Train className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">№ {cistern.number}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{cistern.wagonType.name}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white" variant="secondary">
                            В эксплуатации
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">{cistern.affiliation.value}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Изг.: {new Date(cistern.buildDate).toLocaleDateString("ru-RU")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">{cistern.manufacturer.name}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/wagon-passport/${cistern.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Открыть паспорт
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" className="w-full">
                      Показать все вагоны
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
