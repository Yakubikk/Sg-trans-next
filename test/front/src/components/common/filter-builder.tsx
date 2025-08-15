'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DatePicker } from '@/components/ui/date-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { X, Plus, Filter, Save, RotateCcw } from 'lucide-react';
import { 
  FieldFilter, 
  FilterOperator, 
  FilterDataType, 
  FilterFieldConfig,
  SavedFilter 
} from '@/types/filters';
import { formatDateToString, parseDateFromString, isValidDateString } from '@/lib/utils/date';

interface FilterBuilderProps {
  fields: FilterFieldConfig[];
  filters: FieldFilter[];
  savedFilters: SavedFilter[];
  onFiltersChange: (filters: FieldFilter[]) => void;
  onSaveFilter: (name: string, isDefault?: boolean) => void;
  onApplyFilter: (filter: SavedFilter) => void;
  onDeleteFilter: (id: string) => void;
  isLoading?: boolean;
}

interface FilterRowProps {
  filter: FieldFilter;
  fields: FilterFieldConfig[];
  onUpdate: (filter: FieldFilter) => void;
  onRemove: () => void;
}

const operatorLabels: Record<FilterOperator, string> = {
  [FilterOperator.EQUALS]: 'Равно',
  [FilterOperator.NOT_EQUALS]: 'Не равно',
  [FilterOperator.CONTAINS]: 'Содержит',
  [FilterOperator.NOT_CONTAINS]: 'Не содержит',
  [FilterOperator.STARTS_WITH]: 'Начинается с',
  [FilterOperator.ENDS_WITH]: 'Заканчивается на',
  [FilterOperator.GREATER_THAN]: 'Больше',
  [FilterOperator.GREATER_THAN_OR_EQUAL]: 'Больше или равно',
  [FilterOperator.LESS_THAN]: 'Меньше',
  [FilterOperator.LESS_THAN_OR_EQUAL]: 'Меньше или равно',
  [FilterOperator.IS_NULL]: 'Пустое',
  [FilterOperator.IS_NOT_NULL]: 'Не пустое',
  [FilterOperator.IN]: 'В списке',
  [FilterOperator.NOT_IN]: 'Не в списке',
  [FilterOperator.BETWEEN]: 'Между',
  [FilterOperator.NOT_BETWEEN]: 'Не между',
};

