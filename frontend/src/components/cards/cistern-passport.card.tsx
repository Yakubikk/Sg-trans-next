'use client';

import { RailwayCisternDetailed } from '@/api/references';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RailwayCisternPassportCardProps {
  cistern: RailwayCisternDetailed;
  className?: string;
}

function formatDateSafe(dateString?: string): string {
  if (!dateString) return 'Не указано';
  try {
    return new Date(dateString).toLocaleDateString('ru-RU');
  } catch {
    return 'Некорректная дата';
  }
}

function formatWeight(weight?: number): string {
  return weight ? `${weight} т` : 'Не указан';
}

function formatVolume(volume?: number): string {
  return volume ? `${volume} м³` : 'Не указан';
}

function formatLength(length?: number): string {
  if (!length) return 'Не указана';
  // Если длина больше 1000, скорее всего она в миллиметрах, конвертируем в метры
  if (length > 1000) {
    return `${(length / 1000).toFixed(1)} м`;
  }
  return `${length} м`;
}

function getDetailedCisternDisplayName(cistern: RailwayCisternDetailed): string {
  return `Цистерна №${cistern.number}${cistern.type?.name ? ` (${cistern.type.name})` : ''}`;
}

export default function CisternPassportCard({ cistern, className = '' }: RailwayCisternPassportCardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Заголовок паспорта */}
    
      <Card>
        <CardHeader>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Паспорт железнодорожной цистерны
            </CardTitle>
            <div className="text-xl text-blue-600 font-semibold">
              {getDetailedCisternDisplayName(cistern)}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {cistern.type?.type || 'Тип не указан'}
              </span>
              {cistern.dangerClass > 0 && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Класс опасности: {cistern.dangerClass}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Основная информация */}
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Номер цистерны</label>
                <p className="text-base font-semibold">{cistern.number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Заводской номер</label>
                <p className="text-base">{cistern.serialNumber || 'Не указан'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Регистрационный номер</label>
                <p className="text-base">{cistern.registrationNumber || 'Не указан'}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Производитель</label>
                <p className="text-base">{cistern.manufacturer?.name || 'Не указан'}</p>
                {cistern.manufacturer?.country && (
                  <p className="text-sm text-gray-500">{cistern.manufacturer.country}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Модель</label>
                <p className="text-base">{cistern.model?.name || 'Не указана'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Владелец</label>
                <p className="text-base">{cistern.owner?.name || 'Не указан'}</p>
                {cistern.owner?.shortName && (
                  <p className="text-sm text-gray-500">{cistern.owner.shortName}</p>
                )}
                {cistern.owner?.unp && (
                  <p className="text-sm text-gray-500">УНП: {cistern.owner.unp}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Технические характеристики */}
      <Card>
        <CardHeader>
          <CardTitle>Технические характеристики</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Грузоподъемность</label>
                <p className="text-base font-semibold">{formatWeight(cistern.loadCapacity)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Тара</label>
                <p className="text-base">{formatWeight(cistern.tareWeight)}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Объем</label>
                <p className="text-base font-semibold">{formatVolume(cistern.volume)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Объем заполнения</label>
                <p className="text-base">{formatVolume(cistern.fillingVolume)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Длина</label>
                <p className="text-base">{cistern.length} мм</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Количество осей</label>
                <p className="text-base">{cistern.axleCount || 'Не указано'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Рабочее давление</label>
                <p className="text-base">{cistern.pressure ? `${cistern.pressure} атм` : 'Не указано'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Испытательное давление</label>
                <p className="text-base">{cistern.testPressure ? `${cistern.testPressure} атм` : 'Не указано'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Даты и сроки */}
      <Card>
        <CardHeader>
          <CardTitle>Даты и сроки обслуживания</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Дата постройки</label>
                <p className="text-base">{formatDateSafe(cistern.buildDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Дата ввода в эксплуатацию</label>
                <p className="text-base">{formatDateSafe(cistern.commissioningDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Дата регистрации</label>
                <p className="text-base">{formatDateSafe(cistern.registrationDate)}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Срок службы</label>
                <p className="text-base">{cistern.serviceLifeYears ? `${cistern.serviceLifeYears} лет` : 'Не указан'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Капитальный ремонт</label>
                <p className="text-base">{formatDateSafe(cistern.periodMajorRepair)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Деповской ремонт</label>
                <p className="text-base">{formatDateSafe(cistern.periodDepotRepair)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Периодическое испытание</label>
                <p className="text-base">{formatDateSafe(cistern.periodPeriodicTest)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Промежуточное испытание</label>
                <p className="text-base">{formatDateSafe(cistern.periodIntermediateTest)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Дата перерегистрации</label>
                <p className="text-base">{formatDateSafe(cistern.reRegistrationDate)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Груз и эксплуатация */}
      <Card>
        <CardHeader>
          <CardTitle>Информация о грузе и эксплуатации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Вещество</label>
                <p className="text-base">{cistern.substance || 'Не указано'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Класс опасности</label>
                <p className="text-base">{cistern.dangerClass || 'Не указан'}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Принадлежность</label>
                <p className="text-base">{cistern.affiliation?.value || 'Не указана'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Приписка</label>
                <p className="text-base">{cistern.pripiska || 'Не указана'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Аренда</label>
                <p className="text-base">{cistern.rent || 'Не указана'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Регистратор</label>
                <p className="text-base">{cistern.registrar?.name || 'Не указан'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Дополнительная информация */}
      {(cistern.notes || cistern.techConditions) && (
        <Card>
          <CardHeader>
            <CardTitle>Дополнительная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cistern.techConditions && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Технические условия</label>
                  <p className="text-base bg-gray-50 p-3 rounded-md mt-1">{cistern.techConditions}</p>
                </div>
              )}
              {cistern.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Примечания</label>
                  <p className="text-base bg-gray-50 p-3 rounded-md mt-1">{cistern.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Системная информация */}
      <Card>
        <CardHeader>
          <CardTitle>Системная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <label className="font-medium">Создано:</label>
              <p>{formatDateSafe(cistern.createdAt)}</p>
            </div>
            <div>
              <label className="font-medium">Изменено:</label>
              <p>{formatDateSafe(cistern.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
