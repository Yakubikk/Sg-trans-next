"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { ArrowLeft, Save, Settings } from "lucide-react";
import Link from "next/link";
import {
  usePartTypeOptions,
  useStampNumberOptions,
  usePartStatusOptions,
  useCreateWheelPair,
  useCreateSideFrame,
  useCreateBolster,
  useCreateCoupler,
  useCreateShockAbsorber,
} from "@/hooks";
import { DepotSearchSelect } from "@/components/depots/DepotSearchSelect";
import {
  wheelPairSchema,
  sideFrameSchema,
  bolsterSchema,
  couplerSchema,
  shockAbsorberSchema,
  basePartSchema,
} from "@/schemas/parts.schema";
import type {
  CreateWheelPairDTO,
  CreateSideFrameDTO,
  CreateBolsterDTO,
  CreateCouplerDTO,
  CreateShockAbsorberDTO,
} from "@/types/directories";

export default function CreatePartPage() {
  const router = useRouter();

  // Mutations for different part types
  const createWheelPairMutation = useCreateWheelPair();
  const createSideFrameMutation = useCreateSideFrame();
  const createBolsterMutation = useCreateBolster();
  const createCouplerMutation = useCreateCoupler();
  const createShockAbsorberMutation = useCreateShockAbsorber();

  // Directory options
  const { data: partTypeOptions = [] } = usePartTypeOptions();
  const { data: stampNumberOptions = [] } = useStampNumberOptions();
  const { data: partStatusOptions = [] } = usePartStatusOptions();

  // Track selected part type for dynamic schema
  const [selectedPartTypeId, setSelectedPartTypeId] = useState("");

  // Find selected part type to determine which schema to use
  const selectedPartType = partTypeOptions.find((pt) => pt.value === selectedPartTypeId);
  const partTypeCode = selectedPartType
    ? parseInt(selectedPartType.label.match(/\[(\d+)\]/)?.[1] || "0")
    : 0;

  // Get appropriate schema based on part type
  const getSchema = () => {
    switch (partTypeCode) {
      case 1:
        return wheelPairSchema;
      case 2:
        return bolsterSchema;
      case 3:
        return sideFrameSchema;
      case 4:
        return couplerSchema;
      case 10:
        return shockAbsorberSchema;
      default:
        return basePartSchema;
    }
  };

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      partTypeId: "",
      stampNumberId: "",
      statusId: "",
      depotId: "",
      serialNumber: "",
      manufactureYear: "",
      currentLocation: "",
      notes: "",
    },
  });

  // Update schema when part type changes
  useEffect(() => {
    if (selectedPartTypeId) {
      // Reset form with new schema
      form.clearErrors();
    }
  }, [selectedPartTypeId, form]);

  const onSubmit = async (data: any) => {
    try {
      // Clean up empty strings to undefined
      const cleanData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ])
      );

      // Create appropriate part type based on selection
      switch (partTypeCode) {
        case 1: // Колесная пара
          await createWheelPairMutation.mutateAsync(cleanData as CreateWheelPairDTO);
          break;

        case 2: // Надрессорная балка
          await createBolsterMutation.mutateAsync(cleanData as CreateBolsterDTO);
          break;

        case 3: // Боковая рама
          await createSideFrameMutation.mutateAsync(cleanData as CreateSideFrameDTO);
          break;

        case 4: // Автосцепка
          await createCouplerMutation.mutateAsync(cleanData as CreateCouplerDTO);
          break;

        case 10: // Поглощающий аппарат
          await createShockAbsorberMutation.mutateAsync(cleanData as CreateShockAbsorberDTO);
          break;

        default:
          alert("Выберите тип детали");
          return;
      }

      router.push("/directories/parts");
    } catch (error) {
      console.error("Error creating part:", error);
      alert("Ошибка при создании детали");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/directories/parts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Settings className="h-8 w-8" />
              Добавить деталь
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Создание новой записи о детали
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information - Single Card Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Базовые данные о детали</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partTypeId">Тип детали *</Label>
                <Select value={partTypeId} onValueChange={setPartTypeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип детали" />
                  </SelectTrigger>
                  <SelectContent>
                    {partTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stampNumberId">Клеймо *</Label>
                <Select value={stampNumberId} onValueChange={setStampNumberId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите клеймо" />
                  </SelectTrigger>
                  <SelectContent>
                    {stampNumberOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="statusId">Статус *</Label>
                <Select value={statusId} onValueChange={setStatusId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    {partStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber">Заводской номер</Label>
                <Input
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Введите заводской номер"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufactureYear">Год производства</Label>
                <Input
                  id="manufactureYear"
                  value={manufactureYear}
                  onChange={(e) => setManufactureYear(e.target.value)}
                  placeholder="Введите год производства"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depotId">Депо</Label>
                <Select value={depotId} onValueChange={setDepotId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите депо" />
                  </SelectTrigger>
                  <SelectContent>
                    {depotOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLocation">Текущее местоположение</Label>
                <Input
                  id="currentLocation"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="Введите местоположение"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Примечания</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Введите примечания"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specific Fields Based on Part Type */}
        {partTypeCode > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Специфичные параметры</CardTitle>
              <CardDescription>
                Параметры для типа: {selectedPartType?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partTypeCode === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="thicknessLeft">Толщина (левая)</Label>
                      <Input
                        id="thicknessLeft"
                        type="number"
                        step="0.1"
                        value={thicknessLeft || ""}
                        onChange={(e) =>
                          setThicknessLeft(
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="Введите толщину левого колеса"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thicknessRight">Толщина (правая)</Label>
                      <Input
                        id="thicknessRight"
                        type="number"
                        step="0.1"
                        value={thicknessRight || ""}
                        onChange={(e) =>
                          setThicknessRight(
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="Введите толщину правого колеса"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wheelType">Тип колеса</Label>
                      <Input
                        id="wheelType"
                        value={wheelType}
                        onChange={(e) => setWheelType(e.target.value)}
                        placeholder="Введите тип колеса"
                      />
                    </div>
                  </>
                )}

                {(partTypeCode === 2 || partTypeCode === 3) && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="serviceLifeYears">Срок службы (лет)</Label>
                      <Input
                        id="serviceLifeYears"
                        type="number"
                        value={serviceLifeYears || ""}
                        onChange={(e) =>
                          setServiceLifeYears(
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        placeholder="Введите срок службы"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="extendedUntil">Продлен до</Label>
                      <Input
                        id="extendedUntil"
                        type="date"
                        value={extendedUntil}
                        onChange={(e) => setExtendedUntil(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {partTypeCode === 4 && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Автосцепка не имеет дополнительных параметров
                    </p>
                  </div>
                )}

                {partTypeCode === 10 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="model">Модель</Label>
                      <Input
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Введите модель"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manufacturerCode">Код производителя</Label>
                      <Input
                        id="manufacturerCode"
                        value={manufacturerCode}
                        onChange={(e) => setManufacturerCode(e.target.value)}
                        placeholder="Введите код производителя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceLifeYears">Срок службы (лет)</Label>
                      <Input
                        id="serviceLifeYears"
                        type="number"
                        value={serviceLifeYears || ""}
                        onChange={(e) =>
                          setServiceLifeYears(
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        placeholder="Введите срок службы"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextRepairDate">Дата следующего ремонта</Label>
                      <Input
                        id="nextRepairDate"
                        type="date"
                        value={nextRepairDate}
                        onChange={(e) => setNextRepairDate(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/directories/parts">
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={
              createWheelPairMutation.isPending ||
              createSideFrameMutation.isPending ||
              createBolsterMutation.isPending ||
              createCouplerMutation.isPending ||
              createShockAbsorberMutation.isPending
            }
          >
            <Save className="h-4 w-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
