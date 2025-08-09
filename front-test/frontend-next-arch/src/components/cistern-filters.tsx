"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, Check, ChevronsUpDown, X, Save, FolderOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface FilterValue {
  column: string;
  operator: string;
  value: string;
  values?: string[]; // для multi-select
  date?: Date;
}

interface SavedFilter {
  Id: string;
  Name: string;
  FilterJson: string;
  SortFieldsJson: string;
  UserId: string;
  CreatedAt: string | Date;
  UpdatedAt: string | Date;
}

// Компонент MultiSelect
function MultiSelect({ 
  options, 
  values = [], 
  onValuesChange, 
  placeholder = "Выберите значения",
  searchPlaceholder = "Поиск..."
}: { 
  options: Array<{ value: string; label: string }>;
  values?: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    onValuesChange(newValues);
  };

  const selectedLabels = values
    .map(value => options.find(opt => opt.value === value)?.label)
    .filter(Boolean);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 min-w-[300px] justify-between"
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedLabels.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selectedLabels.length <= 1 ? (
              selectedLabels.map((label, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))
            ) : (
              <>
                <Badge key="first" variant="secondary" className="text-xs">
                  {selectedLabels[0]}
                </Badge>
                <Badge key="more" variant="secondary" className="text-xs">
                  +{selectedLabels.length - 1} еще
                </Badge>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="min-h-min">
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Компонент DatePicker
function DatePicker({ 
  date, 
  onDateChange, 
  placeholder = "Выберите дату" 
}: { 
  date?: Date; 
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex-1 min-w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd.MM.yyyy", { locale: ru }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          locale={ru}
          showOutsideDays={false}
          captionLayout="dropdown"
          startMonth={new Date(1960, 0)}
          endMonth={new Date(2030, 11)}
        />
      </PopoverContent>
    </Popover>
  );
}

interface ColumnVisibility {
  [key: string]: boolean;
}

interface CisternFiltersProps {
  onFiltersChange: (filters: FilterValue[]) => void;
  onColumnsChange: (columns: ColumnVisibility) => void;
  initialColumns: ColumnVisibility;
  manufacturers: Array<{ id: string; name: string }>;
  wagonTypes: Array<{ id: string; name: string }>;
  affiliations: Array<{ id: string; value: string }>;
}

const defaultColumns: { [key: string]: { label: string; default: boolean } } = {
  number: { label: "Номер", default: true },
  registrationNumber: { label: "Рег. номер", default: true },
  manufacturer: { label: "Производитель", default: true },
  wagonType: { label: "Тип", default: true },
  buildDate: { label: "Год выпуска", default: true },
  volume: { label: "Объем, м³", default: true },
  tareWeight: { label: "Тара, т", default: false },
  loadCapacity: { label: "Грузоподъем, т", default: false },
  pressure: { label: "Давление, МПа", default: false },
  testPressure: { label: "Испытательное давление, МПа", default: false },
  substance: { label: "Вещество", default: false },
  dangerClass: { label: "Класс опасности", default: false },
  affiliation: { label: "Принадлежность", default: true },
  updatedAt: { label: "Обновлено", default: true },
  serialNumber: { label: "Серийный номер", default: false },
  length: { label: "Длина", default: false },
  axleCount: { label: "Количество осей", default: false },
  registrationDate: { label: "Дата регистрации", default: false },
  commissioningDate: { label: "Дата ввода в эксплуатацию", default: false },
  reRegistrationDate: { label: "Дата перерегистрации", default: false },
  periodMajorRepair: { label: "Период капремонта", default: false },
  periodPeriodicTest: { label: "Период периодических испытаний", default: false },
  periodIntermediateTest: { label: "Период промежуточных испытаний", default: false },
  periodDepotRepair: { label: "Период деповского ремонта", default: false },
  createdAt: { label: "Создано", default: false },
  fillingVolume: { label: "Объем налива, м³", default: false },
  initialTareWeight: { label: "Первоначальная тара, т", default: false },
  techConditions: { label: "Техусловия", default: false },
  pripiska: { label: "Приписка", default: false },
  rent: { label: "Аренда", default: false },
  serviceLifeYears: { label: "Срок службы, лет", default: false },
  tareWeight2: { label: "Тара 2, т", default: false },
  tareWeight3: { label: "Тара 3, т", default: false },
  notes: { label: "Примечания", default: false },
};

const filterOperators = [
  { value: "equals", label: "Равно" },
  { value: "contains", label: "Содержит" },
  { value: "startsWith", label: "Начинается с" },
  { value: "endsWith", label: "Заканчивается на" },
  { value: "in", label: "В списке" },
  { value: "gt", label: "Больше" },
  { value: "lt", label: "Меньше" },
  { value: "gte", label: "Больше или равно" },
  { value: "lte", label: "Меньше или равно" },
];

export function CisternFilters({
  onFiltersChange,
  onColumnsChange,
  initialColumns,
  manufacturers,
  wagonTypes,
  affiliations,
}: CisternFiltersProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [columns, setColumns] = useState<ColumnVisibility>(initialColumns);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");

  // Получаем данные авторизации
  const { data: authData } = useAuth();
  const userId = authData?.user?.id;

  // Загрузка сохраненных фильтров при монтировании компонента
  const fetchSavedFilters = useCallback(async () => {
    if (!userId) return;
    
    try {
      const response = await fetch(`/api/user/saved-filters?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched saved filters:", data);
        setSavedFilters(data);
      }
    } catch (error) {
      console.error("Error fetching saved filters:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchSavedFilters();
    }
  }, [userId, fetchSavedFilters]);

  const saveCurrentFilter = async () => {
    if (!userId || !filterName.trim()) return;

    const filterData = {
      filters: filters.map(f => ({
        ...f,
        date: f.date ? f.date.toISOString() : undefined
      })),
      columns
    };

    try {
      const response = await fetch("/api/user/saved-filters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name: filterName,
          filterJson: JSON.stringify(filterData.filters),
          sortFieldsJson: JSON.stringify(filterData.columns),
        }),
      });

      if (response.ok) {
        await fetchSavedFilters();
        setFilterName("");
        setSaveDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving filter:", error);
    }
  };

  const loadSavedFilter = (savedFilter: SavedFilter) => {
    try {
      // Проверяем, что данные существуют
      if (!savedFilter.FilterJson || !savedFilter.SortFieldsJson) {
        console.error("Missing FilterJson or SortFieldsJson in saved filter");
        return;
      }

      const parsedFilters = JSON.parse(savedFilter.FilterJson) as FilterValue[];
      const parsedColumns = JSON.parse(savedFilter.SortFieldsJson) as ColumnVisibility;

      // Восстанавливаем даты из строк
      const filtersWithDates = parsedFilters.map(f => ({
        ...f,
        date: f.date ? new Date(f.date) : undefined
      }));

      setFilters(filtersWithDates);
      setColumns(parsedColumns);
      
      // Применяем фильтры
      onFiltersChange(filtersWithDates.filter(f => {
        if (isMultiSelectColumn(f.column)) {
          return f.values && f.values.length > 0;
        }
        return f.value.trim() !== "";
      }));
      onColumnsChange(parsedColumns);
    } catch (error) {
      console.error("Error loading saved filter:", error);
    }
  };

  const deleteSavedFilter = async (filterId: string) => {
    try {
      const response = await fetch(`/api/user/saved-filters/${filterId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSavedFilters();
      }
    } catch (error) {
      console.error("Error deleting saved filter:", error);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { column: "number", operator: "contains", value: "", values: [], date: undefined }]);
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const updateFilter = (index: number, field: keyof FilterValue, value: string | Date | string[] | undefined) => {
    const newFilters = [...filters];
    if (field === "date") {
      newFilters[index] = { 
        ...newFilters[index], 
        date: value as Date | undefined, 
        value: value ? format(value as Date, "yyyy-MM-dd") : "" 
      };
    } else if (field === "values") {
      newFilters[index] = { 
        ...newFilters[index], 
        values: value as string[],
        value: (value as string[]).join(",") // для совместимости с существующей логикой
      };
    } else {
      newFilters[index] = { ...newFilters[index], [field]: value as string };
      // Сбросить дату и values если изменился столбец
      if (field === "column") {
        newFilters[index].date = undefined;
        newFilters[index].values = [];
        if (!isDateColumn(value as string)) {
          newFilters[index].value = "";
        }
        // Автоматически устанавливаем подходящий оператор для типа поля
        if (isMultiSelectColumn(value as string)) {
          newFilters[index].operator = "in";
        } else if (isDateColumn(value as string)) {
          newFilters[index].operator = "equals";
        } else {
          newFilters[index].operator = "contains";
        }
      }
    }
    setFilters(newFilters);
  };

  const isDateColumn = (column: string) => {
    return ["buildDate", "registrationDate", "commissioningDate", "reRegistrationDate", 
            "periodMajorRepair", "periodPeriodicTest", "periodIntermediateTest", 
            "periodDepotRepair", "updatedAt", "createdAt"].includes(column);
  };

  const isMultiSelectColumn = (column: string) => {
    return ["manufacturer", "wagonType", "affiliation", "substance", "dangerClass"].includes(column);
  };

  const handleColumnChange = (columnKey: string, checked: boolean) => {
    const newColumns = { ...columns, [columnKey]: checked };
    setColumns(newColumns);
  };

  const applyFilters = () => {
    // Фильтруем фильтры: для обычных полей проверяем value, для multi-select проверяем values
    const validFilters = filters.filter(f => {
      if (isMultiSelectColumn(f.column)) {
        return f.values && f.values.length > 0;
      }
      return f.value.trim() !== "";
    });
    onFiltersChange(validFilters);
    onColumnsChange(columns);
    setOpen(false);
  };

  const resetFilters = () => {
    setFilters([]);
    const resetColumns = Object.keys(defaultColumns).reduce((acc, key) => {
      acc[key] = defaultColumns[key].default;
      return acc;
    }, {} as ColumnVisibility);
    setColumns(resetColumns);
    onFiltersChange([]);
    onColumnsChange(resetColumns);
  };

  const getColumnOptions = () => {
    return Object.entries(defaultColumns).map(([key, config]) => ({
      value: key,
      label: config.label,
    }));
  };

  const getValueOptions = (column: string) => {
    switch (column) {
      case "manufacturer":
        return manufacturers.map(m => ({ value: m.id, label: m.name }));
      case "wagonType":
        return wagonTypes.map(w => ({ value: w.id, label: w.name }));
      case "affiliation":
        return affiliations.map(a => ({ value: a.id, label: a.value }));
      case "substance":
        return [
          { value: "СУГ", label: "СУГ" },
          { value: "Газ", label: "Газ" },
          { value: "Нефть", label: "Нефть" },
          { value: "Химикаты", label: "Химикаты" },
          { value: "Прочее", label: "Прочее" },
        ];
      case "dangerClass":
        return [
          { value: "0", label: "Не опасно (Класс 0)" },
          { value: "1", label: "Взрывчатые вещества (Класс 1)" },
          { value: "2", label: "Газы (Класс 2)" },
          { value: "3", label: "Легковоспламеняющиеся жидкости (Класс 3)" },
          { value: "4", label: "Легковоспламеняющиеся твердые вещества (Класс 4)" },
          { value: "5", label: "Окисляющие вещества (Класс 5)" },
          { value: "6", label: "Ядовитые вещества (Класс 6)" },
          { value: "7", label: "Радиоактивные материалы (Класс 7)" },
          { value: "8", label: "Коррозионные вещества (Класс 8)" },
          { value: "9", label: "Прочие опасные вещества (Класс 9)" },
        ];
      default:
        return [];
    }
  };

  const activeFiltersCount = filters.filter(f => {
    if (isMultiSelectColumn(f.column)) {
      return f.values && f.values.length > 0;
    }
    return f.value.trim() !== "";
  }).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Фильтры
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl sm:max-w-6xl md:max-w-6xl lg:max-w-6xl xl:max-w-5xl max-h-[90vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Настройки фильтров и столбцов</DialogTitle>
          <DialogDescription>
            Настройте отображение столбцов и примените фильтры для поиска цистерн
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Сохраненные фильтры */}
          {userId && savedFilters.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Сохраненные фильтры</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {savedFilters.map((savedFilter) => (
                  <div
                    key={savedFilter.Id}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadSavedFilter(savedFilter)}
                      className="flex-1 justify-start text-left"
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      {savedFilter.Name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSavedFilter(savedFilter.Id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userId && savedFilters.length > 0 && <Separator />}

          {/* Столбцы */}
          <div className="max-h-52 overflow-y-auto">
            <h3 className="text-lg font-medium mb-3">Отображаемые столбцы</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(defaultColumns).map(([key, config]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`column-${key}`}
                    checked={columns[key] || false}
                    onCheckedChange={(checked) => 
                      handleColumnChange(key, checked as boolean)
                    }
                  />
                  <Label htmlFor={`column-${key}`} className="text-sm">
                    {config.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Фильтры */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Фильтры</h3>
              <Button onClick={addFilter} variant="outline" size="sm">
                Добавить фильтр
              </Button>
            </div>

            <div className="space-y-3 max-h-40 overflow-y-auto">
              {filters.map((filter, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                  <Select
                    value={filter.column}
                    onValueChange={(value) => updateFilter(index, "column", value)}
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Выберите столбец" />
                    </SelectTrigger>
                    <SelectContent>
                      {getColumnOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateFilter(index, "operator", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Оператор" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOperators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {getValueOptions(filter.column).length > 0 ? (
                    isMultiSelectColumn(filter.column) ? (
                      <MultiSelect
                        options={getValueOptions(filter.column)}
                        values={filter.values || []}
                        onValuesChange={(values) => updateFilter(index, "values", values)}
                        placeholder="Выберите значения"
                        searchPlaceholder="Поиск..."
                      />
                    ) : (
                      <Select
                        value={filter.value}
                        onValueChange={(value) => updateFilter(index, "value", value)}
                      >
                        <SelectTrigger className="flex-1 min-w-[300px]">
                          <SelectValue placeholder="Выберите значение" />
                        </SelectTrigger>
                        <SelectContent>
                          {getValueOptions(filter.column).map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  ) : isDateColumn(filter.column) ? (
                    <DatePicker
                      date={filter.date}
                      onDateChange={(date) => updateFilter(index, "date", date)}
                      placeholder="Выберите дату"
                    />
                  ) : (
                    <Input
                      placeholder="Введите значение"
                      value={filter.value}
                      onChange={(e) => updateFilter(index, "value", e.target.value)}
                      className="flex-1 min-w-[300px]"
                    />
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFilter(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {filters.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Фильтры не заданы. Нажмите &quot;Добавить фильтр&quot; для создания нового фильтра.
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Кнопки действий */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Сбросить все
              </Button>
              {userId && (
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить фильтр
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Сохранить фильтр</DialogTitle>
                      <DialogDescription>
                        Введите название для сохранения текущих настроек фильтров
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Название фильтра"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button 
                          onClick={saveCurrentFilter}
                          disabled={!filterName.trim()}
                        >
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button onClick={applyFilters}>
                Применить
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
