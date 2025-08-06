"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GenericTable, TableActions } from "@/components";
import type { AffiliationReference } from "@/api/references";

interface AffiliationReferencesTableProps {
  data: AffiliationReference[];
  isLoading?: boolean;
  onEdit?: (affiliation: AffiliationReference) => void;
  onDelete?: (affiliation: AffiliationReference) => void;
  onAdd?: () => void;
}

export function AffiliationReferencesTable({
  data,
  isLoading = false,
  onEdit,
  onDelete,
  onAdd,
}: AffiliationReferencesTableProps) {
  // Определение колонок для таблицы принадлежностей
  const affiliationReferencesColumns: ColumnDef<AffiliationReference>[] = [
    {
      accessorKey: "value",
      header: "Принадлежность",
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => {
        const affiliation = row.original;

        return (
          <TableActions
            item={affiliation}
            onEdit={() => onEdit?.(affiliation)}
            onDelete={() => onDelete?.(affiliation)}
          />
        );
      },
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={affiliationReferencesColumns}
      isLoading={isLoading}
      searchPlaceholder="Поиск по принадлежности..."
      emptyMessage="Принадлежности не найдены"
      showAddButton={true}
      addButtonLabel="Добавить принадлежность"
      onAdd={onAdd}
    />
  );
}
