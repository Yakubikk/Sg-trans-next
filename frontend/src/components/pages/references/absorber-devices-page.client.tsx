"use client";

import { AbsorberDevicesTable } from "@/components/data";
import { useAbsorberDevices, useDeleteAbsorberDevice } from "@/hooks";
import { AbsorberDevice } from "@/api/references/absorber-devices/types";

export default function AbsorberDevicesPageClient() {
  const { data = [], isLoading, error } = useAbsorberDevices();
  const deleteAbsorberDevice = useDeleteAbsorberDevice();

  const handleView = (absorberDevice: AbsorberDevice) => {
    console.log("Просмотр поглощающего аппарата:", absorberDevice);
  };

  const handleEdit = (absorberDevice: AbsorberDevice) => {
    console.log("Редактирование поглощающего аппарата:", absorberDevice);
  };

  const handleDelete = async (absorberDevice: AbsorberDevice) => {
    if (window.confirm("Вы уверены, что хотите удалить этот поглощающий аппарат?")) {
      try {
        await deleteAbsorberDevice.mutateAsync(absorberDevice.id);
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
      <h1 className="text-2xl font-bold mb-6">Поглощающие аппараты</h1>
      <AbsorberDevicesTable 
        data={data} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
