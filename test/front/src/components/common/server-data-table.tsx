'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  MoreHorizontal, 
  Plus, 
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { PaginatedResponse } from '@/types/models';
import { useDebounce } from '@/hooks/use-debounce';

interface ServerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: PaginatedResponse<TData>;
  title: string;
  description?: string;
  searchPlaceholder?: string;
  onAdd?: () => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (search: string) => void;
  currentSearch?: string;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function ServerDataTable<TData, TValue>({
  columns: initialColumns,
  data,
  title,
  description,
  searchPlaceholder = 'Поиск...',
  onAdd,
  onEdit,
  onDelete,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  currentSearch = '',
}: ServerDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState(currentSearch);
  
  // Debounced search value
  const debouncedSearchValue = useDebounce(searchValue, 500);
  
  // Trigger search when debounced value changes
  useEffect(() => {
    if (debouncedSearchValue !== currentSearch) {
      onSearchChange(debouncedSearchValue);
    }
  }, [debouncedSearchValue, currentSearch, onSearchChange]);

  // Add actions column if edit or delete handlers are provided
  const columns = useMemo(() => {
    if (!onEdit && !onDelete) return initialColumns;

    const actionsColumn: ColumnDef<TData, TValue> = {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(row.original)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    };

    return [...initialColumns, actionsColumn];
  }, [initialColumns, onEdit, onDelete]);

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
    pageCount: data.totalPages,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination: {
        pageIndex: data.page - 1,
        pageSize: data.size,
      },
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Генерация номеров страниц для пагинации
  const generatePageNumbers = () => {
    const current = data.page;
    const total = data.totalPages;
    const delta = 2; // Количество страниц вокруг текущей
    
    const pages: (number | 'ellipsis')[] = [];
    
    if (total <= 7) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Показываем первую страницу
      pages.push(1);
      
      if (current - delta > 2) {
        pages.push('ellipsis');
      }
      
      // Показываем страницы вокруг текущей
      const start = Math.max(2, current - delta);
      const end = Math.min(total - 1, current + delta);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (current + delta < total - 1) {
        pages.push('ellipsis');
      }
      
      // Показываем последнюю страницу
      if (total > 1) {
        pages.push(total);
      }
    }
    
    return pages;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Добавить
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => handleSearchChange(event.target.value)}
                className="pl-8"
              />
            </div>
          </form>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Строк на странице:</span>
            <Select
              value={data.size.toString()}
              onValueChange={(value) => onPageSizeChange(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center space-x-1'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <>
                              {header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronsUpDown className="h-4 w-4" />
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isLoading ? 'Загрузка...' : 'Нет данных.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Показано {data.items.length} из {data.totalCount} записей (страница {data.page} из {data.totalPages})
          </div>
          
          {data.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => onPageChange(data.page - 1)}
                    className={!data.hasPreviousPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={page === data.page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => onPageChange(data.page + 1)}
                    className={!data.hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
