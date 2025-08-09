import { getDirectoriesStats, getRecentDirectoryChanges } from "@/lib/directories";
import { formatDate, getPluralForm } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Plus,
  Factory,
  Shield,
  Wrench,
  Hash,
  Truck,
  MapPin, 
  Building, 
  Users, 
  Settings,
  FileText,
} from "lucide-react";

export default async function DirectoriesPage() {
  // Получаем реальные данные из базы данных
  const [directoriesStats, recentChanges] = await Promise.all([
    getDirectoriesStats(),
    getRecentDirectoryChanges()
  ]);

  const directories = [
    {
      title: "Цистерны",
      description: "Железнодорожные цистерны",
      icon: Truck,
      count: directoriesStats.find(s => s.title === "Цистерны")?.count.toString() || "0",
      href: "/directories/railway-cisterns",
      color: "bg-orange-500",
    },
    {
      title: "Принадлежности",
      description: "Справочник принадлежностей вагонов",
      icon: Shield,
      count: directoriesStats.find(s => s.title === "Принадлежности")?.count.toString() || "0",
      href: "/directories/affiliations",
      color: "bg-blue-500",
    },
    {
      title: "Депо",
      description: "Железнодорожные депо и мастерские",
      icon: Factory,
      count: directoriesStats.find(s => s.title === "Депо")?.count.toString() || "0",
      href: "/directories/depots",
      color: "bg-green-500",
    },
    {
      title: "Местоположения",
      description: "Справочник местоположений",
      icon: MapPin,
      count: directoriesStats.find(s => s.title === "Местоположения")?.count.toString() || "0",
      href: "/directories/locations",
      color: "bg-purple-500",
    },
    {
      title: "Производители",
      description: "Производители вагонов и оборудования",
      icon: Building,
      count: directoriesStats.find(s => s.title === "Производители")?.count.toString() || "0",
      href: "/directories/manufacturers",
      color: "bg-orange-500",
    },
    {
      title: "Владельцы",
      description: "Владельцы подвижного состава",
      icon: Users,
      count: directoriesStats.find(s => s.title === "Владельцы")?.count.toString() || "0",
      href: "/directories/owners",
      color: "bg-teal-500",
    },
    {
      title: "Регистраторы",
      description: "Организации-регистраторы",
      icon: FileText,
      count: directoriesStats.find(s => s.title === "Регистраторы")?.count.toString() || "0",
      href: "/directories/registrars",
      color: "bg-indigo-500",
    },
    {
      title: "Типы ремонтов",
      description: "Классификация видов ремонта",
      icon: Wrench,
      count: directoriesStats.find(s => s.title === "Типы ремонтов")?.count.toString() || "0",
      href: "/directories/repair-types",
      color: "bg-red-500",
    },
    {
      title: "Номера клейм",
      description: "Справочник номеров клейм",
      icon: Hash,
      count: directoriesStats.find(s => s.title === "Номера клейм")?.count.toString() || "0",
      href: "/directories/stamp-numbers",
      color: "bg-yellow-500",
    },
    {
      title: "Модели вагонов",
      description: "Модели подвижного состава",
      icon: Truck,
      count: directoriesStats.find(s => s.title === "Модели вагонов")?.count.toString() || "0",
      href: "/directories/wagon-models",
      color: "bg-pink-500",
    },
    {
      title: "Типы вагонов",
      description: "Классификация подвижного состава",
      icon: Settings,
      count: directoriesStats.find(s => s.title === "Типы вагонов")?.count.toString() || "0",
      href: "/directories/wagon-types",
      color: "bg-cyan-500",
    }
  ];

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Справочники системы
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Управление основными справочными данными для корректной работы системы автоматизации
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Добавить запись
          </Button>
        </div>
      </div>

      {/* Directories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {directories.map((directory) => {
          const IconComponent = directory.icon;
          return (
            <Card key={directory.href} className="group hover:shadow-lg transition-all duration-200 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 ${directory.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {directory.count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {getPluralForm(parseInt(directory.count), "запись", "записи", "записей")}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {directory.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {directory.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={directory.href}>
                      Открыть
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 bg-white/60 dark:bg-gray-800/60">
        <CardHeader>
          <CardTitle>Последние изменения</CardTitle>
          <CardDescription>
            Недавние обновления в справочниках
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentChanges.length > 0 ? (
              recentChanges.slice(0, 3).map((change, index) => (
                <div key={`${change.type}-${change.id}`} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Обновлен {change.type.toLowerCase()}: &ldquo;{change.name}&rdquo;
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(change.updatedAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Пока нет записей в справочниках
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Начните добавлять данные для отслеживания изменений
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
