'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from '@/components/ui';
import { useCreateRailwayCistern, useUpdateRailwayCistern } from '@/hooks';
import type { CreateRailwayCisternRequest, UpdateRailwayCisternRequest, RailwayCisternDetail } from '@/api/references';

interface RailwayCisternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cistern?: RailwayCisternDetail | null;
  mode: 'create' | 'edit';
}

type FormData = CreateRailwayCisternRequest;

export default function RailwayCisternDialog({
  open,
  onOpenChange,
  cistern,
  mode,
}: RailwayCisternDialogProps) {
  const createMutation = useCreateRailwayCistern();
  const updateMutation = useUpdateRailwayCistern();
  
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      number: '',
      manufacturerId: '',
      buildDate: '',
      tareWeight: 0,
      loadCapacity: 0,
      length: 0,
      axleCount: 4,
      volume: 0,
      fillingVolume: 0,
      initialTareWeight: 0,
      typeId: '',
      modelId: '',
      commissioningDate: '',
      serialNumber: '',
      registrationNumber: '',
      registrationDate: '',
      registrarId: '',
      notes: '',
      vesselSerialNumber: '',
      vesselBuildDate: '',
    },
    mode: 'onChange',
  });

  // Заполняем форму данными цистерны при редактировании
  useEffect(() => {
    if (mode === 'edit' && cistern) {
      reset({
        number: cistern.number || '',
        manufacturerId: cistern.manufacturerId || '',
        buildDate: cistern.buildDate || '',
        tareWeight: cistern.tareWeight || 0,
        loadCapacity: cistern.loadCapacity || 0,
        length: cistern.length || 0,
        axleCount: cistern.axleCount || 4,
        volume: cistern.volume || 0,
        fillingVolume: cistern.fillingVolume || 0,
        initialTareWeight: cistern.initialTareWeight || 0,
        typeId: cistern.typeId || '',
        modelId: cistern.modelId || '',
        commissioningDate: cistern.commissioningDate || '',
        serialNumber: cistern.serialNumber || '',
        registrationNumber: cistern.registrationNumber || '',
        registrationDate: cistern.registrationDate || '',
        registrarId: cistern.registrarId || '',
        notes: cistern.notes || '',
        vesselSerialNumber: cistern.vessel?.vesselSerialNumber || '',
        vesselBuildDate: cistern.vessel?.vesselBuildDate || '',
      });
    } else if (mode === 'create') {
      reset({
        number: '',
        manufacturerId: '',
        buildDate: '',
        tareWeight: 0,
        loadCapacity: 0,
        length: 0,
        axleCount: 4,
        volume: 0,
        fillingVolume: 0,
        initialTareWeight: 0,
        typeId: '',
        modelId: '',
        commissioningDate: '',
        serialNumber: '',
        registrationNumber: '',
        registrationDate: '',
        registrarId: '',
        notes: '',
        vesselSerialNumber: '',
        vesselBuildDate: '',
      });
    }
  }, [mode, cistern, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      // Обработка данных перед отправкой
      const processedData = {
        ...data,
        // Преобразуем пустые строки в null для опциональных полей
        modelId: data.modelId?.trim() || undefined,
        commissioningDate: data.commissioningDate?.trim() || undefined,
        registrarId: data.registrarId?.trim() || undefined,
        notes: data.notes?.trim() || undefined,
        vesselSerialNumber: data.vesselSerialNumber?.trim() || undefined,
        vesselBuildDate: data.vesselBuildDate?.trim() || undefined,
        // Преобразуем числовые поля
        tareWeight: Number(data.tareWeight),
        loadCapacity: Number(data.loadCapacity),
        length: Number(data.length),
        axleCount: Number(data.axleCount),
        volume: Number(data.volume),
        fillingVolume: data.fillingVolume ? Number(data.fillingVolume) : undefined,
        initialTareWeight: data.initialTareWeight ? Number(data.initialTareWeight) : undefined,
      };

      if (mode === 'create') {
        await createMutation.mutateAsync(processedData);
        toast.success('Цистерна успешно создана');
      } else if (mode === 'edit' && cistern) {
        await updateMutation.mutateAsync({ 
          id: cistern.id, 
          data: processedData as UpdateRailwayCisternRequest 
        });
        toast.success('Цистерна успешно обновлена');
      }
      onOpenChange(false);
    } catch (error) {
      const message = mode === 'create' ? 'Ошибка при создании цистерны' : 'Ошибка при обновлении цистерны';
      toast.error(message);
      console.error(error);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Создать цистерну' : 'Редактировать цистерну'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Заполните форму для создания новой железнодорожной цистерны'
              : 'Внесите изменения в данные цистерны'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Номер цистерны *</label>
              <Input
                id="number"
                {...register('number', { 
                  required: 'Номер цистерны обязателен',
                  minLength: { value: 1, message: 'Минимум 1 символ' }
                })}
                placeholder="Введите номер цистерны"
                disabled={isLoading}
              />
              {errors.number && <p className="text-sm text-red-600">{errors.number.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Серийный номер *</label>
              <Input
                id="serialNumber"
                {...register('serialNumber', { 
                  required: 'Серийный номер обязателен' 
                })}
                placeholder="Введите серийный номер"
                disabled={isLoading}
              />
              {errors.serialNumber && <p className="text-sm text-red-600">{errors.serialNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="manufacturerId" className="block text-sm font-medium text-gray-700">ID производителя *</label>
              <Input
                id="manufacturerId"
                {...register('manufacturerId', { 
                  required: 'ID производителя обязателен' 
                })}
                placeholder="Введите ID производителя"
                disabled={isLoading}
              />
              {errors.manufacturerId && <p className="text-sm text-red-600">{errors.manufacturerId.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="typeId" className="block text-sm font-medium text-gray-700">ID типа *</label>
              <Input
                id="typeId"
                {...register('typeId', { 
                  required: 'ID типа обязателен' 
                })}
                placeholder="Введите ID типа"
                disabled={isLoading}
              />
              {errors.typeId && <p className="text-sm text-red-600">{errors.typeId.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="modelId" className="block text-sm font-medium text-gray-700">ID модели</label>
              <Input
                id="modelId"
                {...register('modelId')}
                placeholder="Введите ID модели (опционально)"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Регистрационный номер *</label>
              <Input
                id="registrationNumber"
                {...register('registrationNumber', { 
                  required: 'Регистрационный номер обязателен' 
                })}
                placeholder="Введите регистрационный номер"
                disabled={isLoading}
              />
              {errors.registrationNumber && <p className="text-sm text-red-600">{errors.registrationNumber.message}</p>}
            </div>
          </div>

          {/* Технические характеристики */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="tareWeight" className="block text-sm font-medium text-gray-700">Тара (т) *</label>
              <Input
                id="tareWeight"
                type="number"
                step="0.1"
                {...register('tareWeight', { 
                  required: 'Тара обязательна',
                  min: { value: 0, message: 'Значение не может быть отрицательным' }
                })}
                placeholder="0.0"
                disabled={isLoading}
              />
              {errors.tareWeight && <p className="text-sm text-red-600">{errors.tareWeight.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="loadCapacity" className="block text-sm font-medium text-gray-700">Грузоподъемность (т) *</label>
              <Input
                id="loadCapacity"
                type="number"
                step="0.1"
                {...register('loadCapacity', { 
                  required: 'Грузоподъемность обязательна',
                  min: { value: 0, message: 'Значение не может быть отрицательным' }
                })}
                placeholder="0.0"
                disabled={isLoading}
              />
              {errors.loadCapacity && <p className="text-sm text-red-600">{errors.loadCapacity.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Объем (м³) *</label>
              <Input
                id="volume"
                type="number"
                step="0.1"
                {...register('volume', { 
                  required: 'Объем обязателен',
                  min: { value: 0, message: 'Значение не может быть отрицательным' }
                })}
                placeholder="0.0"
                disabled={isLoading}
              />
              {errors.volume && <p className="text-sm text-red-600">{errors.volume.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="length" className="block text-sm font-medium text-gray-700">Длина (м) *</label>
              <Input
                id="length"
                type="number"
                step="0.1"
                {...register('length', { 
                  required: 'Длина обязательна',
                  min: { value: 0, message: 'Значение не может быть отрицательным' }
                })}
                placeholder="0.0"
                disabled={isLoading}
              />
              {errors.length && <p className="text-sm text-red-600">{errors.length.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="axleCount" className="block text-sm font-medium text-gray-700">Количество осей *</label>
              <Input
                id="axleCount"
                type="number"
                {...register('axleCount', { 
                  required: 'Количество осей обязательно',
                  min: { value: 1, message: 'Минимум 1 ось' }
                })}
                placeholder="4"
                disabled={isLoading}
              />
              {errors.axleCount && <p className="text-sm text-red-600">{errors.axleCount.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="fillingVolume" className="block text-sm font-medium text-gray-700">Объем заполнения (м³)</label>
              <Input
                id="fillingVolume"
                type="number"
                step="0.1"
                {...register('fillingVolume')}
                placeholder="0.0"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="initialTareWeight" className="block text-sm font-medium text-gray-700">Первоначальная тара (т)</label>
              <Input
                id="initialTareWeight"
                type="number"
                step="0.1"
                {...register('initialTareWeight')}
                placeholder="0.0"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Даты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="buildDate" className="block text-sm font-medium text-gray-700">Дата постройки *</label>
              <Input
                id="buildDate"
                type="date"
                {...register('buildDate', { 
                  required: 'Дата постройки обязательна' 
                })}
                disabled={isLoading}
              />
              {errors.buildDate && <p className="text-sm text-red-600">{errors.buildDate.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="commissioningDate" className="block text-sm font-medium text-gray-700">Дата ввода в эксплуатацию</label>
              <Input
                id="commissioningDate"
                type="date"
                {...register('commissioningDate')}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Дата регистрации *</label>
              <Input
                id="registrationDate"
                type="date"
                {...register('registrationDate', { 
                  required: 'Дата регистрации обязательна' 
                })}
                disabled={isLoading}
              />
              {errors.registrationDate && <p className="text-sm text-red-600">{errors.registrationDate.message}</p>}
            </div>
          </div>

          {/* Регистрационные данные */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="registrarId" className="block text-sm font-medium text-gray-700">ID регистратора</label>
              <Input
                id="registrarId"
                {...register('registrarId')}
                placeholder="Введите ID регистратора"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Информация о сосуде */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="vesselSerialNumber" className="block text-sm font-medium text-gray-700">Серийный номер сосуда</label>
              <Input
                id="vesselSerialNumber"
                {...register('vesselSerialNumber')}
                placeholder="Введите серийный номер сосуда"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vesselBuildDate" className="block text-sm font-medium text-gray-700">Дата изготовления сосуда</label>
              <Input
                id="vesselBuildDate"
                type="date"
                {...register('vesselBuildDate')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Примечания */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Примечания</label>
            <textarea
              id="notes"
              {...register('notes')}
              placeholder="Дополнительные примечания..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
