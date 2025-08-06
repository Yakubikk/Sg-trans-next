"use client";

import { useState } from "react";
import { AffiliationReferencesTable } from "@/components/data";
import { useAffiliations, useDeleteAffiliation } from "@/hooks/references";
import type { AffiliationReference } from "@/api/references";

export default function AffiliationReferencesPageClient() {
  const [, setSelectedAffiliation] = useState<AffiliationReference | null>(null);
  const [, setShowCreateDialog] = useState(false);
  const [, setShowEditDialog] = useState(false);

  const { data: affiliationReferences = [], isLoading, error } = useAffiliations();
  const deleteAffiliation = useDeleteAffiliation();

  const handleEdit = (affiliation: AffiliationReference) => {
    setSelectedAffiliation(affiliation);
    setShowEditDialog(true);
    // TODO: Открыть диалог редактирования
  };

  const handleDelete = async (affiliation: AffiliationReference) => {
    if (window.confirm(`Вы действительно хотите удалить принадлежность "${affiliation.value}"?`)) {
      try {
        await deleteAffiliation.mutateAsync(affiliation.id);
      } catch (error) {
        console.error("Ошибка при удалении принадлежности:", error);
        alert("Ошибка при удалении принадлежности");
      }
    }
  };

  const handleAdd = () => {
    setShowCreateDialog(true);
    // TODO: Открыть диалог создания
  };

  if (isLoading) {
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
            {error instanceof Error ? error.message : 'Ошибка при загрузке принадлежностей'}
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
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Принадлежности</h1>
          <p className="mt-1 text-sm text-gray-600">
            Управление справочником принадлежностей цистерн
          </p>
        </div>

        <AffiliationReferencesTable
          data={affiliationReferences}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>

      {/* Диалоги создания и редактирования */}
      {/* TODO: Добавить диалоги для создания и редактирования принадлежностей */}
    </div>
  );
}
