"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Wagon, getWagonStatus } from "@/api/references/wagons";

interface WagonsTableProps {
  data: Wagon[];
  onView?: (wagon: Wagon) => void;
  onEdit?: (wagon: Wagon) => void;
  onDelete?: (wagon: Wagon) => void;
}

export const wagonsColumns: ColumnDef<Wagon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать строку"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Номер
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("number")}</div>,
    filterFn: (row, id, value) => {
      if (!value) return true;
      const numberValue = row.getValue(id) as number;
      const searchValue = value.toString().toLowerCase();
      return numberValue.toString().includes(searchValue);
    },
  },
  {
    accessorKey: "way",
    header: "Путь",
    cell: ({ row }) => <div>{row.getValue("way")}</div>,
  },
  {
    accessorKey: "carBrand",
    header: "Марка",
    cell: ({ row }) => <div>{row.getValue("carBrand") || "—"}</div>,
  },
  {
    accessorKey: "carType",
    header: "Тип",
    cell: ({ row }) => <div>{row.getValue("carType") || "—"}</div>,
  },
  {
    id: "status",
    header: "Статус",
    cell: ({ row }) => {
      const wagon = row.original;
      const status = getWagonStatus(wagon);
      const statusColors = {
        Активен: "text-green-600 bg-green-50",
        Неактивен: "text-gray-600 bg-gray-50",
        "В ремонте": "text-yellow-600 bg-yellow-50",
        "В аренде": "text-blue-600 bg-blue-50",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[status as keyof typeof statusColors] || "text-gray-600 bg-gray-50"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "loadCapacity",
    header: () => <div className="text-right">Грузоподъемность</div>,
    cell: ({ row }) => {
      const capacity = row.getValue("loadCapacity") as number;
      return <div className="text-right">{capacity ? `${capacity} т` : "—"}</div>;
    },
  },
  {
    accessorKey: "tare",
    header: () => <div className="text-right">Тара</div>,
    cell: ({ row }) => {
      const tare = row.getValue("tare") as number;
      return <div className="text-right">{tare ? `${tare} т` : "—"}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const wagon = row.original;
      const meta = table.options.meta as
        | { onView?: (wagon: Wagon) => void; onEdit?: (wagon: Wagon) => void; onDelete?: (wagon: Wagon) => void }
        | undefined;
      const { onView, onEdit, onDelete } = meta || {};

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(wagon.id)}>Копировать ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            {onView && (
              <DropdownMenuItem onClick={() => onView(wagon)}>
                <Eye className="mr-2 h-4 w-4" />
                Просмотр
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(wagon)}>
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(wagon)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function WagonsTable({ data, onView, onEdit, onDelete }: WagonsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: wagonsColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onView,
      onEdit,
      onDelete,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Поиск по номеру вагона..."
          value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("number")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Колонки <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnLabels: Record<string, string> = {
                  number: "Номер",
                  way: "Путь",
                  carBrand: "Марка",
                  carType: "Тип",
                  status: "Статус",
                  loadCapacity: "Грузоподъемность",
                  tare: "Тара",
                };
                
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {columnLabels[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={wagonsColumns.length} className="h-24 text-center">
                  Данные не найдены.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Выбрано {table.getFilteredSelectedRowModel().rows.length} из {table.getFilteredRowModel().rows.length}{" "}
          записей.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
}
