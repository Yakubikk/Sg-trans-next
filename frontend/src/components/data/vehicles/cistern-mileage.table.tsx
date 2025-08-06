"use client";

import { GenericTable } from "@/components/common";
import { ColumnDef } from "@tanstack/react-table";
import { useCisternMileageByCisternId } from "@/hooks/references";
import type { CisternMileage } from "@/api/references/cistern-mileage";
import { cn } from "@/lib/utils";

interface CisternMileageTableProps {
  cisternId: string;
  cisternNumber: string;
}

const cisternMileageColumns: ColumnDef<CisternMileage>[] = [
  {
    accessorKey: "milage",
    header: "Пробег (км)",
    cell: ({ row }) => {
      const milage = row.getValue("milage") as number;
      return <div className="font-medium">{milage.toLocaleString("ru-RU")}</div>;
    },
  },
  {
    accessorKey: "milageNorm",
    header: "Норма пробега (км)",
    cell: ({ row }) => {
      const milageNorm = row.getValue("milageNorm") as number;
      return <div>{milageNorm.toLocaleString("ru-RU")}</div>;
    },
  },
  {
    id: "milagePercentage",
    header: "Процент использования",
    cell: ({ row }) => {
      const milage = row.getValue("milage") as number;
      const milageNorm = row.getValue("milageNorm") as number;
      const percentage = Math.round((milage / milageNorm) * 100);

      const getColorClass = (percent: number) => {
        if (percent < 70) return "text-green-600 bg-green-100";
        if (percent < 90) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
      };

      return (
        <div
          className={cn(
            "px-2 py-1 rounded-full text-sm font-medium inline-flex items-center",
            getColorClass(percentage)
          )}
        >
          {percentage}%
        </div>
      );
    },
  },
  {
    accessorKey: "repairDate",
    header: "Дата планового ремонта",
    cell: ({ row }) => {
      const repairDate = row.getValue("repairDate") as string;
      return <div>{new Date(repairDate).toLocaleDateString("ru-RU")}</div>;
    },
  },
  {
    accessorKey: "inputDate",
    header: "Дата ввода данных",
    cell: ({ row }) => {
      const inputDate = row.getValue("inputDate") as string;
      return <div>{new Date(inputDate).toLocaleDateString("ru-RU")}</div>;
    },
  },
  // {
  //   id: "actions",
  //   header: "Действия",
  //   cell: ({ row }) => {
  //     return (
  //       <TableActions
  //         item={row.original}
  //         onView={(item) => console.log("Просмотр:", item)}
  //         onEdit={(item) => console.log("Редактировать:", item)}
  //         onDelete={(item) => console.log("Удалить:", item)}
  //       />
  //     );
  //   },
  // },
];

export function CisternMileageTable({ cisternId, cisternNumber }: CisternMileageTableProps) {
  const { data = [], isLoading, error } = useCisternMileageByCisternId(cisternId);

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-red-600 mb-2">⚠️ Ошибка загрузки</div>
          <p className="text-gray-600">Не удалось загрузить данные о пробеге цистерны</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Пробеги цистерны {cisternNumber}</h2>
        <p className="text-gray-600 mt-1">Информация о пробегах и плановых ремонтах</p>
      </div>

      <div className="p-6">
        <GenericTable
          data={data}
          columns={cisternMileageColumns}
          isLoading={isLoading}
          emptyMessage="Данные о пробегах не найдены"
          showSearch={false}
        />
      </div>
    </div>
  );
}

export { cisternMileageColumns };
export type { CisternMileageTableProps };
