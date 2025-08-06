"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from "@/components/ui";
import { 
  useManufacturers, 
  useOwners, 
  useAffiliations,
  useRailwayCisternDetailedById 
} from "@/hooks/references";
import { railwayCisternsApi, railwayCisternsKeys, RailwayCistern, UpdateRailwayCisternRequest } from "@/api/references";
import { Loader2 } from "lucide-react";

interface EditCisternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cistern: RailwayCistern | null;
}

interface FormData {
  number: string;
  manufacturerId: string;
  buildDate: string;
  tareWeight: number | "";
  loadCapacity: number | "";
  length: number | "";
  axleCount: number | "";
  volume: number | "";
  fillingVolume: number | "";
  initialTareWeight: number | "";
  typeId: string;
  modelId: string;
  commissioningDate: string;
  serialNumber: string;
  registrationNumber: string;
  registrationDate: string;
  registrarId: string;
  notes: string;
  ownerId: string;
  techConditions: string;
  pripiska: string;
  reRegistrationDate: string;
  pressure: number | "";
  testPressure: number | "";
  rent: string;
  affiliationId: string;
  serviceLifeYears: number | "";
  periodMajorRepair: string;
  periodPeriodicTest: string;
  periodIntermediateTest: string;
  periodDepotRepair: string;
  dangerClass: number | "";
  substance: string;
}

