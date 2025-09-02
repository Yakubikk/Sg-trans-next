"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
} from "lucide-react";
import { useParts, useDeletePart } from "@/hooks/useDirectories";
import { usePartTypeOptions } from "@/hooks/useDirectories";
import type { PartDTO } from "@/types/directories";

export default function PartsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: partsData, isLoading, error } = useParts(
    pageNumber, 
    pageSize, 
    typeFilter && typeFilter !== "all" ? typeFilter : undefined
  );
  const { data: partTypes } = usePartTypeOptions();
  const deleteMutation = useDeletePart();

  const filteredParts = partsData?.items?.filter((part) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      part.serialNumber?.toLowerCase().includes(search) ||
      part.partType.name.toLowerCase().includes(search) ||
      part.stampNumber.value.toLowerCase().includes(search) ||
      part.currentLocation?.toLowerCase().includes(search)
    );
  }) || [];

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту деталь?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const getPartTypeDisplay = (part: PartDTO) => {
    return part.partType.name;
  };

  const getPartSpecificInfo = (part: PartDTO) => {
    const partTypeCode = part.partType.code;
    
    switch (partTypeCode) {
      case 1: // Колесная пара
        return part.wheelPair ? (
          <div className="text-sm text-gray-600">
            Толщина: {part.wheelPair.thicknessLeft}/{part.wheelPair.thicknessRight}
            {part.wheelPair.wheelType && `, Тип: ${part.wheelPair.wheelType}`}
          </div>
        ) : null;
      case 2: // Надрессорная балка
        return part.bolster ? (
          <div className="text-sm text-gray-600">
            Срок службы: {part.bolster.serviceLifeYears} лет
            {part.bolster.extendedUntil && `, Продлен до: ${part.bolster.extendedUntil}`}
          </div>
        ) : null;
      case 3: // Боковая рама
        return part.sideFrame ? (
          <div className="text-sm text-gray-600">
            Срок службы: {part.sideFrame.serviceLifeYears} лет
            {part.sideFrame.extendedUntil && `, Продлен до: ${part.sideFrame.extendedUntil}`}
          </div>
        ) : null;
      case 4: // Автосцепка
        return part.coupler ? (
          <div className="text-sm text-gray-600">
            Автосцепка
          </div>
        ) : null;
      case 10: // Поглощающий аппарат
        return part.shockAbsorber ? (
          <div className="text-sm text-gray-600">
            Модель: {part.shockAbsorber.model}
            {part.shockAbsorber.manufacturerCode && `, Код производителя: ${part.shockAbsorber.manufacturerCode}`}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Ошибка</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Произошла ошибка при загрузке деталей: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6" />
              <div>
                <CardTitle>Детали</CardTitle>
                <CardDescription>
                  Справочник деталей железнодорожных цистерн
                </CardDescription>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить деталь
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Фильтры */}
          <div className="flex justify-between mb-6">
            <div className="flex-1 min-w-[200px] max-w-[512px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по серийному номеру, типу, клейму..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Тип детали" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                {partTypes?.map((type: { value: string; label: string }) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Таблица */}
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип детали</TableHead>
                    <TableHead>Клеймо</TableHead>
                    <TableHead>Серийный номер</TableHead>
                    <TableHead>Год производства</TableHead>
                    <TableHead>Местоположение</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Депо</TableHead>
                    <TableHead>Доп. информация</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell className="font-medium">
                        {getPartTypeDisplay(part)}
                      </TableCell>
                      <TableCell>{part.stampNumber.value}</TableCell>
                      <TableCell>{part.serialNumber || "—"}</TableCell>
                      <TableCell>{part.manufactureYear || "—"}</TableCell>
                      <TableCell>{part.currentLocation || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" style={{ borderColor: part.status.color }}>
                          {part.status.name}
                        </Badge>
                      </TableCell>
                      <TableCell>{part.depot?.name || "—"}</TableCell>
                      <TableCell>{getPartSpecificInfo(part)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(part.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredParts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        Детали не найдены
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Пагинация */}
              {partsData && partsData.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Показано {filteredParts.length} из {partsData.totalCount} записей
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(1)}
                      disabled={pageNumber === 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(pageNumber - 1)}
                      disabled={pageNumber === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Страница {pageNumber} из {partsData.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(pageNumber + 1)}
                      disabled={pageNumber === partsData.totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(partsData.totalPages)}
                      disabled={pageNumber === partsData.totalPages}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
