import { getSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { 
  ArrowLeft, 
  Train, 
  MapPin,
  Settings,
  FileText,
  History,
  Package,
  Wrench,
  Info,
  CheckCircle,
  Clock,
  Building,
  Factory,
  Gauge
} from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function WagonPassportDetailPage({ params }: PageProps) {
  const session = await getSession();
  const { id } = await params;

  const cistern = await prisma.railwayCistern.findUnique({
    where: { id },
    include: {
      manufacturer: true,
      wagonType: true,
      wagonModel: true,
      registrar: true,
      affiliation: true,
    },
  });

  if (!cistern) {
    notFound();
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Не указано";
    return new Date(date).toLocaleDateString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/wagon-passport">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  К списку вагонов
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Паспорт вагона № {cistern.number}
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {cistern.wagonType.name}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session?.email}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Цистерна № {cistern.number}
              </h1>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500 text-white">В эксплуатации</Badge>
                <span className="text-gray-600 dark:text-gray-400">
                  Регистрационный номер: {cistern.registrationNumber}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Печать паспорта
              </Button>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Редактировать
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">
              <Info className="w-4 h-4 mr-2" />
              Общие данные
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="w-4 h-4 mr-2" />
              Локализация
            </TabsTrigger>
            <TabsTrigger value="parts">
              <Package className="w-4 h-4 mr-2" />
              Комплектация
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              Журнал изменений
            </TabsTrigger>
            <TabsTrigger value="repairs">
              <Wrench className="w-4 h-4 mr-2" />
              Ремонты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Основная информация */}
              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                  <CardDescription>
                    Технические характеристики и паспортные данные
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Номер вагона
                      </label>
                      <p className="text-lg font-semibold">{cistern.number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Серийный номер
                      </label>
                      <p className="text-lg font-semibold">{cistern.serialNumber}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Тип вагона
                      </label>
                      <p>{cistern.wagonType.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Модель
                      </label>
                      <p>{cistern.wagonModel?.name || "Не указано"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Дата постройки
                      </label>
                      <p>{formatDate(cistern.buildDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Дата ввода в эксплуатацию
                      </label>
                      <p>{formatDate(cistern.commissioningDate)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Количество осей
                      </label>
                      <p>{cistern.axleCount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Длина, мм
                      </label>
                      <p>{cistern.length.toString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Технические характеристики */}
              <Card>
                <CardHeader>
                  <CardTitle>Технические характеристики</CardTitle>
                  <CardDescription>
                    Весовые и объемные параметры
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Масса тары, кг
                      </label>
                      <p className="text-lg font-semibold">{cistern.tareWeight.toString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Грузоподъемность, кг
                      </label>
                      <p className="text-lg font-semibold">{cistern.loadCapacity.toString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Объем котла, м³
                      </label>
                      <p>{cistern.volume.toString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Объем налива, м³
                      </label>
                      <p>{cistern.fillingVolume?.toString() || "Не указано"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Рабочее давление, МПа
                      </label>
                      <p>{cistern.pressure.toString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Испытательное давление, МПа
                      </label>
                      <p>{cistern.testPressure.toString()}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Перевозимое вещество
                    </label>
                    <p>{cistern.substance}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Класс опасности
                    </label>
                    <Badge variant="outline">{cistern.dangerClass}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Изготовитель и принадлежность */}
              <Card>
                <CardHeader>
                  <CardTitle>Изготовитель и принадлежность</CardTitle>
                  <CardDescription>
                    Информация о производителе и собственности
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Factory className="w-5 h-5 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Завод-изготовитель
                      </label>
                      <p className="font-semibold">{cistern.manufacturer.name}</p>
                      <p className="text-sm text-gray-600">{cistern.manufacturer.country}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Принадлежность
                      </label>
                      <p className="font-semibold">{cistern.affiliation.value}</p>
                    </div>
                  </div>

                  {cistern.registrar && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Регистратор
                        </label>
                        <p>{cistern.registrar.name}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Сроки обслуживания */}
              <Card>
                <CardHeader>
                  <CardTitle>Плановое обслуживание</CardTitle>
                  <CardDescription>
                    Сроки технического обслуживания и ремонтов
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-200">
                            Капитальный ремонт
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            {formatDate(cistern.periodMajorRepair)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-200">
                            Периодические испытания
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {formatDate(cistern.periodPeriodicTest)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Gauge className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="font-medium text-orange-900 dark:text-orange-200">
                            Промежуточные испытания
                          </p>
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            {formatDate(cistern.periodIntermediateTest)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Wrench className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="font-medium text-purple-900 dark:text-purple-200">
                            Деповской ремонт
                          </p>
                          <p className="text-sm text-purple-700 dark:text-purple-300">
                            {formatDate(cistern.periodDepotRepair)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Срок службы
                    </label>
                    <p>{cistern.serviceLifeYears} лет</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Текущее местоположение</CardTitle>
                  <CardDescription>
                    Актуальная информация о нахождении вагона
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-200">
                        {cistern.affiliation.value}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Принадлежность вагона
                      </p>
                    </div>
                  </div>
                  
                  {cistern.pripiska && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Приписка
                      </label>
                      <p>{cistern.pripiska}</p>
                    </div>
                  )}
                  
                  {cistern.rent && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Аренда
                      </label>
                      <p>{cistern.rent}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История пробегов</CardTitle>
                  <CardDescription>
                    Данные о движении и пробегах вагона
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      История пробегов пока недоступна
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Данные будут добавлены в следующих версиях системы
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parts">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основные узлы</CardTitle>
                  <CardDescription>
                    Ключевые компоненты вагона-цистерны
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Котел</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Серийный номер: {cistern.serialNumber}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Установлен</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Тележки</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Количество осей: {cistern.axleCount}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Установлены</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">Арматура</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Рабочее давление: {cistern.pressure.toString()} МПа
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Установлена</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Дополнительное оборудование</CardTitle>
                  <CardDescription>
                    Специализированное оборудование и системы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Детальная комплектация пока недоступна
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Информация будет добавлена в следующих версиях
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Журнал изменений</CardTitle>
                <CardDescription>
                  История всех изменений в паспорте вагона
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mt-1">
                      <History className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Создание паспорта</p>
                        <span className="text-sm text-gray-500">
                          {formatDate(cistern.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Паспорт вагона был создан в системе
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mt-1">
                      <History className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Последнее обновление</p>
                        <span className="text-sm text-gray-500">
                          {formatDate(cistern.updatedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Данные паспорта были актуализированы
                      </p>
                    </div>
                  </div>

                  {cistern.reRegistrationDate && (
                    <div className="flex items-start space-x-3 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mt-1">
                        <History className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Перерегистрация</p>
                          <span className="text-sm text-gray-500">
                            {formatDate(cistern.reRegistrationDate)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Проведена перерегистрация вагона
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Детальная история изменений будет доступна в следующих версиях
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repairs">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Плановые ремонты</CardTitle>
                  <CardDescription>
                    График технического обслуживания
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cistern.periodMajorRepair && (
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Wrench className="w-4 h-4 text-red-500" />
                          <div>
                            <p className="font-medium text-red-900 dark:text-red-200">
                              Капитальный ремонт
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              Плановая дата: {formatDate(cistern.periodMajorRepair)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-red-200 text-red-700">
                          Запланирован
                        </Badge>
                      </div>
                    )}

                    {cistern.periodDepotRepair && (
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Settings className="w-4 h-4 text-orange-500" />
                          <div>
                            <p className="font-medium text-orange-900 dark:text-orange-200">
                              Деповской ремонт
                            </p>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                              Плановая дата: {formatDate(cistern.periodDepotRepair)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-orange-200 text-orange-700">
                          Запланирован
                        </Badge>
                      </div>
                    )}

                    {cistern.periodPeriodicTest && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="font-medium text-blue-900 dark:text-blue-200">
                              Периодические испытания
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Плановая дата: {formatDate(cistern.periodPeriodicTest)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          Запланированы
                        </Badge>
                      </div>
                    )}

                    {cistern.periodIntermediateTest && (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Gauge className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-200">
                              Промежуточные испытания
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Плановая дата: {formatDate(cistern.periodIntermediateTest)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          Запланированы
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История ремонтов</CardTitle>
                  <CardDescription>
                    Выполненные работы по техническому обслуживанию
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      История ремонтов пока недоступна
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Данные будут добавлены в следующих версиях системы
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
