"use client";

import { useMemo, memo } from "react";
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

export const railwayCisternsColumns: ColumnDef<RailwayCistern>[] = [
  {
    accessorKey: "number",
    header: "Номер",
    cell: ({ row }) => <div className="font-medium">{row.getValue("number")}</div>,
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
    cell: ({ row }) => <TableActions item={row.original} onEdit={() => {}} onDelete={() => {}} onView={() => {}} />,
  },
];

const CisternsTable = memo(function CisternsTable({ 
  data, 
  isLoading = false, 
  onEdit, 
  onDelete, 
  onView 
}: CisternsTableProps) {
  // Фильтруем данные на клиентской стороне

  const columns = useMemo(() => {
    return railwayCisternsColumns.map((column) => {
      if (column.id === "actions") {
        return {
          ...column,
          cell: ({ row }: { row: { original: RailwayCistern } }) => (
            <TableActions
              item={row.original}
              onEdit={() => onEdit?.(row.original)}
              onDelete={() => onDelete?.(row.original)}
              onView={() => onView?.(row.original)}
            />
          ),
        };
      }
      return column;
    });
  }, [onEdit, onDelete, onView]);

  return (
    <div className="space-y-4">
      <GenericTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
});

export { CisternsTable };
