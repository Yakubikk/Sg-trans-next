"use client";

import { useEffect } from "react";
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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  usePartById,
  useDepotOptions,
  useStampNumberOptions,
  usePartStatusOptions,
  useUpdateWheelPair,
  useUpdateSideFrame,
  useUpdateBolster,
  useUpdateCoupler,
  useUpdateShockAbsorber,
} from "@/hooks/useDirectories";
import { toast } from "sonner";

// Общая схема для формы редактирования
const editPartSchema = z.object({
  depotId: z.string().optional(),
  stampNumberId: z.string().min(1, "Выберите номер клейма"),
  serialNumber: z.string().optional(),
  manufactureYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
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

type EditPartForm = z.infer<typeof editPartSchema>;

interface PartEditDialogProps {
  partId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartEditDialog({ partId, open, onOpenChange }: PartEditDialogProps) {
  const { data: part, isLoading: isLoadingPart } = usePartById(partId || "");
  const { data: depots } = useDepotOptions();
  const { data: stampNumbers } = useStampNumberOptions();
  const { data: partStatuses } = usePartStatusOptions();

  const updateWheelPair = useUpdateWheelPair();
  const updateSideFrame = useUpdateSideFrame();
  const updateBolster = useUpdateBolster();
  const updateCoupler = useUpdateCoupler();
  const updateShockAbsorber = useUpdateShockAbsorber();

  const form = useForm<EditPartForm>({
    resolver: zodResolver(editPartSchema),
    defaultValues: {
      depotId: "",
      stampNumberId: "",
      serialNumber: "",
      manufactureYear: undefined,
      currentLocation: "",
      statusId: "",
      notes: "",
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

  // Заполняем форму данными при загрузке детали
  useEffect(() => {
    if (part) {
      form.reset({
        depotId: part.depot?.id || "",
        stampNumberId: part.stampNumber.id,
        serialNumber: part.serialNumber || "",
        manufactureYear: part.manufactureYear || undefined,
        currentLocation: part.currentLocation || "",
        statusId: part.status.id,
        notes: part.notes || "",
        
        // Специфичные поля в зависимости от типа
        thicknessLeft: part.wheelPair?.thicknessLeft,
        thicknessRight: part.wheelPair?.thicknessRight,
        wheelType: part.wheelPair?.wheelType || "",
        
        serviceLifeYears: part.sideFrame?.serviceLifeYears || part.bolster?.serviceLifeYears,
        extendedUntil: part.sideFrame?.extendedUntil || part.bolster?.extendedUntil || "",
        
        model: part.shockAbsorber?.model || "",
        manufacturerCode: part.shockAbsorber?.manufacturerCode || "",
        nextRepairDate: part.shockAbsorber?.nextRepairDate || "",
      });
    }
  }, [part, form]);

  const onSubmit = async (data: EditPartForm) => {
    if (!part || !partId) return;

    try {
      const baseData = {
        depotId: data.depotId || undefined,
        stampNumberId: data.stampNumberId,
        serialNumber: data.serialNumber || undefined,
        manufactureYear: data.manufactureYear || undefined,
        currentLocation: data.currentLocation || undefined,
        statusId: data.statusId,
        notes: data.notes || undefined,
      };

      switch (part.partType.code) {
        case 1: // Колесная пара
          await updateWheelPair.mutateAsync({
            id: partId,
            data: {
              ...baseData,
              thicknessLeft: data.thicknessLeft,
              thicknessRight: data.thicknessRight,
              wheelType: data.wheelType,
            },
          });
          break;
        case 2: // Надрессорная балка
          await updateBolster.mutateAsync({
            id: partId,
            data: {
              ...baseData,
              serviceLifeYears: data.serviceLifeYears,
              extendedUntil: data.extendedUntil,
            },
          });
          break;
        case 3: // Боковая рама
          await updateSideFrame.mutateAsync({
            id: partId,
            data: {
              ...baseData,
              serviceLifeYears: data.serviceLifeYears,
              extendedUntil: data.extendedUntil,
            },
          });
          break;
        case 4: // Автосцепка
          await updateCoupler.mutateAsync({
            id: partId,
            data: baseData,
          });
          break;
        case 10: // Поглощающий аппарат
          await updateShockAbsorber.mutateAsync({
            id: partId,
            data: {
              ...baseData,
              model: data.model,
              manufacturerCode: data.manufacturerCode,
              nextRepairDate: data.nextRepairDate,
              serviceLifeYears: data.serviceLifeYears,
            },
          });
          break;
        default:
          toast.error("Неподдерживаемый тип детали");
          return;
      }

      toast.success("Деталь успешно обновлена");
      onOpenChange(false);
    } catch (error) {
      toast.error("Ошибка при обновлении детали");
      console.error(error);
    }
  };

  const renderSpecificFields = () => {
    if (!part) return null;

    switch (part.partType.code) {
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

  const isLoading = updateWheelPair.isPending || 
                   updateSideFrame.isPending || 
                   updateBolster.isPending || 
                   updateCoupler.isPending || 
                   updateShockAbsorber.isPending;

  if (isLoadingPart) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузка детали</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">Загрузка...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!part) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ошибка</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">Деталь не найдена</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактирование детали</DialogTitle>
          <DialogDescription>
            Редактирование {part.partType.name} (ID: {part.id})
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Тип детали (только для отображения) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип детали</label>
              <div className="px-3 py-2 border rounded-md bg-gray-50">
                {part.partType.name}
              </div>
            </div>

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
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Введите год"
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
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
