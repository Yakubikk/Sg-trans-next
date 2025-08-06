"use client";

import { useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { GenericTable, TableActions } from "@/components/common/tables";
import { RailwayCistern, CisternFilter } from "@/api/references";

export interface CisternsTableProps {
  data: RailwayCistern[];
  isLoading?: boolean;
  appliedFilters?: CisternFilter;
  onEdit?: (cistern: RailwayCistern) => void;
  onDelete?: (cistern: RailwayCistern) => void;
  onView?: (cistern: RailwayCistern) => void;
}

const CisternsTable = memo(function CisternsTable({ 
  data, 
  isLoading = false, 
  onEdit, 
  onDelete, 
  onView 
}: CisternsTableProps) {
  const router = useRouter();

  // Определяем колонки с возможностью навигации
  const railwayCisternsColumns: ColumnDef<RailwayCistern>[] = useMemo(() => [
    {
      accessorKey: "number",
      header: "Номер",
      cell: ({ row }) => (
        <button
          onClick={() => router.push(`/cistern-passports/${encodeURIComponent(row.getValue("number") as string)}`)}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          {row.getValue("number")}
        </button>
      ),
    },
    {
      accessorKey: "registrationNumber",
      header: "Регистрационный номер",
    },
    {
      accessorKey: "manufacturerName",
      header: "Производитель",
    },
    {
      accessorKey: "modelName",
      header: "Модель",
    },
    {
      accessorKey: "typeName",
      header: "Тип",
    },
    {
      accessorKey: "ownerName",
      header: "Владелец",
    },
    {
      accessorKey: "affiliationValue",
      header: "Принадлежность",
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
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <TableActions 
          item={row.original} 
          onEdit={() => onEdit?.(row.original)} 
          onDelete={() => onDelete?.(row.original)} 
          onView={() => onView?.(row.original)} 
        />
      ),
    },
  ], [router, onEdit, onDelete, onView]);

  const columns = useMemo(() => {
    return railwayCisternsColumns;
  }, [railwayCisternsColumns]);

  return (
    <div className="space-y-4">
      <GenericTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
});

export { CisternsTable };
