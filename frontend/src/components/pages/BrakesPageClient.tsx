"use client";

import { BrakesTable } from "@/components/data";
import { useBrakes, useDeleteBrake } from "@/hooks/useBrakes";
import { Brake } from "@/api/references/brakes/types";

export default function BrakesPageClient() {
  const { data = [], isLoading, error } = useBrakes();
  const deleteBrake = useDeleteBrake();

  const handleView = (brake: Brake) => {
    console.log("Просмотр тормоза:", brake);
  };

  const handleEdit = (brake: Brake) => {
    console.log("Редактирование тормоза:", brake);
  };

  const handleDelete = async (brake: Brake) => {
    if (window.confirm("Вы уверены, что хотите удалить этот тормоз?")) {
      try {
        await deleteBrake.mutateAsync(brake.id);
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
      <h1 className="text-2xl font-bold mb-6">Тормоза</h1>
      <BrakesTable 
        data={data} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
