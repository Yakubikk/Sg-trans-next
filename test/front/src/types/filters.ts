export interface SavedFilter {
  id: string;
  name: string;
  entityType: string;
  filterJson: string;
  sortFieldsJson: string;
  selectedColumnsJson: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedFilterDto {
  name: string;
  entityType: string;
  filterJson: string;
  sortFieldsJson: string;
  selectedColumnsJson: string;
  isDefault?: boolean;
}

export interface UpdateSavedFilterDto {
  name?: string;
  filterJson?: string;
  sortFieldsJson?: string;
  selectedColumnsJson?: string;
  isDefault?: boolean;
}

export interface ApplyFilterDto {
  filterId: string;
}

// Фильтр для одного поля
export interface FieldFilter {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Date | null | (string | number)[];
  dataType?: string;
}

// Группа фильтров с логическим оператором
export interface FilterGroup {
  operator: LogicalOperator;
  filters: (FieldFilter | FilterGroup)[];
}

// Сортировка
export interface SortField {
  field: string;
  direction: 'asc' | 'desc';
}

// Выбранные колонки
export interface SelectedColumn {
  field: string;
  visible: boolean;
  order?: number;
}

// Операторы фильтрации
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  GREATER_THAN = 'greaterThan',
  GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
  LESS_THAN = 'lessThan',
  LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
  IS_NULL = 'isNull',
  IS_NOT_NULL = 'isNotNull',
  IN = 'in',
  NOT_IN = 'notIn',
  BETWEEN = 'between',
  NOT_BETWEEN = 'notBetween'
}

// Логические операторы
export enum LogicalOperator {
  AND = 'and',
  OR = 'or'
}

// Типы данных для фильтров
export enum FilterDataType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  UUID = 'uuid'
}

// Конфигурация фильтра для поля
export interface FilterFieldConfig {
  field: string;
  label: string;
  dataType: FilterDataType;
  operators: FilterOperator[];
  options?: { value: string | number; label: string }[]; // Для селектов
  component?: 'input' | 'select' | 'date' | 'multiselect';
}

// Конфигурация таблицы для фильтрации
export interface TableFilterConfig {
  entityType: string;
  fields: FilterFieldConfig[];
  defaultSort?: SortField[];
  defaultColumns?: string[];
}
