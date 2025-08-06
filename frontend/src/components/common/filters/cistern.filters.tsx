"use client";

import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Save, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import type { CisternFilter, CreateSavedFilterRequest } from "@/api/references";
import {
  useSavedFilters,
  useCreateSavedFilter,
  useManufacturers,
  useWagonTypes,
  useWagonModels,
  useOwners,
  useAffiliations,
} from "@/hooks/references";

interface CisternFiltersProps {
  onFiltersChange: (filters: CisternFilter) => void;
  onApplyFilters?: (filters?: CisternFilter) => void;
  initialFilters?: CisternFilter;
  appliedFilters?: CisternFilter;
}

const CisternFilters = memo(function CisternFilters({
  onFiltersChange,
  onApplyFilters,
  initialFilters = {},
}: CisternFiltersProps) {
  const [filters, setFilters] = useState<CisternFilter>(initialFilters);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [expanded, setExpanded] = useState(false);

  // Загружаем справочные данные
  const { data: savedFilters } = useSavedFilters();
  const { data: manufacturers = [] } = useManufacturers();
  const { data: wagonTypes = [] } = useWagonTypes();
  const { data: wagonModels = [] } = useWagonModels();
  const { data: owners = [] } = useOwners();
  const { data: affiliations = [] } = useAffiliations();

  const createSavedFilter = useCreateSavedFilter();

  const handleFilterChange = (key: keyof CisternFilter, value: string | number | string[] | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    // Только обновляем внутреннее состояние, не применяем фильтры сразу
    if (!onApplyFilters) {
      // Если нет кнопки применения, применяем сразу (обратная совместимость)
      onFiltersChange(newFilters);
    }
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
    if (onApplyFilters) {
      // Также сбрасываем применённые фильтры, если есть кнопка применения
      // Это приведёт к обновлению внешнего состояния
    }
  };

  const applyFilters = () => {
    // Обновляем состояние фильтров
    onFiltersChange(filters);
    // Применяем фильтры, передавая текущие фильтры напрямую
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(
      (value) => value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  const handleSaveFilter = async () => {
    if (!filterName.trim()) return;

    try {
      const filterData: CreateSavedFilterRequest = {
        name: filterName,
        filter: filters,
        sortFields: [],
      };

      await createSavedFilter.mutateAsync(filterData);
      setFilterName("");
      setSaveDialogOpen(false);
    } catch (error) {
      console.error("Ошибка при сохранении фильтра:", error);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Фильтры</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {getActiveFiltersCount()} активных
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Свернуть
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Развернуть
              </>
            )}
          </Button>
          {onApplyFilters && (
            <Button size="sm" onClick={applyFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Применить
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Сбросить
          </Button>
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Сохранить фильтр</DialogTitle>
                <DialogDescription>Введите название для сохранения текущих настроек фильтра</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="filter-name" className="text-sm font-medium">
                    Название фильтра
                  </label>
                  <Input
                    id="filter-name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="Введите название..."
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveFilter} disabled={!filterName.trim() || createSavedFilter.isPending}>
                  {createSavedFilter.isPending ? "Сохранение..." : "Сохранить"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Быстрые фильтры - всегда видны */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Номера цистерн</label>
          <Input
            placeholder="Введите номера через запятую"
            value={filters.numbers?.join(", ") || ""}
            onChange={(e) =>
              handleFilterChange(
                "numbers",
                e.target.value
                  ? e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : undefined
              )
            }
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Регистрационные номера</label>
          <Input
            placeholder="Введите номера через запятую"
            value={filters.registrationNumbers?.join(", ") || ""}
            onChange={(e) =>
              handleFilterChange(
                "registrationNumbers",
                e.target.value
                  ? e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : undefined
              )
            }
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Серийные номера</label>
          <Input
            placeholder="Введите номера через запятую"
            value={filters.serialNumbers?.join(", ") || ""}
            onChange={(e) =>
              handleFilterChange(
                "serialNumbers",
                e.target.value
                  ? e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : undefined
              )
            }
            className="mt-1"
          />
        </div>
      </div>

      {/* Расширенные фильтры */}
      {expanded && (
        <div className="space-y-6 border-t pt-4">
          {/* Даты */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Даты производства</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Дата от</label>
                <Input
                  type="date"
                  value={filters.buildDateFrom || ""}
                  onChange={(e) => handleFilterChange("buildDateFrom", e.target.value || undefined)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Дата до</label>
                <Input
                  type="date"
                  value={filters.buildDateTo || ""}
                  onChange={(e) => handleFilterChange("buildDateTo", e.target.value || undefined)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Весовые характеристики */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Весовые характеристики</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Тара от (т)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.tareWeightFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("tareWeightFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Тара до (т)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.tareWeightTo || ""}
                  onChange={(e) =>
                    handleFilterChange("tareWeightTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Грузоподъёмность от (т)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.loadCapacityFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("loadCapacityFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Грузоподъёмность до (т)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.loadCapacityTo || ""}
                  onChange={(e) =>
                    handleFilterChange("loadCapacityTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Технические характеристики */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Технические характеристики</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Длина от (м)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.lengthFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("lengthFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Длина до (м)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.lengthTo || ""}
                  onChange={(e) => handleFilterChange("lengthTo", e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Объём от (м³)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.volumeFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("volumeFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Объём до (м³)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.volumeTo || ""}
                  onChange={(e) => handleFilterChange("volumeTo", e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Давление */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Характеристики давления</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Давление от (МПа)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={filters.pressureFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("pressureFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Давление до (МПа)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={filters.pressureTo || ""}
                  onChange={(e) =>
                    handleFilterChange("pressureTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Испытательное давление от (МПа)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={filters.testPressureFrom || ""}
                  onChange={(e) =>
                    handleFilterChange("testPressureFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Испытательное давление до (МПа)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={filters.testPressureTo || ""}
                  onChange={(e) =>
                    handleFilterChange("testPressureTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Справочные данные */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Справочные данные</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Производители</label>
                <select
                  multiple
                  value={filters.manufacturerIds || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleFilterChange("manufacturerIds", selectedValues.length > 0 ? selectedValues : undefined);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
                >
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Удерживайте Ctrl для множественного выбора</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Типы вагонов</label>
                <select
                  multiple
                  value={filters.typeIds || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleFilterChange("typeIds", selectedValues.length > 0 ? selectedValues : undefined);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
                >
                  {wagonTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Удерживайте Ctrl для множественного выбора</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Модели вагонов</label>
                <select
                  multiple
                  value={filters.modelIds || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleFilterChange("modelIds", selectedValues.length > 0 ? selectedValues : undefined);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
                >
                  {wagonModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Удерживайте Ctrl для множественного выбора</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Владельцы</label>
                <select
                  multiple
                  value={filters.ownerIds || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleFilterChange("ownerIds", selectedValues.length > 0 ? selectedValues : undefined);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
                >
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Удерживайте Ctrl для множественного выбора</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Принадлежности</label>
                <select
                  multiple
                  value={filters.affiliationIds || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleFilterChange("affiliationIds", selectedValues.length > 0 ? selectedValues : undefined);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
                >
                  {affiliations.map((affiliation) => (
                    <option key={affiliation.id} value={affiliation.id}>
                      {affiliation.value}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Удерживайте Ctrl для множественного выбора</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Сохранённые фильтры */}
      {savedFilters && savedFilters.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-md font-medium text-gray-900 mb-2">Сохранённые фильтры</h4>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((savedFilter) => (
              <Button
                key={savedFilter.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters(savedFilter.filter);
                  onFiltersChange(savedFilter.filter);
                }}
              >
                {savedFilter.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export { CisternFilters };
