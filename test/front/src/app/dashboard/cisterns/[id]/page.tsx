'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Gauge, Package, Ruler, Scale, Settings, Truck, User, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { railwayCisternsServiceExtended } from '@/lib/api/services';
import { InstalledPart } from '@/types/models';

export default function CisternPassportPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: passport, isLoading, error } = useQuery({
    queryKey: ['cistern-passport', id],
    queryFn: () => railwayCisternsServiceExtended.getPassport(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Цистерна не найдена</h2>
          <p className="text-gray-600 mt-2">Проверьте правильность идентификатора цистерны</p>
          <Link href="/dashboard/cisterns">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return format(new Date(dateString), 'dd.MM.yyyy', { locale: ru });
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('ru-RU');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard/cisterns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                К списку цистерн
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Паспорт цистерны № {passport.number}
          </h1>
          <p className="text-gray-600 mt-1">
            Серийный номер: {passport.serialNumber} • Рег. номер: {passport.registrationNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Экспорт в PDF
          </Button>
          <Button variant="outline">
            Редактировать
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Производство</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Производитель:</span>
                      <span className="font-medium">{passport.manufacturer || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Дата постройки:</span>
                      <span className="font-medium">{formatDate(passport.buildDate)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Ввод в эксплуатацию:</span>
                      <span className="font-medium">{formatDate(passport.commissioningDate)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Тип и модель</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Тип:</span>
                      <span className="font-medium">{passport.type || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Модель:</span>
                      <span className="font-medium">{passport.model || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технические характеристики */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Технические характеристики
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Весовые характеристики
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Тара:</span>
                      <span className="font-medium">{formatNumber(passport.tareWeight)} кг</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Тара 2:</span>
                      <span className="font-medium">{formatNumber(passport.tareWeight2)} кг</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Тара 3:</span>
                      <span className="font-medium">{formatNumber(passport.tareWeight3)} кг</span>
                    </div>
                    {passport.initialTareWeight && (
                      <div className="flex gap-2">
                        <span className="text-gray-600">Первоначальная тара:</span>
                        <span className="font-medium">{formatNumber(passport.initialTareWeight)} кг</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <span className="text-gray-600">Грузоподъемность:</span>
                      <span className="font-medium">{formatNumber(passport.loadCapacity)} кг</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Размеры
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Длина:</span>
                      <span className="font-medium">{formatNumber(passport.length)} мм</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Количество осей:</span>
                      <span className="font-medium">{passport.axleCount}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Объем:</span>
                      <span className="font-medium">{formatNumber(passport.volume)} м³</span>
                    </div>
                    {passport.fillingVolume && (
                      <div className="flex gap-2">
                        <span className="text-gray-600">Объем наполнения:</span>
                        <span className="font-medium">{formatNumber(passport.fillingVolume)} м³</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Давление
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Рабочее давление:</span>
                      <span className="font-medium">{formatNumber(passport.pressure)} МПа</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Испытательное давление:</span>
                      <span className="font-medium">{formatNumber(passport.testPressure)} МПа</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Опасные грузы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Опасные грузы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-600">Класс опасности:</span>
                  <Badge variant="outline" className="font-medium">
                    {passport.dangerClass}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Вещество:</span>
                  <span className="font-medium">{passport.substance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Установленные части */}
          {passport.installedParts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Установленные части</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {passport.installedParts.map((part: InstalledPart) => (
                    <div key={part.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium">{part.partTypeName}</h5>
                          <p className="text-sm text-gray-600">
                            Серийный номер: {part.serialNumber || '—'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Статус: <Badge variant="outline">{part.partStatusName}</Badge>
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-600">
                            Установлено: {format(new Date(part.installedAt), 'dd.MM.yyyy HH:mm', { locale: ru })}
                          </p>
                          {part.installedBy && (
                            <p className="text-gray-600">Установил: {part.installedBy}</p>
                          )}
                          {part.toLocationName && (
                            <p className="text-gray-600">Место: {part.toLocationName}</p>
                          )}
                        </div>
                      </div>
                      {part.notes && (
                        <p className="text-sm text-gray-600 mt-2 pt-2 border-t">
                          Примечания: {part.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Регистрация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Регистрация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">Дата регистрации:</span>
                  <span className="font-medium">{formatDate(passport.registrationDate)}</span>
                </div>
                {passport.reRegistrationDate && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Перерегистрация:</span>
                    <span className="font-medium">{formatDate(passport.reRegistrationDate)}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-gray-600">Регистратор:</span>
                  <span className="font-medium">{passport.registrar || '—'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Владение */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Владение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">Владелец:</span>
                  <span className="font-medium">{passport.owner || '—'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Принадлежность:</span>
                  <span className="font-medium">{passport.affiliation || '—'}</span>
                </div>
                {passport.rent && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Аренда:</span>
                    <span className="font-medium">{passport.rent}</span>
                  </div>
                )}
                {passport.pripiska && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Приписка:</span>
                    <span className="font-medium">{passport.pripiska}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ремонт и обслуживание */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Ремонт и обслуживание
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">Срок службы:</span>
                  <span className="font-medium">{passport.serviceLifeYears} лет</span>
                </div>
                {passport.periodMajorRepair && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Капитальный ремонт:</span>
                    <span className="font-medium">{formatDate(passport.periodMajorRepair)}</span>
                  </div>
                )}
                {passport.periodPeriodicTest && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Периодическое освидетельствование:</span>
                    <span className="font-medium">{formatDate(passport.periodPeriodicTest)}</span>
                  </div>
                )}
                {passport.periodIntermediateTest && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Промежуточное освидетельствование:</span>
                    <span className="font-medium">{formatDate(passport.periodIntermediateTest)}</span>
                  </div>
                )}
                {passport.periodDepotRepair && (
                  <div className="flex gap-2">
                    <span className="text-gray-600">Деповской ремонт:</span>
                    <span className="font-medium">{formatDate(passport.periodDepotRepair)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Дополнительная информация */}
          {(passport.techСonditions || passport.notes) && (
            <Card>
              <CardHeader>
                <CardTitle>Дополнительная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {passport.techСonditions && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Технические условия</h5>
                    <p className="text-sm text-gray-600">{passport.techСonditions}</p>
                  </div>
                )}
                {passport.notes && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Примечания</h5>
                    <p className="text-sm text-gray-600">{passport.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Системная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Системная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-600">Создано:</span>
                <span className="font-medium">
                  {format(new Date(passport.createdAt), 'dd.MM.yyyy HH:mm', { locale: ru })}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600">Обновлено:</span>
                <span className="font-medium">
                  {format(new Date(passport.updatedAt), 'dd.MM.yyyy HH:mm', { locale: ru })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
