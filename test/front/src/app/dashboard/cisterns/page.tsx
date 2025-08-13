'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';
import Link from 'next/link';

import { RailwayCistern, PaginationParams } from '@/types/models';
import { railwayCisternsService } from '@/lib/api/services';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ServerDataTable } from '@/components/common/server-data-table';

const columns: ColumnDef<RailwayCistern>[] = [
  {
    accessorKey: 'number',
    header: 'Номер',
    cell: ({ row }) => (
      <Link 
        href={`/dashboard/cisterns/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
      >
        {row.getValue('number')}
      </Link>
    ),
  },
  {
    accessorKey: 'serialNumber',
    header: 'Серийный номер',
  },
  {
    accessorKey: 'manufacturer',
    header: 'Производитель',
    cell: ({ row }) => {
      const manufacturer = row.original.manufacturer;
      return manufacturer?.name || '—';
    },
  },
  {
    accessorKey: 'type',
    header: 'Тип',
    cell: ({ row }) => {
      const type = row.original.type;
      return type?.name || '—';
    },
  },
  {
    accessorKey: 'model',
    header: 'Модель',
    cell: ({ row }) => {
      const model = row.original.model;
      return model?.name || '—';
    },
  },
  {
    accessorKey: 'tareWeight',
    header: 'Тара, кг',
    cell: ({ row }) => {
      const weight = row.getValue('tareWeight') as number;
      return weight.toLocaleString('ru-RU');
    },
  },
  {
    accessorKey: 'loadCapacity',
    header: 'Грузоподъемность, кг',
    cell: ({ row }) => {
      const capacity = row.getValue('loadCapacity') as number;
      return capacity.toLocaleString('ru-RU');
    },
  },
  {
    accessorKey: 'volume',
    header: 'Объем, м³',
    cell: ({ row }) => {
      const volume = row.getValue('volume') as number;
      return volume.toLocaleString('ru-RU');
    },
  },
  {
    accessorKey: 'buildDate',
    header: 'Дата постройки',
    cell: ({ row }) => {
      const date = row.getValue('buildDate') as string;
      return format(new Date(date), 'dd.MM.yyyy', { locale: ru });
    },
  },
  {
    accessorKey: 'registrationDate',
    header: 'Дата регистрации',
    cell: ({ row }) => {
      const date = row.getValue('registrationDate') as string;
      return format(new Date(date), 'dd.MM.yyyy', { locale: ru });
    },
  },
];

export default function CisternsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCistern, setSelectedCistern] = useState<RailwayCistern | null>(null);
  
  // Состояние пагинации и поиска
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 10,
    search: '',
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['railway-cisterns', pagination],
    queryFn: () => railwayCisternsService.getAll(pagination),
  });

  const deleteMutation = useMutation({
    mutationFn: railwayCisternsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['railway-cisterns'] });
      toast.success('Цистерна удалена');
    },
    onError: () => {
      toast.error('Ошибка при удалении цистерны');
    },
  });

  // Обработчики пагинации
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination(prev => ({ ...prev, size, page: 1 }));
  };

  const handleSearchChange = (search: string) => {
    setPagination(prev => ({ ...prev, search, page: 1 }));
  };

  const handleDelete = (cistern: RailwayCistern) => {
    setSelectedCistern(cistern);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCistern) {
      await deleteMutation.mutateAsync(selectedCistern.id);
      setIsDeleteDialogOpen(false);
      setSelectedCistern(null);
    }
  };

  // Заглушка для данных, если они еще не загружены
  const tableData = data || {
    items: [],
    totalCount: 0,
    page: 1,
    size: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Паспорта цистерн
          </h1>
          <p className="text-gray-500">
            Управление железнодорожными цистернами
          </p>
        </div>
        <Link href="/dashboard/cisterns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить цистерну
          </Button>
        </Link>
      </div>

      <ServerDataTable
        columns={columns}
        data={tableData}
        title="Железнодорожные цистерны"
        searchPlaceholder="Поиск по номеру, серийному номеру..."
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
        currentSearch={pagination.search}
        isLoading={isLoading}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить цистерну &quot;{selectedCistern?.number}&quot;?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
