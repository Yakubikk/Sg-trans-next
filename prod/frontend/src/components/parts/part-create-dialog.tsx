"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Textarea,
  Button
} from "@/components/ui";
import { Plus } from "lucide-react";
import { 
  usePartTypeOptions,
  usePartTypes,
  useDepotOptions,
  useStampNumberOptions,
  usePartStatusOptions,
  useCreateWheelPair,
  useCreateSideFrame,
  useCreateBolster,
  useCreateCoupler,
  useCreateShockAbsorber,
} from "@/hooks";
import { toast } from "sonner";
import type { PartTypeDTO } from "@/types/directories";

// Общая схема для формы, включающая все возможные поля
const allFieldsSchema = z.object({
  // Базовые поля
  partTypeId: z.string().min(1, "Выберите тип детали"),
  depotId: z.string().optional(),
  stampNumberId: z.string().min(1, "Выберите номер клейма"),
  serialNumber: z.string().optional(),
  manufactureYear: z.string().min(4).max(4).optional(),
  currentLocation: z.string().optional(),
  statusId: z.string().min(1, "Выберите статус"),
  notes: z.string().optional(),
  
  // Поля для колесной пары
  thicknessLeft: z.number().min(0).optional(),
  thicknessRight: z.number().min(0).optional(),
  wheelType: z.string().optional(),
  
  // Поля для боковой рамы и надрессорной балки
  serviceLifeYears: z.number().min(0).optional(),
  extendedUntil: z.string().optional(),
  
  // Поля для поглощающего аппарата
  model: z.string().optional(),
  manufacturerCode: z.string().optional(),
  nextRepairDate: z.string().optional(),
});

type AllFieldsForm = z.infer<typeof allFieldsSchema>;

interface PartCreateDialogProps {
  trigger?: React.ReactNode;
}

export function PartCreateDialog({ trigger }: PartCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedPartType, setSelectedPartType] = useState<PartTypeDTO | null>(null);

  const { data: partTypes } = usePartTypeOptions();
  const { data: depots } = useDepotOptions();
  const { data: stampNumbers } = useStampNumberOptions();
  const { data: partStatuses } = usePartStatusOptions();
  
  // Получаем полные данные типов деталей
  const { data: fullPartTypes } = usePartTypes();

  const createWheelPair = useCreateWheelPair();
  const createSideFrame = useCreateSideFrame();
  const createBolster = useCreateBolster();
  const createCoupler = useCreateCoupler();
  const createShockAbsorber = useCreateShockAbsorber();

  // Определяем схему валидации на основе выбранного типа детали
  const getValidationSchema = () => {
    // Используем общую схему для всех полей
    return allFieldsSchema;
  };

  const form = useForm<AllFieldsForm>({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: {
      partTypeId: "",
      depotId: "",
      stampNumberId: "",
      serialNumber: "",
      manufactureYear: undefined,
      currentLocation: "",
      statusId: "",
      notes: "",
      // Дополнительные поля для специализированных типов
      thicknessLeft: undefined,
      thicknessRight: undefined,
      wheelType: "",
      serviceLifeYears: undefined,
      extendedUntil: "",
      model: "",
      manufacturerCode: "",
      nextRepairDate: "",
    },
  });

  const handlePartTypeChange = (partTypeId: string) => {
    const partType = fullPartTypes?.find(pt => pt.id === partTypeId);
    setSelectedPartType(partType || null);
  };

  const onSubmit = async (data: AllFieldsForm) => {
    try {
      if (!selectedPartType) {
        toast.error("Выберите тип детали");
        return;
      }

      const baseData = {
        partTypeId: data.partTypeId,
        depotId: data.depotId || undefined,
        stampNumberId: data.stampNumberId,
        serialNumber: data.serialNumber || undefined,
        manufactureYear: data.manufactureYear + '-01-01' || undefined,
        currentLocation: data.currentLocation || undefined,
        statusId: data.statusId,
        notes: data.notes || undefined,
      };

      switch (selectedPartType.code) {
        case 1: // Колесная пара
          await createWheelPair.mutateAsync({
            ...baseData,
            thicknessLeft: data.thicknessLeft,
            thicknessRight: data.thicknessRight,
            wheelType: data.wheelType,
          });
          break;
        case 2: // Надрессорная балка
          await createBolster.mutateAsync({
            ...baseData,
            serviceLifeYears: data.serviceLifeYears,
            extendedUntil: data.extendedUntil,
          });
          break;
        case 3: // Боковая рама
          await createSideFrame.mutateAsync({
            ...baseData,
            serviceLifeYears: data.serviceLifeYears,
            extendedUntil: data.extendedUntil,
          });
          break;
        case 4: // Автосцепка
          await createCoupler.mutateAsync(baseData);
          break;
        case 10: // Поглощающий аппарат
          await createShockAbsorber.mutateAsync({
            ...baseData,
            model: data.model,
            manufacturerCode: data.manufacturerCode,
            nextRepairDate: data.nextRepairDate,
            serviceLifeYears: data.serviceLifeYears,
          });
          break;
        default:
          toast.error("Неподдерживаемый тип детали");
          return;
      }

      toast.success("Деталь успешно создана");
      setOpen(false);
      form.reset();
      setSelectedPartType(null);
    } catch (error) {
      toast.error("Ошибка при создании детали");
      console.error(error);
    }
  };

  const renderSpecificFields = () => {
    if (!selectedPartType) return null;

    switch (selectedPartType.code) {
      case 1: // Колесная пара
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="thicknessLeft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Толщина левого колеса</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Введите толщину"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thicknessRight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Толщина правого колеса</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Введите толщину"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="wheelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип колеса</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите тип колеса"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case 2: // Надрессорная балка
      case 3: // Боковая рама
        return (
          <>
            <FormField
              control={form.control}
              name="serviceLifeYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Срок службы (лет)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Введите срок службы"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extendedUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Продлен до</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case 10: // Поглощающий аппарат
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Модель</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите модель"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturerCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код производителя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите код"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nextRepairDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата следующего ремонта</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceLifeYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Срок службы (лет)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Введите срок службы"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const isLoading = createWheelPair.isPending || 
                   createSideFrame.isPending || 
                   createBolster.isPending || 
                   createCoupler.isPending || 
                   createShockAbsorber.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить деталь
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создание новой детали</DialogTitle>
          <DialogDescription>
            Заполните информацию о новой детали. Поля будут изменяться в зависимости от выбранного типа детали.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Общие поля */}
            <FormField
              control={form.control}
              name="partTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип детали *</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePartTypeChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип детали" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {partTypes?.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stampNumberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер клейма *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите клеймо" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stampNumbers?.map((stamp) => (
                          <SelectItem key={stamp.value} value={stamp.value}>
                            {stamp.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statusId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partStatuses?.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Серийный номер</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите серийный номер"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufactureYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Год производства</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        minLength={4}
                        maxLength={4}
                        placeholder="Введите год"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? e.target.value : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="depotId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Депо</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите депо" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {depots?.map((depot) => (
                          <SelectItem key={depot.value} value={depot.value}>
                            {depot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Текущее местоположение</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите местоположение"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Специфичные поля в зависимости от типа детали */}
            {renderSpecificFields()}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Примечания</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите примечания"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Создание..." : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
