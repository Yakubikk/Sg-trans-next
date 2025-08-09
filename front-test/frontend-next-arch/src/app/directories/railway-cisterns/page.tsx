"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { CisternFilters } from "@/components/cistern-filters";
import { formatDate } from "@/lib/utils";

interface RailwayCistern {
  id: string;
  number: string;
  serialNumber: string;
  registrationNumber: string;
  buildDate: string;
  tareWeight: number;
  loadCapacity: number;
  volume: number;
  length: number;
  axleCount: number;
  pressure: number;
  substance: string;
  dangerClass: number;
  createdAt: string;
  updatedAt: string;
  manufacturer: {
    id: string;
    name: string;
    country: string;
  };
  wagonType: {
    id: string;
    name: string;
  };
  wagonModel?: {
    id: string;
    name: string;
  };
  affiliation: {
    id: string;
    value: string;
  };
  registrar?: {
    id: string;
    name: string;
  };
}

interface FilterValue {
  column: string;
  operator: string;
  value: string;
  values?: string[]; // для multi-select
  date?: Date;
}

interface ColumnVisibility {
  [key: string]: boolean;
}

const defaultColumns: ColumnVisibility = {
  number: true,
  registrationNumber: true,
  manufacturer: true,
  wagonType: true,
  buildDate: true,
  volume: true,
  tareWeight: false,
  loadCapacity: false,
  pressure: false,
  substance: false,
  dangerClass: false,
  affiliation: true,
  updatedAt: true,
  serialNumber: false,
  length: false,
  axleCount: false,
};

