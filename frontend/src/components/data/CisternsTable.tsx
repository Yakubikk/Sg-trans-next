"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { RailwayCistern } from "@/api/references";
import { GenericTable, TableActions, AddCisternDialog, EditCisternDialog } from "@/components/common";

interface RailwayCisternsTableProps {
  data: RailwayCistern[];
  isLoading?: boolean;
  onDelete?: (cistern: RailwayCistern) => void;
}

// Определение колонок для таблицы цистерн
export const railwayCisternsColumns: ColumnDef<RailwayCistern>[] = [
  {
    accessorKey: "number",
    header: "Номер",
  },
  {
    accessorKey: "manufacturerName",
    header: "Производитель",
  },
  {
    accessorKey: "buildDate",
    header: "Дата производства",
    cell: ({ row }) => {
      const date = row.getValue("buildDate") as string;
      return date ? new Date(date).toLocaleDateString("ru-RU") : "-";
    },
  },
  {
    accessorKey: "typeName",
    header: "Тип",
  },
  {
    accessorKey: "modelName",
    header: "Модель",
  },
  {
    accessorKey: "ownerName",
    header: "Владелец",
  },
  {
    accessorKey: "registrationNumber",
    header: "Регистрационный номер",
  },
  {
    accessorKey: "registrationDate",
    header: "Дата регистрации",
    cell: ({ row }) => {
      const date = row.getValue("registrationDate") as string;
      return date ? new Date(date).toLocaleDateString("ru-RU") : "-";
    },
  },
  {
    accessorKey: "affiliationValue",
    header: "Принадлежность",
  },
];

export function CisternsTable({ data, isLoading = false, onDelete }: RailwayCisternsTableProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCistern, setSelectedCistern] = useState<RailwayCistern | null>(null);
  const router = useRouter();

  const handleRowClick = (cistern: RailwayCistern) => {
    // Переходим на страницу паспортов с номером цистерны в URL
    router.push(`/cistern-passports?search=${encodeURIComponent(cistern.number)}`);
  };

  const handleAddCistern = () => {
    setShowAddDialog(true);
  };

  const handleViewCistern = (cistern: RailwayCistern) => {
    // Переходим на страницу паспорта конкретной цистерны
    router.push(`/cistern-passports?search=${encodeURIComponent(cistern.number)}`);
  };

  const handleEditCistern = (cistern: RailwayCistern) => {
    setSelectedCistern(cistern);
    setShowEditDialog(true);
  };

  const columnsWithActions: ColumnDef<RailwayCistern>[] = [
    ...railwayCisternsColumns,
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <TableActions 
            item={row.original} 
            onView={() => handleViewCistern(row.original)} 
            onEdit={() => handleEditCistern(row.original)} 
            onDelete={() => onDelete?.(row.original)} 
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <GenericTable
        data={data}
        columns={columnsWithActions}
        isLoading={isLoading}
        searchPlaceholder="Поиск по номеру цистерны..."
        emptyMessage="Цистерны не найдены"
        onRowClick={handleRowClick}
        showAddButton={true}
        addButtonLabel="Добавить цистерну"
        onAdd={handleAddCistern}
      />
      
      <AddCisternDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
      
      {/* Диалог редактирования цистерны */}
      {selectedCistern && (
        <EditCisternDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          cistern={selectedCistern}
        />
      )}
    </>
  );
}
