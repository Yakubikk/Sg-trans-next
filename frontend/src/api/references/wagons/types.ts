// Типы для вагонов
export interface Wagon {
  id: string;
  number: number; // Номер
  way: string; // Путь
  assignment?: string; // Приписка
  ownerId?: number; // Владелец
  railwayCode?: string; // Код дороги
  loadCapacity?: number; // Грузоподъемность
  tare?: number; // Тара
  carFactoryNumberId?: string; // Заводской номер вагона
  carConstructionDate?: string; // Дата постройки вагона
  carBrand?: string; // Марка вагона
  carType?: string; // Тип вагона
  carLoadCapacityVol?: number; // Грузоподъемность вагона (объем)
  carTareVolume?: number; // Тара вагона (объем)
  carFactoryId?: number; // ID завода вагона
  carAxleLoad?: number; // Осевая нагрузка вагона
  carAirDistributor?: string; // Воздухораспределитель вагона
  carBrake?: string; // Тормоз вагона
  carAbsorberDevice?: string; // Поглощающий аппарат вагона
  carAbsorberDeviceAdd?: string; // Дополнительный поглощающий аппарат вагона
  carTele?: string; // Тележка вагона
  docAuthorId?: string; // ID автора документа
  docDate?: string; // Дата документа
  carAxles?: number; // Оси вагона
  carWheelset?: string; // Колесные пары вагона
  regNumber?: string; // Регистрационный номер
  regNumberDate?: string; // Дата регистрационного номера
  regNumberOrg?: string; // Организация, выдавшая рег. номер
  capacity?: number; // Емкость
  fillingLevel?: number; // Уровень наполнения
  carUser?: number; // Пользователь вагона
  carUserAddNorm?: number; // Дополнительная норма пользователя вагона
  carUserStartDate?: string; // Дата начала использования вагона
  carUserNoticeDate?: string; // Дата уведомления пользователя вагона
  createDate?: string; // Дата создания
  createUser?: string; // Пользователь, создавший запись
  modifiedDate?: string; // Дата изменения
  modifiedUser?: string; // Пользователь, изменивший запись
  oldCarTareVolume?: number; // Старая тара вагона (объем)
  weightVolume?: number; // Вес (объем)
  carTareWeight?: number; // Тара вагона (вес)
  carDescription?: string; // Описание вагона
  carInventory?: string; // Инвентарный номер вагона
  carUserAddNormId?: string; // ID доп. нормы пользователя вагона
  carUserAddNormDate?: string; // Дата доп. нормы пользователя вагона
  dataPPE?: string; // Дата ППЭ
  isActive: boolean; // Действует
  type?: string; // Тип
  mileageNorm?: number; // Норма пробега
  isLeased: boolean; // Аренда
  sug?: string; // СУГ
  class?: string; // Класс
  pressure?: number; // Давление
}

// Константы для статусов вагонов
export const WagonStatusLabels = {
  active: 'Активен',
  inactive: 'Неактивен',
  repair: 'В ремонте',
  leased: 'В аренде',
} as const;

export const WagonTypeLabels = {
  tank: 'Цистерна',
  hopper: 'Хоппер',
  gondola: 'Полувагон',
  boxcar: 'Крытый вагон',
  flatcar: 'Платформа',
} as const;

// Утилитарные функции для работы с вагонами
export const getWagonStatus = (wagon: Wagon): string => {
  if (!wagon.isActive) return WagonStatusLabels.inactive;
  if (wagon.isLeased) return WagonStatusLabels.leased;
  return WagonStatusLabels.active;
};

export const getWagonDisplayName = (wagon: Wagon): string => {
  return `Вагон №${wagon.number}${wagon.carBrand ? ` (${wagon.carBrand})` : ''}`;
};

export type WagonStatus = keyof typeof WagonStatusLabels;
export type WagonType = keyof typeof WagonTypeLabels;
