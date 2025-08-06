'use client';

import { useEffect, useRef } from 'react';

interface InteractiveMapProps {
  cisternNumber: string;
  className?: string;
}

export function InteractiveMap({ cisternNumber, className = "" }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Здесь будет инициализация интерактивной карты
    // Пока что показываем заглушку
    console.log(`Инициализация карты для цистерны ${cisternNumber}`);
  }, [cisternNumber]);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Карта местоположений
        </h2>
        <p className="text-gray-600 mt-1">
          Интерактивная карта с местами получения информации о пробегах
        </p>
      </div>
      
      <div className="p-6">
        <div 
          ref={mapRef}
          className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-4">🗺️</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Интерактивная карта
            </h3>
            <p className="text-gray-500 mb-4">
              В разработке
            </p>
            <div className="text-sm text-gray-400">
              Здесь будет отображаться карта с местоположениями,<br />
              откуда была получена информация о пробегах цистерны {cisternNumber}
            </div>
          </div>
        </div>
        
        {/* Placeholder для будущих элементов управления картой */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              disabled
            >
              🔍 Увеличить
            </button>
            <button 
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              disabled
            >
              📍 Показать все точки
            </button>
            <button 
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              disabled
            >
              🗂️ Фильтры
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { InteractiveMapProps };
