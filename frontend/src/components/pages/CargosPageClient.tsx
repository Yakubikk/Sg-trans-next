"use client";

import { CargosTable } from "@/components/data";
import { useCargos, useDeleteCargo } from "@/hooks/useCargos";
import { Cargo } from "@/api/references/cargos/types";

export default function CargosPageClient() {
  const { data = [], isLoading, error } = useCargos();
  const deleteCargo = useDeleteCargo();

  const handleView = (cargo: Cargo) => {
    console.log("Просмотр груза:", cargo);
  };

  const handleEdit = (cargo: Cargo) => {
    console.log("Редактирование груза:", cargo);
  };

  const handleDelete = async (cargo: Cargo) => {
    if (window.confirm("Вы уверены, что хотите удалить этот груз?")) {
      try {
        await deleteCargo.mutateAsync(cargo.id);
      } catch (err) {
        console.error("Ошибка при удалении:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">
          Ошибка: {error instanceof Error ? error.message : "Произошла ошибка при загрузке данных"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Грузы</h1>
      <CargosTable 
        data={data} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
