'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import Link from 'next/link';

import { ServerDataTable } from '@/components/common/server-data-table';
import { UserDto } from '@/types/auth';
import { PaginationParams } from '@/types/models';
import { usersService } from '@/lib/api/services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/protected-route';
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

const columns: ColumnDef<UserDto>[] = [
  {
    accessorKey: 'firstName',
    header: 'Имя',
    cell: ({ row }) => (
      <Link 
        href={`/dashboard/users/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
      >
        {row.getValue('firstName')}
      </Link>
    ),
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
  },
  {
    accessorKey: 'patronymic',
    header: 'Отчество',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Телефон',
  },
  {
    accessorKey: 'roles',
    header: 'Роли',
    cell: ({ row }) => {
      const roles = row.getValue('roles') as string[];
      return roles && roles.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {roles.map((role, index) => (
            <Badge 
              key={index} 
              variant={role === 'Admin' ? 'destructive' : 'secondary'}
            >
              {role}
            </Badge>
          ))}
        </div>
      ) : '—';
    },
  },
];

export default function UsersPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  
  // Состояние пагинации и поиска
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 10,
    search: '',
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['users', pagination],
    queryFn: () => usersService.getAll(pagination),
  });

  const deleteMutation = useMutation({
    mutationFn: usersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Пользователь удален');
    },
    onError: () => {
      toast.error('Ошибка при удалении пользователя');
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

  const handleDelete = (user: UserDto) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await deleteMutation.mutateAsync(selectedUser.id);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
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
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Пользователи
            </h1>
            <p className="text-gray-500">
              Управление пользователями системы
            </p>
          </div>
          <Link href="/dashboard/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить пользователя
            </Button>
          </Link>
        </div>

        <ServerDataTable
          columns={columns}
          data={tableData}
          title="Пользователи системы"
          searchPlaceholder="Поиск по имени, фамилии, email..."
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
                Вы действительно хотите удалить пользователя &quot;{selectedUser?.firstName} {selectedUser?.lastName}&quot;?
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
    </ProtectedRoute>
  );
}