const allColumns: ColumnDef<RailwayCistern>[] = [
  {
    accessorKey: "number",
    header: "Номер",
    cell: ({ row }) => <div className="font-medium">{row.getValue("number")}</div>,
  },
  {
    accessorKey: "registrationNumber",
    header: "Рег. номер",
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("registrationNumber")}</div>,
  },
  {
    accessorKey: "serialNumber",
    header: "Серийный номер",
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("serialNumber")}</div>,
  },
  {
    accessorKey: "manufacturer",
    header: "Производитель",
    cell: ({ row }) => {
      const manufacturer = row.getValue("manufacturer") as RailwayCistern["manufacturer"];
      return (
        <div>
          <div className="font-medium">{manufacturer.name}</div>
          <div className="text-sm text-muted-foreground">{manufacturer.country}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "wagonType",
    header: "Тип",
    cell: ({ row }) => {
      const wagonType = row.getValue("wagonType") as RailwayCistern["wagonType"];
      return <Badge variant="outline">{wagonType.name}</Badge>;
    },
  },
  {
    accessorKey: "buildDate",
    header: "Год выпуска",
    cell: ({ row }) => {
      const date = new Date(row.getValue("buildDate"));
      return <div>{date.getFullYear()}</div>;
    },
  },
  {
    accessorKey: "length",
    header: "Длина, мм",
    cell: ({ row }) => <div className="text-right">{Number(row.getValue("length")).toLocaleString()}</div>,
  },
  {
    accessorKey: "axleCount",
    header: "Количество осей",
    cell: ({ row }) => <div className="text-center">{row.getValue("axleCount")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Объем, м³",
    cell: ({ row }) => <div className="text-right">{Number(row.getValue("volume")).toFixed(1)}</div>,
  },
  {
    accessorKey: "tareWeight",
    header: "Тара, т",
    cell: ({ row }) => <div className="text-right">{Number(row.getValue("tareWeight")).toFixed(1)}</div>,
  },
  {
    accessorKey: "loadCapacity",
    header: "Грузоподъем, т",
    cell: ({ row }) => <div className="text-right">{Number(row.getValue("loadCapacity")).toFixed(1)}</div>,
  },
  {
    accessorKey: "pressure",
    header: "Давление, МПа",
    cell: ({ row }) => <div className="text-right">{Number(row.getValue("pressure")).toFixed(2)}</div>,
  },
  {
    accessorKey: "substance",
    header: "Вещество",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("substance")}</Badge>,
  },
  {
    accessorKey: "dangerClass",
    header: "Класс опасности",
    cell: ({ row }) => {
      const dangerClass = row.getValue("dangerClass") as number;
      const variant = dangerClass > 0 ? "destructive" : "outline";
      return <Badge variant={variant}>{dangerClass > 0 ? `Класс ${dangerClass}` : "Не опасно"}</Badge>;
    },
  },
  {
    accessorKey: "affiliation",
    header: "Принадлежность",
    cell: ({ row }) => {
      const affiliation = row.getValue("affiliation") as RailwayCistern["affiliation"];
      return <div className="text-sm">{affiliation.value}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Обновлено",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return <div className="text-sm text-muted-foreground">{formatDate(date)}</div>;
    },
  },
];

export default function RailwayCisternsPage() {
  const router = useRouter();
  const [cisterns, setCisterns] = useState<RailwayCistern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumns);

  useEffect(() => {
    fetchCisterns();
  }, []);

  const fetchCisterns = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/directories/railway-cisterns");

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();
      setCisterns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация данных
  const filteredData = useMemo(() => {
    if (filters.length === 0) return cisterns;

    return cisterns.filter((cistern) => {
      return filters.every((filter) => {
        let value: string | number;
        let compareId: string | undefined;

        // Получаем значение для сравнения
        switch (filter.column) {
          case "manufacturer":
            value = cistern.manufacturer.name.toLowerCase();
            compareId = cistern.manufacturer.id;
            break;
          case "wagonType":
            value = cistern.wagonType.name.toLowerCase();
            compareId = cistern.wagonType.id;
            break;
          case "affiliation":
            value = cistern.affiliation.value.toLowerCase();
            compareId = cistern.affiliation.id;
            break;
          case "buildDate":
            value = new Date(cistern.buildDate).getFullYear().toString();
            break;
          case "dangerClass":
            value = cistern.dangerClass.toString();
            break;
          case "substance":
            value = cistern.substance.toLowerCase();
            break;
          default:
            value = String(cistern[filter.column as keyof RailwayCistern] || "").toLowerCase();
        }

        // Для multi-select полей проверяем, содержится ли ID в массиве выбранных значений
        if (filter.values && filter.values.length > 0) {
          if (["manufacturer", "wagonType", "affiliation"].includes(filter.column)) {
            return compareId ? filter.values.includes(compareId) : false;
          } else if (["substance", "dangerClass"].includes(filter.column)) {
            return filter.values.includes(String(value));
          }
        }

        const filterValue = filter.value.toLowerCase();

        // Применяем оператор для обычных полей
        switch (filter.operator) {
          case "equals":
            return value === filterValue;
          case "contains":
            return value.includes(filterValue);
          case "startsWith":
            return value.startsWith(filterValue);
          case "endsWith":
            return value.endsWith(filterValue);
          case "gt":
            return parseFloat(value) > parseFloat(filterValue);
          case "lt":
            return parseFloat(value) < parseFloat(filterValue);
          case "gte":
            return parseFloat(value) >= parseFloat(filterValue);
          case "lte":
            return parseFloat(value) <= parseFloat(filterValue);
          default:
            return true;
        }
      });
    });
  }, [cisterns, filters]);

  // Фильтрация столбцов
  const visibleColumns = useMemo(() => {
    return allColumns.filter((column) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const accessorKey = (column as any).accessorKey as string;
      return columnVisibility[accessorKey];
    });
  }, [columnVisibility]);

  // Уникальные значения для фильтров
  const uniqueManufacturers = useMemo(() => {
    const manufacturers = cisterns.map((c) => c.manufacturer);
    const unique = manufacturers.filter((m, index, self) => index === self.findIndex((t) => t.id === m.id));
    return unique;
  }, [cisterns]);

  const uniqueWagonTypes = useMemo(() => {
    const wagonTypes = cisterns.map((c) => c.wagonType);
    const unique = wagonTypes.filter((w, index, self) => index === self.findIndex((t) => t.id === w.id));
    return unique;
  }, [cisterns]);

  const uniqueAffiliations = useMemo(() => {
    const affiliations = cisterns.map((c) => c.affiliation);
    const unique = affiliations.filter((a, index, self) => index === self.findIndex((t) => t.id === a.id));
    return unique;
  }, [cisterns]);

  const handleRowClick = (cistern: RailwayCistern) => {
    router.push(`/wagon-passport/${cistern.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Загрузка цистерн...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Ошибка</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={fetchCisterns} className="mt-4">
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-6 py-2">
      <div>
        <div className="flex items-center gap-2">
          <CisternFilters
            onFiltersChange={setFilters}
            onColumnsChange={setColumnVisibility}
            initialColumns={columnVisibility}
            manufacturers={uniqueManufacturers}
            wagonTypes={uniqueWagonTypes}
            affiliations={uniqueAffiliations}
          />

          <div className="text-sm text-muted-foreground">
            Показано {filteredData.length} из {cisterns.length} цистерн
            <span className="ml-4 text-xs">💡 Нажмите на строку для просмотра паспорта цистерны</span>
          </div>
        </div>

        <DataTable
          columns={visibleColumns}
          data={filteredData}
          searchPlaceholder="Поиск по номеру цистерны..."
          searchColumn="number"
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}
