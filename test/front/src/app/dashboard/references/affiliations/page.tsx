'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';

import { ServerDataTable } from '@/components/common/server-data-table';
import { BaseFormModal } from '@/components/forms/base-form-modal';
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
import { affiliationsService } from '@/lib/api/services';
import { PaginationParams } from '@/types/models';

interface Affiliation {
  id: string;
  value: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const columns: ColumnDef<Affiliation>[] = [
  {
    accessorKey: 'value',
    header: 'Значение',
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => row.getValue('description') || '—',
  },
  {
    accessorKey: 'createdAt',
    header: 'Создано',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru });
    },
  },
];

export default function AffiliationsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Affiliation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояние пагинации и поиска
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 10,
    search: '',
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['affiliations', pagination],
    queryFn: () => affiliationsService.getAll(pagination),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; description?: string }) => 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      affiliationsService.create({ value: data.name, description: data.description } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliations'] });
      toast.success('Принадлежность создана');
      setIsFormOpen(false);
    },
    onError: () => {
      toast.error('Ошибка при создании принадлежности');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string } }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      affiliationsService.update(id, { value: data.name, description: data.description } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliations'] });
      toast.success('Принадлежность обновлена');
      setIsFormOpen(false);
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Ошибка при обновлении принадлежности');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: affiliationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliations'] });
      toast.success('Принадлежность удалена');
    },
    onError: () => {
      toast.error('Ошибка при удалении принадлежности');
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

  const handleCreate = () => {
    setSelectedEntity(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEdit = (entity: Affiliation) => {
    setSelectedEntity(entity);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = (entity: Affiliation) => {
    setSelectedEntity(entity);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: { name: string; description?: string }) => {
    if (isEditing && selectedEntity) {
      await updateMutation.mutateAsync({ id: selectedEntity.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedEntity) {
      await deleteMutation.mutateAsync(selectedEntity.id);
      setIsDeleteDialogOpen(false);
      setSelectedEntity(null);
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Принадлежности
        </h1>
        <p className="text-gray-500">
          Управление справочником принадлежностей и организаций
        </p>
      </div>

      <ServerDataTable
        columns={columns}
        data={tableData}
        title="Принадлежности"
        searchPlaceholder="Поиск принадлежностей..."
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
        currentSearch={pagination.search}
        isLoading={isLoading}
      />

      <BaseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={isEditing ? 'Редактировать принадлежность' : 'Создать принадлежность'}
        initialData={
          isEditing && selectedEntity
            ? { name: selectedEntity.value, description: selectedEntity.description }
            : undefined
        }
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить принадлежность &quot;{selectedEntity?.value}&quot;?
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
