"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  FileText,
  History,
  RefreshCw,
  Download,
  Calendar,
  Wrench,
  MapPin,
} from "lucide-react";
import { usePartEquipmentsByCistern, useLastPartEquipmentsByCistern } from "@/hooks/useDirectories";

interface PartEquipmentListProps {
  cisternId: string;
}

export function PartEquipmentList({ cisternId }: PartEquipmentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("current");

  const { 
    data: allEquipments, 
    isLoading: isLoadingAll, 
    error: errorAll 
  } = usePartEquipmentsByCistern(cisternId);
  
  const { 
    data: lastEquipments, 
    isLoading: isLoadingLast, 
    error: errorLast 
  } = useLastPartEquipmentsByCistern(cisternId);

  const getOperationText = (operation: number) => {
    switch (operation) {
      case 1:
        return { text: "Демонтаж", variant: "destructive" as const };
      case 2:
        return { text: "Монтаж", variant: "default" as const };
      default:
        return { text: "Неизвестно", variant: "secondary" as const };
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const filteredAllEquipments = allEquipments?.filter((equipment) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      equipment.equipmentType?.name?.toLowerCase().includes(search) ||
      equipment.jobDepot?.name?.toLowerCase().includes(search) ||
      equipment.depot?.name?.toLowerCase().includes(search) ||
      equipment.repairType?.name?.toLowerCase().includes(search) ||
      equipment.notes?.toLowerCase().includes(search)
    );
  }) || [];

  const filteredLastEquipments = lastEquipments?.filter((equipment) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      equipment.equipmentTypeName?.toLowerCase().includes(search) ||
      equipment.lastEquipment.jobDepot?.name?.toLowerCase().includes(search) ||
      equipment.lastEquipment.depot?.name?.toLowerCase().includes(search) ||
      equipment.lastEquipment.repairType?.name?.toLowerCase().includes(search)
    );
  }) || [];

  if (errorAll || errorLast) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Ошибка</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Произошла ошибка при загрузке данных оборудования</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Лист комплектации</h3>
          <p className="text-sm text-gray-600">
            Информация об установленном оборудовании и истории изменений
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="current" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Текущая комплектация
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Полная история
          </TabsTrigger>
        </TabsList>

        {/* Поиск */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по типу оборудования, депо..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Текущая комплектация */}
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Установленное оборудование
              </CardTitle>
              <CardDescription>
                Последние установленные детали по типам оборудования
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingLast ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тип оборудования</TableHead>
                      <TableHead>Дата установки</TableHead>
                      <TableHead>Рабочее депо</TableHead>
                      <TableHead>Депо</TableHead>
                      <TableHead>Тип ремонта</TableHead>
                      <TableHead>Толщина колес</TableHead>
                      <TableHead>Тип тележки</TableHead>
                      <TableHead>Примечания</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLastEquipments.map((equipment) => (
                      <TableRow key={equipment.equipmentTypeId}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{equipment.equipmentTypeName}</div>
                            {equipment.lastEquipment.equipmentType?.code && (
                              <div className="text-xs text-gray-500">
                                Код: {equipment.lastEquipment.equipmentType.code}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formatDate(equipment.lastEquipment.documetnDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Wrench className="h-4 w-4 text-gray-400" />
                            {equipment.lastEquipment.jobDepot?.shortName || equipment.lastEquipment.jobDepot?.name || "—"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {equipment.lastEquipment.depot?.shortName || equipment.lastEquipment.depot?.name || "—"}
                          </div>
                        </TableCell>
                        <TableCell>
                          {equipment.lastEquipment.repairType?.name || "—"}
                        </TableCell>
                        <TableCell>
                          {equipment.lastEquipment.thicknessLeft && equipment.lastEquipment.thicknessRight
                            ? `${equipment.lastEquipment.thicknessLeft}/${equipment.lastEquipment.thicknessRight} мм`
                            : "—"
                          }
                        </TableCell>
                        <TableCell>
                          {equipment.lastEquipment.truckType ? `Тип ${equipment.lastEquipment.truckType}` : "—"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {equipment.lastEquipment.notes || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredLastEquipments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          {lastEquipments?.length === 0 
                            ? "Оборудование не установлено" 
                            : "Оборудование не найдено"
                          }
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Полная история */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                История изменений оборудования
              </CardTitle>
              <CardDescription>
                Полная история установки и демонтажа оборудования
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAll ? (
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата операции</TableHead>
                      <TableHead>Операция</TableHead>
                      <TableHead>Тип оборудования</TableHead>
                      <TableHead>Рабочее депо</TableHead>
                      <TableHead>Депо</TableHead>
                      <TableHead>Тип ремонта</TableHead>
                      <TableHead>Толщина колес</TableHead>
                      <TableHead>Тип тележки</TableHead>
                      <TableHead>Примечания</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAllEquipments
                      .sort((a, b) => {
                        const dateA = new Date(a.documetnDate || 0);
                        const dateB = new Date(b.documetnDate || 0);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((equipment) => {
                        const operation = getOperationText(equipment.operation);
                        return (
                          <TableRow key={equipment.id}>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                {formatDate(equipment.documetnDate)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={operation.variant}>
                                {operation.text}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div>
                                <div>{equipment.equipmentType?.name || "—"}</div>
                                {equipment.equipmentType?.code && (
                                  <div className="text-xs text-gray-500">
                                    Код: {equipment.equipmentType.code}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Wrench className="h-4 w-4 text-gray-400" />
                                {equipment.jobDepot?.shortName || equipment.jobDepot?.name || "—"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                {equipment.depot?.shortName || equipment.depot?.name || "—"}
                              </div>
                            </TableCell>
                            <TableCell>
                              {equipment.repairType?.name || "—"}
                            </TableCell>
                            <TableCell>
                              {equipment.thicknessLeft && equipment.thicknessRight
                                ? `${equipment.thicknessLeft}/${equipment.thicknessRight} мм`
                                : "—"
                              }
                            </TableCell>
                            <TableCell>
                              {equipment.truckType ? `Тип ${equipment.truckType}` : "—"}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {equipment.notes || "—"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {filteredAllEquipments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          {allEquipments?.length === 0 
                            ? "История изменений пуста" 
                            : "Записи не найдены"
                          }
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
