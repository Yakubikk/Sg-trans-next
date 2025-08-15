/**
 * Утилиты для работы с датами без проблем с часовыми поясами
 */

/**
 * Форматирует дату в строку формата YYYY-MM-DD без учета часового пояса
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Парсит строку формата YYYY-MM-DD в дату без учета часового пояса
 */
export function parseDateFromString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Проверяет, является ли строка валидной датой в формате YYYY-MM-DD
 */
export function isValidDateString(dateString: string): boolean {
  if (!dateString) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  try {
    const date = parseDateFromString(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
