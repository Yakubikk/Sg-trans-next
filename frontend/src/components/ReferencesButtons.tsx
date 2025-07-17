'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { referencesApi, Wagon, RepairType } from '@/api/references';
import { useApiCall } from '@/hooks/useApiCall';
import WagonCard from './WagonCard';

interface ReferencesButtonsProps {
  className?: string;
}

export default function ReferencesButtons({ className = '' }: ReferencesButtonsProps) {
  const [wagons, setWagons] = useState<Wagon[]>([]);
  const [repairTypes, setRepairTypes] = useState<RepairType[]>([]);

  const wagonsApi = useApiCall<Wagon[]>({
    loadingMessage: 'Загружаем данные о вагонах...',
    successMessage: (data) => `Успешно загружено ${(data as Wagon[]).length} вагонов`,
    errorMessage: 'Ошибка при загрузке вагонов',
  });

  const repairTypesApi = useApiCall<RepairType[]>({
    loadingMessage: 'Загружаем типы ремонта...',
    successMessage: (data) => `Успешно загружено ${(data as RepairType[]).length} типов ремонта`,
    errorMessage: 'Ошибка при загрузке типов ремонта',
  });

  const handleGetWagons = async () => {
    const result = await wagonsApi.execute(async () => {
      const response = await referencesApi.getWagons();
      return response.data;
    });

    if (result) {
      setWagons(result);
    }
  };

  const handleGetRepairTypes = async () => {
    const result = await repairTypesApi.execute(async () => {
      const response = await referencesApi.getRepairTypes();
      return response.data;
    });

    if (result) {
      setRepairTypes(result);
    }
  };

  const handleClearData = () => {
    setWagons([]);
    setRepairTypes([]);
    wagonsApi.reset();
    repairTypesApi.reset();
    toast.success('Данные очищены');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Кнопки управления */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleGetWagons}
          disabled={wagonsApi.loading}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {wagonsApi.loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Загрузка...
            </>
          ) : (
            'Загрузить вагоны'
          )}
        </button>

        <button
          onClick={handleGetRepairTypes}
          disabled={repairTypesApi.loading}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {repairTypesApi.loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Загрузка...
            </>
          ) : (
            'Загрузить типы ремонта'
          )}
        </button>

        <button
          onClick={handleClearData}
          disabled={wagonsApi.loading || repairTypesApi.loading}
          className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Очистить данные
        </button>
      </div>

      {/* Отображение ошибок */}
      {(wagonsApi.error || repairTypesApi.error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Ошибка</h3>
              {wagonsApi.error && (
                <p className="mt-1 text-sm text-red-700">Вагоны: {wagonsApi.error}</p>
              )}
              {repairTypesApi.error && (
                <p className="mt-1 text-sm text-red-700">Типы ремонта: {repairTypesApi.error}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Отображение загруженных вагонов */}
      {wagons.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Вагоны ({wagons.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {wagons.map((wagon) => (
              <WagonCard key={wagon.id} wagon={wagon} />
            ))}
          </div>
        </div>
      )}

      {/* Отображение загруженных типов ремонта */}
      {repairTypes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Типы ремонта ({repairTypes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repairTypes.map((repairType) => (
              <div key={repairType.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{repairType.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{repairType.description}</p>
                <p className="text-sm text-gray-600">Категория: {repairType.category}</p>
                <p className="text-sm text-gray-600">Длительность: {repairType.estimatedDurationHours} ч</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