export function EditCisternDialog({ open, onOpenChange, cistern }: EditCisternDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Загружаемые справочные данные
  const { data: manufacturers = [], isLoading: loadingManufacturers } = useManufacturers();
  const { data: owners = [], isLoading: loadingOwners } = useOwners();
  const { data: affiliations = [], isLoading: loadingAffiliations } = useAffiliations();

  // Загружаем детальные данные цистерны для редактирования
  const { data: detailedCistern, isLoading: loadingDetails } = useRailwayCisternDetailedById(
    cistern?.id || ""
  );

  // Инициализируем react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // Заполняем форму данными при получении детальной информации
  useEffect(() => {
    if (detailedCistern && open) {
      const formData: FormData = {
        number: detailedCistern.number || "",
        manufacturerId: detailedCistern.manufacturer?.id || "",
        buildDate: detailedCistern.buildDate ? detailedCistern.buildDate.split('T')[0] : "",
        tareWeight: detailedCistern.tareWeight || "",
        loadCapacity: detailedCistern.loadCapacity || "",
        length: detailedCistern.length || "",
        axleCount: detailedCistern.axleCount || "",
        volume: detailedCistern.volume || "",
        fillingVolume: detailedCistern.fillingVolume || "",
        initialTareWeight: detailedCistern.initialTareWeight || "",
        typeId: detailedCistern.type?.id || "",
        modelId: detailedCistern.model?.id || "",
        commissioningDate: detailedCistern.commissioningDate ? detailedCistern.commissioningDate.split('T')[0] : "",
        serialNumber: detailedCistern.serialNumber || "",
        registrationNumber: detailedCistern.registrationNumber || "",
        registrationDate: detailedCistern.registrationDate ? detailedCistern.registrationDate.split('T')[0] : "",
        registrarId: detailedCistern.registrar?.id || "",
        notes: detailedCistern.notes || "",
        ownerId: detailedCistern.owner?.id || "",
        techConditions: detailedCistern.techConditions || "",
        pripiska: detailedCistern.pripiska || "",
        reRegistrationDate: detailedCistern.reRegistrationDate ? detailedCistern.reRegistrationDate.split('T')[0] : "",
        pressure: detailedCistern.pressure || "",
        testPressure: detailedCistern.testPressure || "",
        rent: detailedCistern.rent || "",
        affiliationId: detailedCistern.affiliation?.id || "",
        serviceLifeYears: detailedCistern.serviceLifeYears || "",
        periodMajorRepair: detailedCistern.periodMajorRepair ? detailedCistern.periodMajorRepair.split('T')[0] : "",
        periodPeriodicTest: detailedCistern.periodPeriodicTest ? detailedCistern.periodPeriodicTest.split('T')[0] : "",
        periodIntermediateTest: detailedCistern.periodIntermediateTest ? detailedCistern.periodIntermediateTest.split('T')[0] : "",
        periodDepotRepair: detailedCistern.periodDepotRepair ? detailedCistern.periodDepotRepair.split('T')[0] : "",
        dangerClass: detailedCistern.dangerClass || "",
        substance: detailedCistern.substance || "",
      };
      reset(formData);
    }
  }, [detailedCistern, open, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRailwayCisternRequest }) => 
      railwayCisternsApi.updateRailwayCistern(id, data),
    onSuccess: (response) => {
      // Обновляем кэш
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.all });
      
      // Сбрасываем форму
      reset();
      
      // Закрываем диалог
      onOpenChange(false);
      
      // Переходим на страницу паспорта обновленной цистерны
      if (response.data?.number) {
        router.push(`/cistern-passports?search=${encodeURIComponent(response.data.number)}`);
      }
    },
    onError: (error) => {
      console.error("Ошибка обновления цистерны:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    if (!cistern?.id) return;

    // Подготавливаем данные для отправки (аналогично созданию, но для обновления)
    const requestData = {
      number: data.number,
      manufacturerId: data.manufacturerId,
      buildDate: data.buildDate || new Date().toISOString().split('T')[0],
      typeId: data.typeId,
      modelId: data.modelId || data.typeId,
      ownerId: data.ownerId,
      affiliationId: data.affiliationId,
      // Опциональные поля
      ...(data.tareWeight && { tareWeight: Number(data.tareWeight) }),
      ...(data.loadCapacity && { loadCapacity: Number(data.loadCapacity) }),
      ...(data.length && { length: Number(data.length) }),
      ...(data.axleCount && { axleCount: Number(data.axleCount) }),
      ...(data.volume && { volume: Number(data.volume) }),
      ...(data.fillingVolume && { fillingVolume: Number(data.fillingVolume) }),
      ...(data.initialTareWeight && { initialTareWeight: Number(data.initialTareWeight) }),
      ...(data.commissioningDate && { commissioningDate: data.commissioningDate }),
      ...(data.serialNumber && { serialNumber: data.serialNumber }),
      ...(data.registrationNumber && { registrationNumber: data.registrationNumber }),
      ...(data.registrationDate && { registrationDate: data.registrationDate }),
      ...(data.registrarId && { registrarId: data.registrarId }),
      ...(data.notes && { notes: data.notes }),
      ...(data.techConditions && { techConditions: data.techConditions }),
      ...(data.pripiska && { pripiska: data.pripiska }),
      ...(data.reRegistrationDate && { reRegistrationDate: data.reRegistrationDate }),
      ...(data.pressure && { pressure: Number(data.pressure) }),
      ...(data.testPressure && { testPressure: Number(data.testPressure) }),
      ...(data.rent && { rent: data.rent }),
      ...(data.serviceLifeYears && { serviceLifeYears: Number(data.serviceLifeYears) }),
      ...(data.periodMajorRepair && { periodMajorRepair: data.periodMajorRepair }),
      ...(data.periodPeriodicTest && { periodPeriodicTest: data.periodPeriodicTest }),
      ...(data.periodIntermediateTest && { periodIntermediateTest: data.periodIntermediateTest }),
      ...(data.periodDepotRepair && { periodDepotRepair: data.periodDepotRepair }),
      ...(data.dangerClass && { dangerClass: Number(data.dangerClass) }),
      ...(data.substance && { substance: data.substance }),
    };

    updateMutation.mutate({ id: cistern.id, data: requestData });
  };

  const isLoading = loadingManufacturers || loadingOwners || loadingAffiliations || 
                   loadingDetails || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Редактировать цистерну {cistern?.number}
          </DialogTitle>
        </DialogHeader>
        
        {loadingDetails ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Загрузка данных...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Номер цистерны *</label>
                <Input
                  {...register("number", { 
                    required: "Номер цистерны обязателен" 
                  })}
                  placeholder="Введите номер цистерны"
                />
                {errors.number && (
                  <p className="text-sm text-red-600">{errors.number.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Производитель *</label>
                <select
                  {...register("manufacturerId", { 
                    required: "Производитель обязателен" 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Выберите производителя</option>
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
                {errors.manufacturerId && (
                  <p className="text-sm text-red-600">{errors.manufacturerId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Владелец *</label>
                <select
                  {...register("ownerId", { 
                    required: "Владелец обязателен" 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Выберите владельца</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
                {errors.ownerId && (
                  <p className="text-sm text-red-600">{errors.ownerId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Принадлежность *</label>
                <select
                  {...register("affiliationId", { 
                    required: "Принадлежность обязательна" 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Выберите принадлежность</option>
                  {affiliations.map((affiliation) => (
                    <option key={affiliation.id} value={affiliation.id}>
                      {affiliation.value}
                    </option>
                  ))}
                </select>
                {errors.affiliationId && (
                  <p className="text-sm text-red-600">{errors.affiliationId.message}</p>
                )}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                disabled={updateMutation.isPending}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isSubmitting}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Сохранение...
                  </>
                ) : (
                  "Сохранить изменения"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
