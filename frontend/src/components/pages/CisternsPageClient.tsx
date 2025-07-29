'use client';

import { CisternsTable } from "@/components/data";
import { useRailwayCisterns, useDeleteRailwayCistern } from "@/hooks/references";
import type { RailwayCistern } from "@/api/references/railway-cisterns";

export default function RailwayCisternsPageClient() {
  const { data: railwayCisterns = [], isLoading: loading, error } = useRailwayCisterns();
  const deleteRailwayCistern = useDeleteRailwayCistern();

  const handleView = (railwayCistern: RailwayCistern) => {
    console.log('View railway cistern:', railwayCistern);
  };

  const handleEdit = (railwayCistern: RailwayCistern) => {
    console.log('Edit railway cistern:', railwayCistern);
  };

  const handleDelete = async (railwayCistern: RailwayCistern) => {
    if (confirm(`Удалить цистерну №${railwayCistern.number}?`)) {
      try {
        await deleteRailwayCistern.mutateAsync(railwayCistern.id);
      } catch (err) {
        alert('Ошибка при удалении цистерны');
        console.error('Error deleting railway cistern:', err);
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
            {error instanceof Error ? error.message : 'Ошибка при загрузке данных о цистернах'}
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
    <CisternsTable 
      data={railwayCisterns}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
