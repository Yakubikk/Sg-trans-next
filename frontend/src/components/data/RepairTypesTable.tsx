"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RepairType } from "@/api/references/repair-types";
import { GenericTable, TableActions } from "@/components/common";

interface RepairTypesTableProps {
  data: RepairType[];
  isLoading?: boolean;
  onView?: (repairType: RepairType) => void;
  onEdit?: (repairType: RepairType) => void;
  onDelete?: (repairType: RepairType) => void;
}

export const repairTypesColumns: ColumnDef<RepairType>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "code",
    header: "Код",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-xs truncate" title={description}>
          {description}
        </div>
      );
    },
  },
];

export function RepairTypesTable({ 
  data, 
  isLoading = false, 
  onView, 
  onEdit, 
  onDelete 
}: RepairTypesTableProps) {
  
  const columnsWithActions: ColumnDef<RepairType>[] = [
    ...repairTypesColumns,
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <TableActions
            item={row.original}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columnsWithActions}
      isLoading={isLoading}
      searchPlaceholder="Поиск по типам ремонта..."
      emptyMessage="Типы ремонта не найдены"
    />
  );
}
