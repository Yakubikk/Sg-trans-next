"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Input } from "@/components/ui";
import {
  useManufacturers,
  useOwners,
  useWagonTypes,
  useWagonModels,
  useAffiliations,
  useRegistrars,
} from "@/hooks/references";
import { railwayCisternsApi, railwayCisternsKeys, CreateRailwayCisternDetailedRequest } from "@/api/references";
import { Loader2 } from "lucide-react";

interface AddCisternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const defaultValues: FormData = {
  number: "",
  manufacturerId: "",
  buildDate: "",
  tareWeight: "",
  loadCapacity: "",
  length: "",
  axleCount: "",
  volume: "",
  fillingVolume: "",
  initialTareWeight: "",
  typeId: "",
  modelId: "",
  commissioningDate: "",
  serialNumber: "",
  registrationNumber: "",
  registrationDate: "",
  registrarId: "",
  notes: "",
  ownerId: "",
  techConditions: "",
  pripiska: "",
  reRegistrationDate: "",
  pressure: "",
  testPressure: "",
  rent: "",
  affiliationId: "",
  serviceLifeYears: "",
  periodMajorRepair: "",
  periodPeriodicTest: "",
  periodIntermediateTest: "",
  periodDepotRepair: "",
  dangerClass: "",
  substance: "",
};

