'use client';

import { RailwayCisternDetail, getRailwayCisternDisplayName, formatWeight, formatVolume } from '@/api/references';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RailwayCisternCardProps {
  cistern: RailwayCisternDetail;
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

export default function RailwayCisternCard({ cistern, className = '' }: RailwayCisternCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{getRailwayCisternDisplayName(cistern)}</CardTitle>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Цистерна
            </span>
            {cistern.typeName && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {cistern.typeName}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900 mb-3">Общая информация</h5>
            <p className="text-sm"><span className="font-medium text-gray-700">Номер:</span> {cistern.number}</p>
            {cistern.manufacturerName && (
              <p className="text-sm"><span className="font-medium text-gray-700">Производитель:</span> {cistern.manufacturerName}</p>
            )}
            {cistern.manufacturerCountry && (
              <p className="text-sm"><span className="font-medium text-gray-700">Страна:</span> {cistern.manufacturerCountry}</p>
            )}
            {cistern.modelName && (
              <p className="text-sm"><span className="font-medium text-gray-700">Модель:</span> {cistern.modelName}</p>
            )}
            {cistern.serialNumber && (
              <p className="text-sm"><span className="font-medium text-gray-700">Серийный номер:</span> {cistern.serialNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <h5 className="font-medium text-gray-900 mb-3">Технические характеристики</h5>
            {cistern.loadCapacity && (
              <p className="text-sm"><span className="font-medium text-gray-700">Грузоподъемность:</span> {formatWeight(cistern.loadCapacity)}</p>
            )}
            {cistern.tareWeight && (
              <p className="text-sm"><span className="font-medium text-gray-700">Тара:</span> {formatWeight(cistern.tareWeight)}</p>
            )}
            {cistern.volume && (
              <p className="text-sm"><span className="font-medium text-gray-700">Объем:</span> {formatVolume(cistern.volume)}</p>
            )}
            {cistern.axleCount && (
              <p className="text-sm"><span className="font-medium text-gray-700">Количество осей:</span> {cistern.axleCount}</p>
            )}
            {cistern.length && (
              <p className="text-sm"><span className="font-medium text-gray-700">Длина:</span> {cistern.length} м</p>
            )}
          </div>
        </div>

        {/* Даты и дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900 mb-3">Даты</h5>
            {cistern.buildDate && (
              <p className="text-sm">
                <span className="font-medium text-gray-700">Дата постройки:</span> {formatDateSafe(cistern.buildDate)}
              </p>
            )}
            {cistern.commissioningDate && (
              <p className="text-sm">
                <span className="font-medium text-gray-700">Дата ввода в эксплуатацию:</span> {formatDateSafe(cistern.commissioningDate)}
              </p>
            )}
            {cistern.registrationDate && (
              <p className="text-sm">
                <span className="font-medium text-gray-700">Дата регистрации:</span> {formatDateSafe(cistern.registrationDate)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h5 className="font-medium text-gray-900 mb-3">Дополнительная информация</h5>
            {cistern.registrationNumber && (
              <p className="text-sm"><span className="font-medium text-gray-700">Регистрационный номер:</span> {cistern.registrationNumber}</p>
            )}
            {cistern.registrarName && (
              <p className="text-sm"><span className="font-medium text-gray-700">Регистратор:</span> {cistern.registrarName}</p>
            )}
            {cistern.fillingVolume && (
              <p className="text-sm"><span className="font-medium text-gray-700">Объем заполнения:</span> {formatVolume(cistern.fillingVolume)}</p>
            )}
            {cistern.initialTareWeight && (
              <p className="text-sm"><span className="font-medium text-gray-700">Первоначальная тара:</span> {formatWeight(cistern.initialTareWeight)}</p>
            )}
          </div>
        </div>

        {/* Информация о сосуде */}
        {cistern.vessel && (
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Информация о сосуде</h5>
            <div className="space-y-2">
              {cistern.vessel.vesselSerialNumber && (
                <p className="text-sm"><span className="font-medium text-gray-700">Серийный номер сосуда:</span> {cistern.vessel.vesselSerialNumber}</p>
              )}
              {cistern.vessel.vesselBuildDate && (
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Дата изготовления сосуда:</span> {formatDateSafe(cistern.vessel.vesselBuildDate)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Установленные части */}
        {cistern.partInstallations && cistern.partInstallations.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Установленные части</h5>
            <div className="space-y-3">
              {cistern.partInstallations.map((installation, index) => (
                <Card key={installation.installationId || index} className="p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <p><span className="font-medium">Наименование:</span> {installation.partName}</p>
                      <p><span className="font-medium">Тип:</span> {installation.partType}</p>
                      {installation.locationTo && (
                        <p><span className="font-medium">Расположение:</span> {installation.locationTo}</p>
                      )}
                    </div>
                    <div>
                      {installation.installedAt && (
                        <p><span className="font-medium">Дата установки:</span> {formatDateSafe(installation.installedAt)}</p>
                      )}
                      {installation.removedAt && (
                        <p><span className="font-medium">Дата снятия:</span> {formatDateSafe(installation.removedAt)}</p>
                      )}
                      {installation.notes && (
                        <p><span className="font-medium">Примечание:</span> {installation.notes}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Примечания */}
        {cistern.notes && (
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Примечания</h5>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{cistern.notes}</p>
          </div>
        )}

        {/* Системная информация */}
        <div className="pt-4 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Системная информация</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <p>Создано: {formatDateSafe(cistern.createdAt)}</p>
            {cistern.updatedAt && (
              <p>Изменено: {formatDateSafe(cistern.updatedAt)}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
