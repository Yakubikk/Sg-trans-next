'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Edit, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { usersService } from '@/lib/api/services';
import { apiClient } from '@/lib/api/client';
import { UpdateUserDto } from '@/types/auth';
import { ProtectedRoute } from '@/components/auth/protected-route';

const updateUserSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  patronymic: z.string().optional(),
  email: z.email('Некорректный email'),
  phoneNumber: z.string().min(1, 'Номер телефона обязателен'),
  roleIds: z.array(z.number()).min(1, 'Выберите хотя бы одну роль'),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface Role {
  id: number;
  name: string;
}

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const selectedRoleIds = watch('roleIds');

  // Получение данных пользователя
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => usersService.getById(userId),
    enabled: !!userId,
  });

  // Получение списка ролей
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => apiClient.get<Role[]>('/roles'),
  });

  // Обновляем форму при загрузке данных пользователя
  useEffect(() => {
    if (user && roles.length > 0) {
      const userRoleIds = user.roles.map(roleName => 
        roles.find(role => role.name === roleName)?.id
      ).filter(Boolean) as number[];
      
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic || '',
        email: user.email,
        phoneNumber: user.phoneNumber,
        roleIds: userRoleIds,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, roles]);

  const updateMutation = useMutation({
    mutationFn: (data: UpdateUserDto) => usersService.update(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Пользователь обновлен');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Ошибка при обновлении пользователя');
    },
  });

  const handleFormSubmit = async (data: UpdateUserFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: UpdateUserDto = {
        ...data,
        patronymic: data.patronymic || '',
      };
      await updateMutation.mutateAsync(submitData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (roleId: number, checked: boolean) => {
    const currentRoles = selectedRoleIds || [];
    if (checked) {
      setValue('roleIds', [...currentRoles, roleId]);
    } else {
      setValue('roleIds', currentRoles.filter(id => id !== roleId));
    }
  };

  const handleCancelEdit = () => {
    if (user && roles.length > 0) {
      const userRoleIds = user.roles.map(roleName => 
        roles.find(role => role.name === roleName)?.id
      ).filter(Boolean) as number[];
      
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic || '',
        email: user.email,
        phoneNumber: user.phoneNumber,
        roleIds: userRoleIds,
      });
    }
    setIsEditing(false);
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Пользователь не найден</p>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/users">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500">
                Информация о пользователе
              </p>
            </div>
          </div>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Редактировать
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                Отмена
              </Button>
              <Button
                onClick={handleSubmit(handleFormSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Сохранить
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Информация о пользователе</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  {isEditing ? (
                    <>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        disabled={isSubmitting}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  {isEditing ? (
                    <>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        disabled={isSubmitting}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patronymic">Отчество</Label>
                  {isEditing ? (
                    <>
                      <Input
                        id="patronymic"
                        {...register('patronymic')}
                        disabled={isSubmitting}
                      />
                      {errors.patronymic && (
                        <p className="text-sm text-red-500">{errors.patronymic.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.patronymic || '—'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Номер телефона</Label>
                  {isEditing ? (
                    <>
                      <Input
                        id="phoneNumber"
                        {...register('phoneNumber')}
                        disabled={isSubmitting}
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Роли</Label>
                {isEditing ? (
                  <>
                    {isLoadingRoles ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Загрузка ролей...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roles.map((role) => (
                          <div key={role.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`role-${role.id}`}
                              checked={selectedRoleIds?.includes(role.id)}
                              onCheckedChange={(checked) => 
                                handleRoleChange(role.id, checked as boolean)
                              }
                              disabled={isSubmitting}
                            />
                            <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                              {role.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.roleIds && (
                      <p className="text-sm text-red-500">{errors.roleIds.message}</p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role, index) => (
                        <Badge 
                          key={index} 
                          variant={role === 'Admin' ? 'destructive' : 'secondary'}
                        >
                          {role}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">Роли не назначены</span>
                    )}
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
