'use client';

import { WagonsTable } from "@/components/data";
import { useWagons, useDeleteWagon } from "@/hooks/useWagons";
import type { Wagon } from "@/api/references/wagons";

export function WagonsPageClient() {
  const { data: wagons = [], isLoading: loading, error } = useWagons();
  const deleteWagon = useDeleteWagon();

  const handleView = (wagon: Wagon) => {
    console.log('View wagon:', wagon);
  };

  const handleEdit = (wagon: Wagon) => {
    console.log('Edit wagon:', wagon);
  };

  const handleDelete = async (wagon: Wagon) => {
    if (confirm(`Удалить вагон №${wagon.number}?`)) {
      try {
        await deleteWagon.mutateAsync(wagon.id);
      } catch (err) {
        alert('Ошибка при удалении вагона');
        console.error('Error deleting wagon:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Загрузка данных...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            {error instanceof Error ? error.message : 'Ошибка при загрузке данных о вагонах'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <WagonsTable 
      data={wagons}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
