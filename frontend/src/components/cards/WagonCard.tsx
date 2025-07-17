'use client';

import { Wagon, getWagonStatus, getWagonDisplayName } from '@/api/references';
import { cn } from '@/lib/utils';

interface WagonCardProps {
  wagon: Wagon;
  className?: string;
}

export default function WagonCard({ wagon, className = '' }: WagonCardProps) {
  return (
    <div className={cn("border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow", className)}>
      {/* Заголовок */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg text-gray-900">{getWagonDisplayName(wagon)}</h4>
        <div className="flex gap-2">
          <span className={cn(
            "px-2 py-1 text-xs rounded-full",
            wagon.isActive 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {getWagonStatus(wagon)}
          </span>
          {wagon.isLeased && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Аренда
            </span>
          )}
        </div>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <p><span className="font-medium text-gray-700">Путь:</span> {wagon.way}</p>
          {wagon.carType && (
            <p><span className="font-medium text-gray-700">Тип:</span> {wagon.carType}</p>
          )}
          {wagon.carBrand && (
            <p><span className="font-medium text-gray-700">Марка:</span> {wagon.carBrand}</p>
          )}
          {wagon.type && (
            <p><span className="font-medium text-gray-700">Класс:</span> {wagon.type}</p>
          )}
          {wagon.assignment && (
            <p><span className="font-medium text-gray-700">Приписка:</span> {wagon.assignment}</p>
          )}
        </div>

        <div>
          {wagon.loadCapacity && (
            <p><span className="font-medium text-gray-700">Грузоподъемность:</span> {wagon.loadCapacity} т</p>
          )}
          {wagon.tare && (
            <p><span className="font-medium text-gray-700">Тара:</span> {wagon.tare} т</p>
          )}
          {wagon.capacity && (
            <p><span className="font-medium text-gray-700">Емкость:</span> {wagon.capacity}</p>
          )}
          {wagon.carAxles && (
            <p><span className="font-medium text-gray-700">Оси:</span> {wagon.carAxles}</p>
          )}
          {wagon.mileageNorm && (
            <p><span className="font-medium text-gray-700">Норма пробега:</span> {wagon.mileageNorm} км</p>
          )}
        </div>
      </div>

      {/* Техническая информация */}
      {(wagon.carFactoryNumberId || wagon.carConstructionDate || wagon.regNumber) && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h5 className="font-medium text-gray-700 mb-2">Техническая информация</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            {wagon.carFactoryNumberId && (
              <p><span className="font-medium">Зав. номер:</span> {wagon.carFactoryNumberId}</p>
            )}
            {wagon.regNumber && (
              <p><span className="font-medium">Рег. номер:</span> {wagon.regNumber}</p>
            )}
            {wagon.carConstructionDate && (
              <p>
                <span className="font-medium">Дата постройки:</span>{' '}
                {new Date(wagon.carConstructionDate).toLocaleDateString()}
              </p>
            )}
            {wagon.carInventory && (
              <p><span className="font-medium">Инв. номер:</span> {wagon.carInventory}</p>
            )}
          </div>
        </div>
      )}

      {/* Дополнительные характеристики */}
      {(wagon.carBrake || wagon.carTele || wagon.pressure) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <h5 className="font-medium text-gray-700 mb-2">Оборудование</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            {wagon.carBrake && (
              <p><span className="font-medium">Тормоз:</span> {wagon.carBrake}</p>
            )}
            {wagon.carTele && (
              <p><span className="font-medium">Тележка:</span> {wagon.carTele}</p>
            )}
            {wagon.carAirDistributor && (
              <p><span className="font-medium">Воздухораспределитель:</span> {wagon.carAirDistributor}</p>
            )}
            {wagon.pressure && (
              <p><span className="font-medium">Давление:</span> {wagon.pressure} атм</p>
            )}
          </div>
        </div>
      )}

      {/* Описание */}
      {wagon.carDescription && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <h5 className="font-medium text-gray-700 mb-1">Описание</h5>
          <p className="text-sm text-gray-600">{wagon.carDescription}</p>
        </div>
      )}

      {/* Даты */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        {wagon.createDate && (
          <p>Создано: {new Date(wagon.createDate).toLocaleDateString()}</p>
        )}
        {wagon.modifiedDate && (
          <p>Изменено: {new Date(wagon.modifiedDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}
