"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input } from "@/components/ui";
import { ChevronDown, ChevronUp, Plus, Filter } from "lucide-react";

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (item: T) => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAdd?: () => void;
  showSearch?: boolean;
  showFilters?: boolean;
  onFiltersToggle?: () => void;
  filtersOpen?: boolean;
}

/**
 * Универсальный компонент таблицы
 * Инкапсулирует общую логику сортировки, фильтрации и пагинации
 */
export function GenericTable<T>({
  data,
  columns,
  searchPlaceholder = "Поиск...",
  isLoading = false,
  emptyMessage = "Нет данных для отображения",
  className = "",
  onRowClick,
  showAddButton = false,
  addButtonLabel = "Добавить",
  onAdd,
  showSearch = true,
  showFilters = false,
  onFiltersToggle,
  filtersOpen = false,
}: GenericTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Обработчик изменения размера страницы
  const handlePageSizeChange = (newPageSize: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0, // Сброс на первую страницу при изменении размера
    }));
  };

  // Кастомная функция фильтрации для более точного поиска
  const customGlobalFilter = (row: { original: T }, columnId: string, value: string) => {
    const searchValue = value.toLowerCase().trim();
    if (!searchValue) return true;

    // Получаем все значения ячеек в строке
    const rowData = row.original as Record<string, unknown>;

    // Для поиска по номеру цистерны делаем более точное сравнение
    if (rowData.number) {
      const number = String(rowData.number).toLowerCase();
      // Если поиск выглядит как номер (только цифры), то ищем точное совпадение или совпадение с начала
      if (/^\d+$/.test(searchValue)) {
        return number === searchValue || number.startsWith(searchValue);
      }
    }

    // Для ID тоже проверяем точное совпадение с начала, если это число
    if (rowData.id && /^\d+$/.test(searchValue)) {
      const id = String(rowData.id).toLowerCase();
      if (id === searchValue || id.startsWith(searchValue)) {
        return true;
      }
    }

    // Для остальных полей используем поиск по вхождению подстроки
    const rowValues = Object.values(rowData)
      .filter((val) => val !== rowData.number && val !== rowData.id) // Исключаем number и id, которые уже проверили
      .map((val) => String(val || "").toLowerCase());

    return rowValues.some((cellValue) => cellValue.includes(searchValue));
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: customGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Поиск и кнопки */}
      {(showSearch || (showAddButton && onAdd) || showFilters) && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            {showSearch && (
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(String(event.target.value))}
                className="max-w-sm"
              />
            )}
            {showFilters && onFiltersToggle && (
              <Button
                variant="outline"
                onClick={onFiltersToggle}
                className={filtersOpen ? "bg-blue-50 border-blue-300" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            )}
          </div>
          {showAddButton && onAdd && (
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              {addButtonLabel}
            </Button>
          )}
        </div>
      )}

      {/* Таблица */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left">
                    {header.isPlaceholder ? null : (
                      <Button
                        variant="ghost"
                        onClick={header.column.getToggleSortingHandler()}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
                        {header.column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
                      </Button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Пагинация */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {(() => {
              const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
              const totalRows = data.length;
              const startRow = pageIndex * currentPageSize + 1;
              const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows);

              if (totalRows === 0) {
                return "Нет записей";
              }

              return `Записи ${startRow} - ${endRow} из ${totalRows}`;
            })()}
          </div>
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <div className="text-sm text-muted-foreground px-2">
            Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
}
