"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, RailwayCisternCard, RailwayCisternDialog } from "@/components";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from "@/components/ui";
import { useRailwayCisternByNumber, useDeleteRailwayCistern } from "@/hooks";
import { Train, ClipboardList, Wrench, MapPin, FileText, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import type { RailwayCisternDetail } from "@/api/references";

interface SearchForm {
  wagonNumber: string;
}

type DialogMode = 'create' | 'edit';

export default function WagonPassportSearch() {
  const searchParams = useSearchParams();
  const [searchNumber, setSearchNumber] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('create');
  const [selectedCistern, setSelectedCistern] = useState<RailwayCisternDetail | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cisternToDelete, setCisternToDelete] = useState<RailwayCisternDetail | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<SearchForm>({
    defaultValues: {
      wagonNumber: "",
    },
    mode: "onChange",
  });

  const wagonNumber = watch("wagonNumber");

  const { data: cistern, isLoading, error, isError, refetch } = useRailwayCisternByNumber(searchNumber);
  const deleteMutation = useDeleteRailwayCistern();

  // Автоматический поиск при загрузке страницы с параметром search
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setValue('wagonNumber', searchParam);
      setSearchNumber(searchParam);
    }
  }, [searchParams, setValue]);

  const onSubmit = () => {
    const trimmedNumber = wagonNumber?.trim();
    if (trimmedNumber && isValid) {
      setSearchNumber(trimmedNumber);
    }
  };

  const handleClear = () => {
    reset();
    setSearchNumber("");
    toast.success("Поиск очищен");
  };

  const handleCreateCistern = () => {
    setDialogMode('create');
    setSelectedCistern(undefined);
    setDialogOpen(true);
  };

  const handleEditCistern = (cistern: RailwayCisternDetail) => {
    setDialogMode('edit');
    setSelectedCistern(cistern);
    setDialogOpen(true);
  };

  const handleDeleteCistern = (cistern: RailwayCisternDetail) => {
    setCisternToDelete(cistern);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCistern = async () => {
    if (!cisternToDelete) return;
    
    try {
      await deleteMutation.mutateAsync(cisternToDelete.id);
      toast.success('Цистерна успешно удалена');
      setSearchNumber("");
      reset();
      setDeleteDialogOpen(false);
      setCisternToDelete(null);
    } catch (error) {
      toast.error('Ошибка при удалении цистерны');
      console.error(error);
    }
  };

  const cancelDeleteCistern = () => {
    setDeleteDialogOpen(false);
    setCisternToDelete(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (searchNumber) {
      refetch(); // Обновляем данные после изменений
    }
  };

  // Автоматический поиск при нажатии Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && wagonNumber?.trim() && isValid) {
        e.preventDefault();
        const trimmedNumber = wagonNumber.trim();
        setSearchNumber(trimmedNumber);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [wagonNumber, isValid]);

  // Показываем toast при ошибках
  useEffect(() => {
    if (isError && error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("404") || errorMessage.includes("Not Found")) {
        toast.error("Цистерна с указанным номером не найдена");
      } else {
        toast.error("Ошибка при поиске вагона");
      }
    }
  }, [isError, error]);

  // Показываем toast при успешном поиске
  useEffect(() => {
    if (cistern && searchNumber) {
      toast.success(`Найдена цистерна: ${searchNumber}`);
    }
  }, [cistern, searchNumber]);

  return (
    <>
      {/* Поиск вагона */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Поиск вагона</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                {/* <label htmlFor="wagonNumber" className="block text-sm font-medium text-gray-700">
                  Номер вагона
                </label> */}
                <Input
                  id="wagonNumber"
                  type="text"
                  {...register("wagonNumber", {
                    required: "Введите номер вагона",
                    minLength: {
                      value: 2,
                      message: "Номер вагона должен содержать минимум 2 символа",
                    },
                    maxLength: {
                      value: 20,
                      message: "Номер вагона не может быть длиннее 20 символов",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\-_\s]+$/,
                      message: "Номер может содержать только буквы, цифры, дефисы, подчеркивания и пробелы",
                    },
                    validate: {
                      notOnlySpaces: (value) => {
                        return value?.trim().length > 0 || "Номер не может состоять только из пробелов";
                      },
                    },
                  })}
                  placeholder="Введите номер вагона"
                  disabled={isLoading}
                  aria-invalid={!!errors.wagonNumber}
                />
                {errors.wagonNumber && <p className="text-sm text-red-600">{errors.wagonNumber.message}</p>}
              </div>
              <div className="flex gap-2 flex-col justify-end">
                <Button type="submit" disabled={isLoading || !isValid || !wagonNumber?.trim()} size="lg">
                  {isLoading ? "Поиск..." : "Показать"}
                </Button>
                {(cistern || searchNumber) && (
                  <Button type="button" variant="outline" size="lg" onClick={handleClear}>
                    Очистить
                  </Button>
                )}
              </div>
            </div>

            {/* Индикатор поиска */}
            {searchNumber && !cistern && !isError && isLoading && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-600">Выполняется поиск...</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Карточка вагона */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Паспортные данные</CardTitle>
            <div className="flex items-center gap-3">
              {cistern && searchNumber && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Найдено: {searchNumber}
                </span>
              )}
              
              {/* Кнопки управления */}
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateCistern}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Создать
                </Button>
                
                {cistern && (
                  <>
                    <Button
                      onClick={() => handleEditCistern(cistern)}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Редактировать
                    </Button>
                    
                    <Button
                      onClick={() => handleDeleteCistern(cistern)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {cistern ? (
            <RailwayCisternCard cistern={cistern} />
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400">
                <Train className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Данные вагона не загружены</h3>
                <p className="text-gray-500">
                  Введите номер вагона и нажмите кнопку &quot;Показать&quot; для отображения паспортных данных
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {cistern && (
        <Card className="my-8">
          <CardHeader>
            <CardTitle>Дополнительная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Link href={`/wagon-passports/${encodeURIComponent(searchNumber)}/complectation-list`}>
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white flex items-center gap-2"
                  size="lg"
                >
                  <ClipboardList className="w-5 h-5" />
                  Лист комплектации
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(searchNumber)}/repair-history`}>
                <Button
                  variant="outline"
                  className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white flex items-center gap-2"
                  size="lg"
                >
                  <Wrench className="w-5 h-5" />
                  Сведения о ремонтах
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(searchNumber)}/wagon-location`}>
                <Button
                  variant="outline"
                  className="bg-green-600 text-white hover:bg-green-700 hover:text-white flex items-center gap-2"
                  size="lg"
                >
                  <MapPin className="w-5 h-5" />
                  Локализация вагона
                </Button>
              </Link>
              <Link href={`/wagon-passports/${encodeURIComponent(searchNumber)}/wagon-change-log`}>
                <Button variant="outline" className="bg-red-600 text-white hover:bg-red-700 hover:text-white flex items-center gap-2" size="lg">
                  <FileText className="w-5 h-5" />
                  Журнал изменений
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Диалог создания/редактирования цистерны */}
      <RailwayCisternDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        mode={dialogMode}
        cistern={selectedCistern}
      />

      {/* Диалог подтверждения удаления */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить цистерну <strong>{cisternToDelete?.number}</strong>?
              <br />
              Это действие необратимо и все данные цистерны будут удалены.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteCistern}>
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCistern}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