function FilterRow({ filter, fields, onUpdate, onRemove }: FilterRowProps) {
  const field = fields.find(f => f.field === filter.field);
  
  const handleFieldChange = (fieldName: string) => {
    const newField = fields.find(f => f.field === fieldName);
    if (!newField) return;
    
    onUpdate({
      ...filter,
      field: fieldName,
      operator: newField.operators[0], // Берем первый доступный оператор
      value: '', // Сбрасываем значение при смене поля
    });
  };

  const handleOperatorChange = (operator: FilterOperator) => {
    onUpdate({
      ...filter,
      operator,
      value: operator === FilterOperator.IS_NULL || operator === FilterOperator.IS_NOT_NULL ? null : '',
    });
  };

  const handleValueChange = (value: string | number | boolean | null | (string | number)[]) => {
    onUpdate({
      ...filter,
      value,
    });
  };

  const renderValueInput = () => {
    if (filter.operator === FilterOperator.IS_NULL || filter.operator === FilterOperator.IS_NOT_NULL) {
      return null;
    }

    if (field?.component === 'select' && field.options) {
      return (
        <Select value={filter.value as string} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите значение" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map(option => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field?.dataType === FilterDataType.DATE) {
      // Для операторов диапазона используем DateRangePicker
      if (filter.operator === FilterOperator.BETWEEN || filter.operator === FilterOperator.NOT_BETWEEN) {
        let dateRange;
        try {
          const rangeValue = filter.value as string | [string, string];
          if (Array.isArray(rangeValue) && rangeValue.length === 2) {
            dateRange = {
              from: isValidDateString(rangeValue[0]) ? parseDateFromString(rangeValue[0]) : undefined,
              to: isValidDateString(rangeValue[1]) ? parseDateFromString(rangeValue[1]) : undefined
            };
          }
        } catch {
          dateRange = undefined;
        }

        return (
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={(range) => {
              console.log('DateRangePicker onChange:', range);
              if (range?.from && range?.to) {
                const rangeArray = [
                  formatDateToString(range.from),
                  formatDateToString(range.to)
                ];
                console.log('Formatted range array:', rangeArray);
                handleValueChange(rangeArray);
              } else {
                console.log('Clearing date range');
                handleValueChange('');
              }
            }}
            placeholder="Выберите диапазон дат"
          />
        );
      }

      // Для остальных операторов используем обычный DatePicker
      const currentDate = filter.value && isValidDateString(filter.value as string) 
        ? parseDateFromString(filter.value as string) 
        : undefined;
      return (
        <DatePicker
          date={currentDate}
          onDateChange={(date) => {
            const dateString = date ? formatDateToString(date) : '';
            handleValueChange(dateString);
          }}
          placeholder="Выберите дату"
        />
      );
    }

    if (field?.dataType === FilterDataType.NUMBER) {
      return (
        <Input
          type="number"
          value={filter.value as string}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder="Введите число"
        />
      );
    }

    return (
      <Input
        type="text"
        value={filter.value as string}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder="Введите значение"
      />
    );
  };

  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
      <Select value={filter.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fields.map(field => (
            <SelectItem key={field.field} value={field.field}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filter.operator} onValueChange={handleOperatorChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {field?.operators.map(operator => (
            <SelectItem key={operator} value={operator}>
              {operatorLabels[operator]}
            </SelectItem>
          )) || []}
        </SelectContent>
      </Select>

      <div className="flex-1">
        {renderValueInput()}
      </div>

      <Button variant="ghost" size="sm" onClick={onRemove}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function FilterBuilder({
  fields,
  filters,
  savedFilters,
  onFiltersChange,
  onSaveFilter,
  onApplyFilter,
  onDeleteFilter,
  isLoading = false,
}: FilterBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const addFilter = () => {
    const newFilter: FieldFilter = {
      field: fields[0]?.field || '',
      operator: fields[0]?.operators[0] || FilterOperator.EQUALS,
      value: '',
    };
    onFiltersChange([...filters, newFilter]);
  };

  const updateFilter = (index: number, filter: FieldFilter) => {
    const updatedFilters = filters.map((f, i) => i === index ? filter : f);
    onFiltersChange(updatedFilters);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    onFiltersChange([]);
  };

  const handleSaveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName.trim(), isDefault);
      setSaveDialogOpen(false);
      setFilterName('');
      setIsDefault(false);
    }
  };

  const activeFiltersCount = filters.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Сбросить
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSaveDialogOpen(true)}>
                <Save className="w-4 h-4 mr-1" />
                Сохранить
              </Button>
            </>
          )}
        </div>

        {savedFilters.length > 0 && (
          <Select onValueChange={(filterId) => {
            const filter = savedFilters.find(f => f.id === filterId);
            if (filter) onApplyFilter(filter);
          }}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Применить сохраненный фильтр" />
            </SelectTrigger>
            <SelectContent>
              {savedFilters.map(filter => (
                <SelectItem key={filter.id} value={filter.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{filter.name}</span>
                    {filter.isDefault && (
                      <Badge variant="outline" className="ml-2">По умолчанию</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {isOpen && (
        <div className="border rounded-lg p-4 bg-white">
          <div className="space-y-3">
            {filters.map((filter, index) => (
              <FilterRow
                key={index}
                filter={filter}
                fields={fields}
                onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
                onRemove={() => removeFilter(index)}
              />
            ))}
            
            {filters.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Фильтры не добавлены. Нажмите &quot;Добавить фильтр&quot; для начала.
              </p>
            )}
            
            <Button variant="outline" onClick={addFilter} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Добавить фильтр
            </Button>
          </div>
        </div>
      )}

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сохранить фильтр</DialogTitle>
            <DialogDescription>
              Введите название для сохранения текущих настроек фильтра
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="filter-name">Название фильтра</Label>
              <Input
                id="filter-name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Введите название фильтра"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is-default"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <Label htmlFor="is-default">Установить как фильтр по умолчанию</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveFilter} disabled={!filterName.trim()}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
