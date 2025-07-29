'use client';

import { OwnersTable } from '@/components';
import type { OwnerEntity } from '@/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function OwnersPageClient() {
  const handleView = (owner: OwnerEntity) => {
    console.log('Просмотр собственника:', owner);
    // Можно добавить модальное окно для просмотра деталей
  };

  const handleEdit = (owner: OwnerEntity) => {
    console.log('Редактирование собственника:', owner);
    // Логика редактирования будет добавлена позже
  };

  const handleDelete = (owner: OwnerEntity) => {
    console.log('Удаление собственника:', owner);
    // Логика удаления будет добавлена позже
  };

  const handleCreate = () => {
    console.log('Создание нового собственника');
    // Логика создания будет добавлена позже
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Собственники</CardTitle>
            <CardDescription>
              Управление справочником собственников подвижного состава
            </CardDescription>
          </div>
          <Button 
            onClick={handleCreate}
            className="ml-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить собственника
          </Button>
        </CardHeader>
        <CardContent>
          <OwnersTable
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
