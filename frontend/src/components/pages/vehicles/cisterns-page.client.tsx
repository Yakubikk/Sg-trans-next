'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import { CisternsTable } from "@/components/data";
import { CisternFilters } from "@/components/common/filters";
import { useSearchRailwayCisterns, useRailwayCisterns } from "@/hooks/references";
import type { CisternFilter } from "@/api/references";

// Общая функция для проверки активных фильтров
const hasActiveFilters = (filters: CisternFilter): boolean => {
  return Object.keys(filters).some(key => {
    const value = filters[key as keyof CisternFilter];
    return value !== undefined && value !== null && 
           (Array.isArray(value) ? value.length > 0 : true);
  });
};

export default function CisternsPageClient() {
  const [currentFilters, setCurrentFilters] = useState<CisternFilter>({});
  const [appliedFilters, setAppliedFilters] = useState<CisternFilter>({});
  
  // Проверяем, есть ли активные фильтры (мемоизируем)
  const filtersActive = useMemo(() => hasActiveFilters(appliedFilters), [appliedFilters]);

  // Используем поиск с фильтрами только если есть активные фильтры, иначе загружаем все данные
  const { 
    data: searchResult, 
    isLoading: searchLoading, 
    error: searchError,
    refetch: refetchSearch
  } = useSearchRailwayCisterns(appliedFilters);
  
  const { 
    data: allCisterns = [], 
    isLoading: allLoading, 
    error: allError 
  } = useRailwayCisterns();

  // Принудительно обновляем данные поиска при изменении примененных фильтров
  useEffect(() => {
    if (filtersActive && refetchSearch) {
      refetchSearch();
    }
  }, [appliedFilters, filtersActive, refetchSearch]);

  // Определяем какие данные использовать (мемоизируем)
  const cisterns = useMemo(() => {
    return filtersActive 
      ? (searchResult?.railwayCisterns || [])
      : allCisterns;
  }, [filtersActive, searchResult?.railwayCisterns, allCisterns]);
  
  // Определяем состояние загрузки и ошибки (мемоизируем)
  const { isLoading, error } = useMemo(() => ({
    isLoading: filtersActive ? searchLoading : allLoading,
    error: filtersActive ? searchError : allError
  }), [filtersActive, searchLoading, allLoading, searchError, allError]);

  const handleFiltersChange = useCallback((filters: CisternFilter) => {
    setCurrentFilters(filters);
    // Если фильтры пусты (сброс), сразу применяем
    if (!hasActiveFilters(filters)) {
      setAppliedFilters(filters);
    }
  }, []);

  const handleApplyFilters = useCallback((filtersToApply?: CisternFilter) => {
    // Если фильтры переданы напрямую (из компонента фильтров), используем их
    // Иначе используем текущие фильтры из состояния
    const finalFilters = filtersToApply || currentFilters;
    setAppliedFilters(finalFilters);
  }, [currentFilters]);

  

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Загрузка данных...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            {error instanceof Error ? error.message : 'Ошибка при загрузке данных о цистернах'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CisternFilters
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        initialFilters={currentFilters}
        appliedFilters={appliedFilters}
      />
      
      <CisternsTable 
        data={cisterns}
        appliedFilters={appliedFilters}
        isLoading={isLoading}
      />
    </div>
  );
}
