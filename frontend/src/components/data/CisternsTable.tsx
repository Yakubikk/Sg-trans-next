"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { RailwayCistern } from "@/api/references";
import { GenericTable, TableActions } from "@/components/common";

interface RailwayCisternsTableProps {
  data: RailwayCistern[];
  isLoading?: boolean;
  onView?: (cistern: RailwayCistern) => void;
  onEdit?: (cistern: RailwayCistern) => void;
  onDelete?: (cistern: RailwayCistern) => void;
}

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

export function CisternsTable({ data, isLoading = false, onView, onEdit, onDelete }: RailwayCisternsTableProps) {
  const router = useRouter();

  const handleRowClick = (cistern: RailwayCistern) => {
    // Переходим на страницу паспортов с номером цистерны в URL
    router.push(`/cistern-passports?search=${encodeURIComponent(cistern.number)}`);
  };

  const columnsWithActions: ColumnDef<RailwayCistern>[] = [
    ...railwayCisternsColumns,
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <TableActions item={row.original} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ),
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columnsWithActions}
      isLoading={isLoading}
      searchPlaceholder="Поиск по номеру цистерны..."
      emptyMessage="Цистерны не найдены"
      onRowClick={handleRowClick}
    />
  );
}
