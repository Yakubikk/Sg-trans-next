'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { usersService } from '@/lib/api/services';
import { apiClient } from '@/lib/api/client';
import { RegisterDto } from '@/types/auth';
import { ProtectedRoute } from '@/components/auth/protected-route';

const userSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  patronymic: z.string().optional(),
  phoneNumber: z.string().min(1, 'Номер телефона обязателен'),
  roleIds: z.array(z.number()).min(1, 'Выберите хотя бы одну роль'),
});

type UserFormData = z.infer<typeof userSchema>;

interface Role {
  id: number;
  name: string;
}

export default function NewUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      roleIds: [],
    },
  });

  const selectedRoleIds = watch('roleIds');

  // Получение списка ролей
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => apiClient.get<Role[]>('/roles'),
  });

  const createMutation = useMutation({
    mutationFn: (data: RegisterDto) => usersService.create(data),
    onSuccess: () => {
      toast.success('Пользователь создан');
      router.push('/dashboard/users');
    },
    onError: () => {
      toast.error('Ошибка при создании пользователя');
    },
  });

  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: RegisterDto = {
        ...data,
        patronymic: data.patronymic || '',
      };
      await createMutation.mutateAsync(submitData);
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

  return (
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Создание пользователя
            </h1>
            <p className="text-gray-500">
              Добавление нового пользователя в систему
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Информация о пользователе</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patronymic">Отчество</Label>
                  <Input
                    id="patronymic"
                    {...register('patronymic')}
                    disabled={isSubmitting}
                  />
                  {errors.patronymic && (
                    <p className="text-sm text-red-500">{errors.patronymic.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Номер телефона *</Label>
                  <Input
                    id="phoneNumber"
                    {...register('phoneNumber')}
                    disabled={isSubmitting}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Роли *</Label>
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
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard/users')}
                  disabled={isSubmitting}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Создать пользователя
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
