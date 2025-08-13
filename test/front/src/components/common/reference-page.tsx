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
import { PaginationParams, PaginatedResponse } from '@/types/models';

interface BaseEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReferencePageProps {
  title: string;
  description: string;
  queryKey: string;
  service: {
    getAll: (params?: PaginationParams) => Promise<PaginatedResponse<BaseEntity>>;
    create: (data: { name: string; description?: string }) => Promise<BaseEntity>;
    update: (id: string, data: { name?: string; description?: string }) => Promise<BaseEntity>;
    delete: (id: string) => Promise<void>;
  };
}

const baseColumns: ColumnDef<BaseEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Название',
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

export function ReferencePage({ title, description, queryKey, service }: ReferencePageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<BaseEntity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояние пагинации и поиска
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 10,
    search: '',
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, pagination],
    queryFn: () => service.getAll(pagination),
  });

  const createMutation = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Запись создана');
      setIsFormOpen(false);
    },
    onError: () => {
      toast.error('Ошибка при создании записи');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string } }) =>
      service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Запись обновлена');
      setIsFormOpen(false);
    },
    onError: () => {
      toast.error('Ошибка при обновлении записи');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: service.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Запись удалена');
    },
    onError: () => {
      toast.error('Ошибка при удалении записи');
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

  const handleAdd = () => {
    setSelectedEntity(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEdit = (entity: BaseEntity) => {
    setSelectedEntity(entity);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = (entity: BaseEntity) => {
    setSelectedEntity(entity);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: { name: string; description?: string }) => {
    if (isEditing && selectedEntity) {
      await updateMutation.mutateAsync({
        id: selectedEntity.id,
        data,
      });
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <ServerDataTable
        columns={baseColumns}
        data={data || { items: [], totalCount: 0, page: 1, size: 10, totalPages: 0, hasNextPage: false, hasPreviousPage: false }}
        title={title}
        searchPlaceholder={`Поиск в ${title.toLowerCase()}...`}
        onAdd={handleAdd}
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
        title={isEditing ? `Редактировать ${title.toLowerCase()}` : `Добавить ${title.toLowerCase()}`}
        initialData={selectedEntity ? {
          name: selectedEntity.name,
          description: selectedEntity.description,
        } : undefined}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить &quot;{selectedEntity?.name}&quot;?
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
