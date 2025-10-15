"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Skeleton,
  Badge,
} from "@/components/ui";
import { ArrowLeft, History, MapPin, Calendar, FileText, Wrench, Building2 } from "lucide-react";
import { usePartById, usePartInstallationHistory } from "@/hooks";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { PartEquipmentDTO } from "@/types/directories";

export default function PartHistoryPage() {
  const params = useParams();
  const partId = params.id as string;

  const { data: part, isLoading: isLoadingPart } = usePartById(partId);
  const { data: equipments = [], isLoading: isLoadingHistory, error } = usePartInstallationHistory(partId);

  const formatDate = (dateString?: string | { year: number; month: number; day: number }) => {
    if (!dateString) return "—";
    try {
      if (typeof dateString === 'string') {
        return format(new Date(dateString), "dd MMMM yyyy", { locale: ru });
      } else {
        // DateOnly format
        return format(new Date(dateString.year, dateString.month - 1, dateString.day), "dd MMMM yyyy", { locale: ru });
      }
    } catch {
      return String(dateString);
    }
  };

  if (isLoadingPart || isLoadingHistory) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !part) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Ошибка</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Произошла ошибка при загрузке истории установок</p>
          <Link href="/directories/parts">
            <Button className="mt-4" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку деталей
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Группируем историю: текущая установка и архив
  const currentInstallation = installations.find((i) => !i.removedAt);
  const archivedInstallations = installations
    .filter((i) => i.removedAt)
    .sort((a, b) => new Date(b.installedAt).getTime() - new Date(a.installedAt).getTime());

  return (
    <div className="space-y-6">
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
              <History className="h-8 w-8" />
              История установок детали
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {part.partType.name}
              {part.serialNumber && ` • Заводской номер: ${part.serialNumber}`}
              {` • Клеймо: ${part.stampNumber.value}`}
            </p>
          </div>
        </div>
      </div>

      {/* Основная информация о детали */}
      <Card>
        <CardHeader>
          <CardTitle>Информация о детали</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Тип:</span>
              <p className="font-medium">{part.partType.name}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Статус:</span>
              <p className="font-medium" style={{ color: part.status.color }}>
                {part.status.name}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Депо:</span>
              <p className="font-medium">{part.depot?.name || "—"}</p>
            </div>
            {part.serialNumber && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Заводской номер:</span>
                <p className="font-medium">{part.serialNumber}</p>
              </div>
            )}
            {part.manufactureYear && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Год производства:</span>
                <p className="font-medium">{part.manufactureYear}</p>
              </div>
            )}
            {part.currentLocation && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Текущее местоположение:</span>
                <p className="font-medium">{part.currentLocation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Текущая установка */}
      {currentInstallation && (
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              Текущая установка
            </CardTitle>
            <CardDescription>Деталь в данный момент установлена</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentInstallation.wagonNumber && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Вагон</p>
                    <p className="font-semibold">{currentInstallation.wagonNumber}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Место установки</p>
                  <p className="font-semibold">{currentInstallation.toLocationName}</p>
                  {currentInstallation.fromLocationName && (
                    <p className="text-xs text-gray-500 mt-1">
                      Откуда: {currentInstallation.fromLocationName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Дата установки</p>
                  <p className="font-semibold">{formatDateTime(currentInstallation.installedAt)}</p>
                </div>
              </div>

              {currentInstallation.installedBy && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Установил</p>
                    <p className="font-semibold">{currentInstallation.installedBy}</p>
                  </div>
                </div>
              )}
            </div>

            {currentInstallation.notes && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Примечания
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{currentInstallation.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* История установок */}
      <Card>
        <CardHeader>
          <CardTitle>
            История всех установок
            {archivedInstallations.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({archivedInstallations.length})
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Полная история перемещений и установок детали
          </CardDescription>
        </CardHeader>
        <CardContent>
          {archivedInstallations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {currentInstallation
                ? "Деталь была установлена только один раз"
                : "История установок отсутствует"}
            </div>
          ) : (
            <div className="space-y-4">
              {archivedInstallations.map((installation, index) => (
                <div
                  key={installation.id}
                  className="relative p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {/* Timeline indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 rounded-l-lg" />
                  
                  <div className="pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <History className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Установка #{archivedInstallations.length - index}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(installation.installedAt)} - {formatDate(installation.removedAt!)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {installation.wagonNumber && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Вагон:</span>
                          <p className="font-medium">{installation.wagonNumber}</p>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Место:</span>
                        <p className="font-medium">{installation.toLocationName}</p>
                        {installation.fromLocationName && (
                          <p className="text-xs text-gray-500">Откуда: {installation.fromLocationName}</p>
                        )}
                      </div>

                      {installation.installedBy && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Установил:</span>
                          <p className="font-medium">{installation.installedBy}</p>
                        </div>
                      )}

                      {installation.removedBy && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Снял:</span>
                          <p className="font-medium">{installation.removedBy}</p>
                        </div>
                      )}
                    </div>

                    {installation.notes && (
                      <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        <p className="text-gray-700 dark:text-gray-300">{installation.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
