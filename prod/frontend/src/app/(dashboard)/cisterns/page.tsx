"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Search,
  Train,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useCisterns, useDeleteCistern, useSearchCisterns, useCisternNumbers } from "@/hooks/useCisterns";
import { useDebounce } from "@/hooks/useDebounce";
import { AutocompleteInput } from "@/components/ui/autocomplete-input";
import type { CisternsFilter } from "@/types/cisterns";

export default function CisternsPage() {
  const [filter, setFilter] = useState<CisternsFilter>({
    page: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // Client-side pagination for search results
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageSize, setSearchPageSize] = useState(10);
  
  // Debounce search term for API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: cisternsData, isLoading, error } = useCisterns(isSearchMode ? undefined : filter);
  const { data: searchResults, isLoading: isSearchLoading, error: searchError } = useSearchCisterns(
    debouncedSearchTerm,
    isSearchMode
  );
  
  // Autocomplete for cistern numbers (only when typing)
  const { data: allCisternNumbers = [], isLoading: isLoadingNumbers } = useCisternNumbers();
  
  // Отсортированные и отфильтрованные предложения номеров
  const sortedNumberSuggestions = useMemo(() => {
    if (!searchTerm.trim()) {
      // Если нет поискового запроса, возвращаем первые 10 номеров отсортированные по алфавиту
      return allCisternNumbers
        .slice()
        .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
        .slice(0, 10);
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    // Фильтруем только номера, которые НАЧИНАЮТСЯ с введенного текста
    const filtered = allCisternNumbers.filter(number => 
      number.toLowerCase().startsWith(searchLower)
    );
    
    // Сортируем по алфавиту (с учетом числовых значений)
    return filtered
      .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
      .slice(0, 15); // Ограничиваем количество предложений
  }, [allCisternNumbers, searchTerm]);
  
  const deleteMutation = useDeleteCistern();

  // Switch between search and normal mode based on search term
  useEffect(() => {
    const hasSearchTerm = debouncedSearchTerm.trim().length > 0;
    setIsSearchMode(hasSearchTerm);
    // Reset search pagination when switching modes
    if (hasSearchTerm) {
      setSearchPage(1);
    }
  }, [debouncedSearchTerm]);

  // Client-side pagination for search results
  const paginatedSearchResults = isSearchMode && searchResults ? 
    searchResults.slice((searchPage - 1) * searchPageSize, searchPage * searchPageSize) : [];
  
  const searchTotalPages = isSearchMode && searchResults ? 
    Math.ceil(searchResults.length / searchPageSize) : 0;

  // Determine which data to display and loading state
  const displayData = isSearchMode ? paginatedSearchResults : cisternsData?.railwayCisterns;
  const displayLoading = isSearchMode ? isSearchLoading : isLoading;
  const displayError = isSearchMode ? searchError : error;
  const totalCount = isSearchMode ? (searchResults?.length || 0) : (cisternsData?.totalCount || 0);
  const currentPage = isSearchMode ? searchPage : (cisternsData?.currentPage || 1);
  const totalPages = isSearchMode ? searchTotalPages : (cisternsData?.totalPages || 1);
  const pageSize = isSearchMode ? searchPageSize : (cisternsData?.pageSize || 10);
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    // Reset pagination when searching
    if (!value.trim()) {
      setFilter((prev) => ({ ...prev, page: 1 }));
    } else {
      setSearchPage(1);
    }
  }, []);

  const handlePageChange = (page: number) => {
    if (isSearchMode) {
      setSearchPage(page);
    } else {
      setFilter((prev) => ({ ...prev, page }));
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (isSearchMode) {
      setSearchPageSize(newPageSize);
      setSearchPage(1);
    } else {
      setFilter((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту цистерну?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting cistern:", error);
      }
    }
  };

  // Pagination component
  const Pagination = () => {
    // Hide pagination if there's only one page or less
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    const getVisiblePages = () => {
      const delta = 1;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Показано {startItem}-{endItem} из {totalCount} записей
          </p>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="ml-2 text-sm border rounded px-2 py-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <option value={5}>5 на странице</option>
            <option value={10}>10 на странице</option>
            <option value={25}>25 на странице</option>
            <option value={50}>50 на странице</option>
          </select>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getVisiblePages().map((pageNum, index) => (
            <Button
              key={index}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof pageNum === "number" && handlePageChange(pageNum)}
              disabled={typeof pageNum !== "number"}
              className="min-w-[40px]"
            >
              {pageNum}
            </Button>
          ))}

          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Table skeleton for loading state
  const TableSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: 8 }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className={`h-4 ${colIndex === 0 ? "w-32" : "w-24"}`} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (displayError) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Train className="h-8 w-8" />
            Цистерны
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Ошибка загрузки данных: {displayError instanceof Error ? displayError.message : "Неизвестная ошибка"}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-3 max-lg:flex-col">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Train className="h-8 w-8" />
          Вагоны
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Управление железнодорожными цистернами</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
          <AutocompleteInput
            value={searchTerm}
            onChange={handleSearch}
            suggestions={sortedNumberSuggestions}
            placeholder="Поиск по номеру цистерны..."
            className="pl-10"
            isLoading={isLoadingNumbers}
          />
        </div>

        <Link href="/cisterns/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить цистерну
          </Button>
        </Link>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <CardTitle>
              {isSearchMode ? `Результаты поиска: "${searchTerm}"` : "Список цистерн"}
            </CardTitle>
            <CardDescription>
              {isSearchMode 
                ? `Найдено: ${totalCount}` 
                : `Всего записей: ${totalCount}`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {displayLoading ? (
            <TableSkeleton />
          ) : !displayData?.length ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Train className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {isSearchMode 
                    ? `Цистерны с номером "${searchTerm}" не найдены` 
                    : "Нет данных для отображения"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер</TableHead>
                    <TableHead>Производитель</TableHead>
                    <TableHead>Дата постройки</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Модель</TableHead>
                    <TableHead>Собственник</TableHead>
                    <TableHead>Принадлежность</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((cistern) => (
                    <TableRow key={cistern.id}>
                      <TableCell className="font-medium">{cistern.number}</TableCell>
                      <TableCell>{cistern.manufacturer?.name}</TableCell>
                      <TableCell>{new Date(cistern.buildDate).toLocaleDateString("ru-RU")}</TableCell>
                      <TableCell>{cistern.type?.name}</TableCell>
                      <TableCell>{cistern.model?.name}</TableCell>
                      <TableCell>{cistern.owner?.name}</TableCell>
                      <TableCell>{cistern.affiliation?.value}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/cisterns/${cistern.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/cisterns/${cistern.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(cistern.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-4">
                <Pagination />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
