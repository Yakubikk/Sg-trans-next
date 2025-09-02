'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Train, 
  MapPin, 
  History, 
  FileText, 
  Wrench,
  User,
  Factory,
  Gauge,
  Weight,
  Ruler,
  MapIcon,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useCistern } from '@/hooks/useCisterns';
import { PartEquipmentList } from '@/components/part-equipment-list';

export default function CisternPassportPage() {
  const params = useParams();
  const cisternId = params.id as string;
  const [activeTab, setActiveTab] = useState('general');

  const { data: cistern, isLoading, error } = useCistern(cisternId);

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/cisterns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Ошибка загрузки данных: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/cisterns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!cistern) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/cisterns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-600">
              Цистерна не найдена
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/cisterns">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Train className="h-8 w-8" />
              Паспорт цистерны {cistern.number}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {cistern.manufacturer?.name} • {cistern.type?.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button>
            <Link href={`/cisterns/${cistern.id}/edit`} className="flex items-center">
              <Wrench className="h-4 w-4 mr-2" />
              Редактировать
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Train className="h-4 w-4" />
            Основная информация
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Местоположения
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Журнал изменений
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Лист комплектации
          </TabsTrigger>
          <TabsTrigger value="repairs" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            История ремонтов
          </TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  Основные характеристики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Номер</div>
                    <div className="text-lg font-semibold">{cistern.number}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Серийный номер</div>
                    <div className="text-lg">{cistern.serialNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Дата постройки</div>
                    <div className="text-lg">{new Date(cistern.buildDate).toLocaleDateString('ru-RU')}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Дата ввода в эксплуатацию</div>
                    <div className="text-lg">
                      {cistern.commissioningDate 
                        ? new Date(cistern.commissioningDate).toLocaleDateString('ru-RU')
                        : 'Не указана'
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Технические характеристики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Weight className="h-4 w-4" />
                      Тара, т
                    </div>
                    <div className="text-lg">{cistern.tareWeight}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Грузоподъемность, т</div>
                    <div className="text-lg">{cistern.loadCapacity}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      Длина, мм
                    </div>
                    <div className="text-lg">{cistern.length}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Количество осей</div>
                    <div className="text-lg">{cistern.axleCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Объем, м³</div>
                    <div className="text-lg">{cistern.volume}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Объем налива, м³</div>
                    <div className="text-lg">{cistern.fillingVolume || 'Не указан'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturer and Model */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  Производитель и модель
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Производитель</div>
                  <div className="text-lg">{cistern.manufacturer?.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Тип вагона</div>
                  <div className="text-lg">{cistern.type?.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Модель</div>
                  <div className="text-lg">{cistern.model?.name || 'Не указана'}</div>
                </div>
              </CardContent>
            </Card>

            {/* Owner and Registration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Собственник и регистрация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Собственник</div>
                  <div className="text-lg">{cistern.owner?.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Принадлежность</div>
                  <div className="text-lg">{cistern.affiliation?.value}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Регистрационный номер</div>
                    <div className="text-lg">{cistern.registrationNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Дата регистрации</div>
                    <div className="text-lg">{new Date(cistern.registrationDate).toLocaleDateString('ru-RU')}</div>
                  </div>
                </div>
                {cistern.registrar && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Регистратор</div>
                    <div className="text-lg">{cistern.registrar.name}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TriangleAlert className="h-5 w-5" />
                  Информация о безопасности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Класс опасности</div>
                    <div className="text-lg">
                      <Badge variant="outline">{cistern.dangerClass}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Вещество</div>
                    <div className="text-lg">{cistern.substance}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Рабочее давление, МПа</div>
                    <div className="text-lg">{cistern.pressure}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Испытательное давление, МПа</div>
                    <div className="text-lg">{cistern.testPressure}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {cistern.notes && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Дополнительная информация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{cistern.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Пробеги и местоположения
                </CardTitle>
                <CardDescription>
                  История пробегов цистерны с датами получения данных
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Функция в разработке
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  Интерактивная карта
                </CardTitle>
                <CardDescription>
                  Отображение текущего местоположения цистерны на карте
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Функция в разработке
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Журнал изменений
              </CardTitle>
              <CardDescription>
                История изменений данных о цистерне
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Функция в разработке
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components">
          <PartEquipmentList cisternId={cisternId} />
        </TabsContent>

        {/* Repairs Tab */}
        <TabsContent value="repairs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                История ремонтов
              </CardTitle>
              <CardDescription>
                Информация о проведенных ремонтах и техническом обслуживании
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Срок службы, лет</div>
                    <div className="text-lg">{cistern.serviceLifeYears}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Период капитального ремонта</div>
                    <div className="text-lg">
                      {cistern.periodMajorRepair 
                        ? new Date(cistern.periodMajorRepair).toLocaleDateString('ru-RU')
                        : 'Не назначен'
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Период периодического испытания</div>
                    <div className="text-lg">
                      {cistern.periodPeriodicTest 
                        ? new Date(cistern.periodPeriodicTest).toLocaleDateString('ru-RU')
                        : 'Не назначен'
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Период промежуточного испытания</div>
                    <div className="text-lg">
                      {cistern.periodIntermediateTest 
                        ? new Date(cistern.periodIntermediateTest).toLocaleDateString('ru-RU')
                        : 'Не назначен'
                      }
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-center py-8 text-gray-500">
                    Детальная история ремонтов в разработке
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
