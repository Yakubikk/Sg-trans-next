import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function getPluralForm(count: number, one: string, few: string, many: string): string {
  const remainder = count % 10;
  const remainder100 = count % 100;
  
  if (remainder100 >= 11 && remainder100 <= 19) {
    return many;
  }
  if (remainder === 1) {
    return one;
  }
  if (remainder >= 2 && remainder <= 4) {
    return few;
  }
  return many;
}
