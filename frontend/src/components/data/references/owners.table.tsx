'use client';

import { GenericTable, TableActions } from '@/components';
import { useOwners } from '@/hooks';
import type { OwnerEntity } from '@/api';
import type { ColumnDef, CellContext } from '@tanstack/react-table';

interface OwnersTableProps {
  isLoading?: boolean;
  onView?: (owner: OwnerEntity) => void;
  onEdit?: (owner: OwnerEntity) => void;
  onDelete?: (owner: OwnerEntity) => void;
}

export function OwnersTable({ 
  isLoading: externalLoading, 
  onView, 
  onEdit, 
  onDelete 
}: OwnersTableProps) {
  const {
    data = [],
    isLoading: queryLoading,
    isError,
    error
  } = useOwners();

  const isLoading = externalLoading || queryLoading;

  const columns: ColumnDef<OwnerEntity>[] = [
    {
      header: 'Название',
      accessorKey: 'name',
      enableSorting: true,
    },
    {
      header: 'Краткое название',
      accessorKey: 'shortName',
      enableSorting: true,
    },
    {
      header: 'Адрес',
      accessorKey: 'address',
      enableSorting: true,
    },
    {
      header: 'УНП',
      accessorKey: 'unp',
      enableSorting: true,
      cell: ({ getValue }: CellContext<OwnerEntity, unknown>) => {
        const value = getValue() as string | null;
        return value || '—';
      },
    },
    {
      header: 'Ремонты',
      accessorKey: 'treatRepairs',
      cell: ({ getValue }: CellContext<OwnerEntity, unknown>) => {
        const value = getValue() as boolean;
        return value ? 'Да' : 'Нет';
      },
      enableSorting: true,
    },
  ];

  // Добавляем колонку действий, если есть обработчики
  const columnsWithActions: ColumnDef<OwnerEntity>[] = (onView || onEdit || onDelete) ? [
    ...columns,
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }: CellContext<OwnerEntity, unknown>) => (
        <div className="flex justify-end">
          <TableActions
            item={row.original}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ] : columns;

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Произошла неизвестная ошибка'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <GenericTable
      data={data}
      columns={columnsWithActions}
      isLoading={isLoading}
      searchPlaceholder="Поиск по названию, адресу или УНП..."
      emptyMessage="Собственники не найдены"
    />
  );
}

export default OwnersTable;