export function AddCisternDialog({ open, onOpenChange }: AddCisternDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Инициализируем react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues,
  });

  // Загружаем справочные данные
  const { data: manufacturers = [], isLoading: loadingManufacturers } = useManufacturers();
  const { data: owners = [], isLoading: loadingOwners } = useOwners();
  const { data: wagonTypes = [], isLoading: loadingWagonTypes } = useWagonTypes();
  const { data: wagonModels = [], isLoading: loadingWagonModels } = useWagonModels();
  const { data: affiliations = [], isLoading: loadingAffiliations } = useAffiliations();
  const { data: registrars = [], isLoading: loadingRegistrars } = useRegistrars();

  const createMutation = useMutation({
    mutationFn: (data: CreateRailwayCisternDetailedRequest) => railwayCisternsApi.createRailwayCisternDetailed(data),
    onSuccess: (response) => {
      // Обновляем кэш
      queryClient.invalidateQueries({ queryKey: railwayCisternsKeys.all });

      // Сбрасываем форму
      reset();

      // Закрываем диалог
      onOpenChange(false);

      // Переходим на страницу паспорта созданной цистерны
      if (response.data?.number) {
        router.push(`/cistern-passports?search=${encodeURIComponent(response.data.number)}`);
      }
    },
    onError: (error) => {
      console.error("Ошибка создания цистерны:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    // Подготавливаем данные для отправки
    const requestData: CreateRailwayCisternDetailedRequest = {
      number: data.number,
      manufacturerId: data.manufacturerId,
      buildDate: data.buildDate || new Date().toISOString().split("T")[0],
      typeId: data.typeId,
      modelId: data.modelId || data.typeId, // fallback если модель не выбрана
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

    createMutation.mutate(requestData);
  };

  const isLoading =
    loadingManufacturers ||
    loadingOwners ||
    loadingWagonTypes ||
    loadingWagonModels ||
    loadingAffiliations ||
    loadingRegistrars ||
    createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-2/3 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить новую цистерну</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Номер цистерны *</label>
              <Input
                {...register("number", {
                  required: "Номер цистерны обязателен",
                })}
                placeholder="Введите номер цистерны"
              />
              {errors.number && <p className="text-sm text-red-600">{errors.number.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Производитель *</label>
              <select
                {...register("manufacturerId", {
                  required: "Производитель обязателен",
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
              {errors.manufacturerId && <p className="text-sm text-red-600">{errors.manufacturerId.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Дата производства</label>
              <Input type="date" {...register("buildDate")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип вагона *</label>
              <select
                {...register("typeId", {
                  required: "Тип вагона обязателен",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите тип</option>
                {wagonTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.typeId && <p className="text-sm text-red-600">{errors.typeId.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Модель</label>
              <select
                {...register("modelId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите модель</option>
                {wagonModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Владелец *</label>
              <select
                {...register("ownerId", {
                  required: "Владелец обязателен",
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
              {errors.ownerId && <p className="text-sm text-red-600">{errors.ownerId.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Принадлежность *</label>
              <select
                {...register("affiliationId", {
                  required: "Принадлежность обязательна",
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
              {errors.affiliationId && <p className="text-sm text-red-600">{errors.affiliationId.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Регистратор</label>
              <select
                {...register("registrarId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите регистратора</option>
                {registrars.map((registrar) => (
                  <option key={registrar.id} value={registrar.id}>
                    {registrar.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Технические характеристики */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Технические характеристики</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Тара (кг)</label>
                <Input
                  type="number"
                  {...register("tareWeight", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Значение должно быть положительным" },
                  })}
                  placeholder="0"
                />
                {errors.tareWeight && <p className="text-sm text-red-600">{errors.tareWeight.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Грузоподъемность (кг)</label>
                <Input
                  type="number"
                  {...register("loadCapacity", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Значение должно быть положительным" },
                  })}
                  placeholder="0"
                />
                {errors.loadCapacity && <p className="text-sm text-red-600">{errors.loadCapacity.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Длина (м)</label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("length", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Значение должно быть положительным" },
                  })}
                  placeholder="0"
                />
                {errors.length && <p className="text-sm text-red-600">{errors.length.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Количество осей</label>
                <Input
                  type="number"
                  {...register("axleCount", {
                    valueAsNumber: true,
                    min: { value: 1, message: "Минимум 1 ось" },
                  })}
                  placeholder="0"
                />
                {errors.axleCount && <p className="text-sm text-red-600">{errors.axleCount.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Объем (л)</label>
                <Input
                  type="number"
                  {...register("volume", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Значение должно быть положительным" },
                  })}
                  placeholder="0"
                />
                {errors.volume && <p className="text-sm text-red-600">{errors.volume.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Объем наполнения (л)</label>
                <Input
                  type="number"
                  {...register("fillingVolume", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Значение должно быть положительным" },
                  })}
                  placeholder="0"
                />
                {errors.fillingVolume && <p className="text-sm text-red-600">{errors.fillingVolume.message}</p>}
              </div>
            </div>
          </div>

          {/* Регистрационные данные */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Регистрационные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Регистрационный номер</label>
                <Input {...register("registrationNumber")} placeholder="Введите регистрационный номер" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Дата регистрации</label>
                <Input type="date" {...register("registrationDate")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Серийный номер</label>
                <Input {...register("serialNumber")} placeholder="Введите серийный номер" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Дата ввода в эксплуатацию</label>
                <Input type="date" {...register("commissioningDate")} />
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Дополнительная информация</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Примечания</label>
                <textarea
                  {...register("notes")}
                  placeholder="Введите примечания"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Приписка</label>
                  <Input {...register("pripiska")} placeholder="Введите приписку" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Класс опасности</label>
                  <Input
                    type="number"
                    {...register("dangerClass", {
                      valueAsNumber: true,
                      min: { value: 0, message: "Значение должно быть положительным" },
                    })}
                    placeholder="0"
                  />
                  {errors.dangerClass && <p className="text-sm text-red-600">{errors.dangerClass.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Вещество</label>
                  <Input {...register("substance")} placeholder="Введите вещество" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Срок службы (лет)</label>
                  <Input
                    type="number"
                    {...register("serviceLifeYears", {
                      valueAsNumber: true,
                      min: { value: 1, message: "Минимум 1 год" },
                    })}
                    placeholder="0"
                  />
                  {errors.serviceLifeYears && <p className="text-sm text-red-600">{errors.serviceLifeYears.message}</p>}
                </div>
              </div>
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
              disabled={createMutation.isPending}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {createMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Создание...
                </>
              ) : (
                "Создать цистерну"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
