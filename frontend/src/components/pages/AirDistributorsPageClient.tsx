"use client";

import { AirDistributorsTable } from "@/components/data";
import { useAirDistributors, useDeleteAirDistributor } from "@/hooks/useAirDistributors";
import { AirDistributor } from "@/api/references/air-distributors/types";

export default function AirDistributorsPageClient() {
  const { data = [], isLoading, error } = useAirDistributors();
  const deleteAirDistributor = useDeleteAirDistributor();

  const handleView = (airDistributor: AirDistributor) => {
    console.log("Просмотр воздухораспределителя:", airDistributor);
  };

  const handleEdit = (airDistributor: AirDistributor) => {
    console.log("Редактирование воздухораспределителя:", airDistributor);
  };

  const handleDelete = async (airDistributor: AirDistributor) => {
    if (window.confirm("Вы уверены, что хотите удалить этот воздухораспределитель?")) {
      try {
        await deleteAirDistributor.mutateAsync(airDistributor.id);
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
      <h1 className="text-2xl font-bold mb-6">Воздухораспределители</h1>
      <AirDistributorsTable 
        data={data} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
