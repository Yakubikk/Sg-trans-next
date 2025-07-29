'use client';

import { useRailwayCisternDetailedByNumber } from '@/hooks/references';
import { CisternPassportCard } from '@/components/cards';

interface CisternPassportClientProps {
  cisternNumber: string;
}

export function CisternPassportClient({ cisternNumber }: CisternPassportClientProps) {
  const { data: cistern, isLoading, error } = useRailwayCisternDetailedByNumber(cisternNumber);

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 text-lg">Загрузка паспорта цистерны...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-900 mb-2">Ошибка загрузки</h2>
          <p className="text-red-700 mb-4">
            {error instanceof Error ? error.message : 'Не удалось загрузить данные о цистерне'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!cistern) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-600 text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">Цистерна не найдена</h2>
          <p className="text-yellow-700 mb-4">
            Цистерна с номером <strong>#{cisternNumber}</strong> не найдена в базе данных.
          </p>
          <p className="text-sm text-yellow-600">
            Проверьте правильность номера цистерны или обратитесь к администратору.
          </p>
        </div>
      </div>
    );
  }

  return <CisternPassportCard cistern={cistern} />;
}
