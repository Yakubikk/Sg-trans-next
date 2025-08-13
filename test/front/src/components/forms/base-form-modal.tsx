'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const baseSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
});

type BaseFormData = z.infer<typeof baseSchema>;

interface BaseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BaseFormData) => Promise<void>;
  title: string;
  description?: string;
  initialData?: Partial<BaseFormData>;
  isLoading?: boolean;
}

export function BaseFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  initialData,
  isLoading = false,
}: BaseFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaseFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: BaseFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(initialData ? 'Запись обновлена' : 'Запись создана');
      reset();
      onClose();
    } catch {
      toast.error('Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название *</Label>
            <Input
              id="name"
              {...register('name')}
              disabled={isSubmitting || isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              rows={3}
              {...register('description')}
              disabled={isSubmitting || isLoading}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? 'Обновить' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
