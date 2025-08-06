'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { CisternPassportCard } from '@/components/cards';
import { useRailwayCisternDetailedByNumber } from '@/hooks/references';
import { 
  MapPin, 
  FileText, 
  Settings, 
  History,
  Search,
  Loader2
} from 'lucide-react';

export default function CisternPassport() {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchedNumber, setSearchedNumber] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Автоматический поиск при загрузке компонента, если есть параметр search в URL
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchNumber(searchParam);
      setSearchedNumber(searchParam);
      // Очищаем URL параметр после использования
      router.replace('/cistern-passports', { scroll: false });
    }
  }, [searchParams, router]);

  const { 
    data: cistern, 
    isLoading, 
    error 
  } = useRailwayCisternDetailedByNumber(searchedNumber);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchNumber.trim()) {
      setSearchedNumber(searchNumber.trim());
    }
  };

  const navigateToSection = (section: string) => {
    if (searchedNumber) {
      router.push(`/cistern-passports/${encodeURIComponent(searchedNumber)}/${section}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Форма поиска */}
      <Card>
        <CardHeader>
          <CardTitle>Поиск цистерны по номеру</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Введите номер цистерны..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              disabled={!searchNumber.trim() || isLoading}
              className="px-6 py-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Найти паспорт
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Навигационные кнопки */}
      {cistern && (
        <Card>
          <CardHeader>
            <CardTitle>Разделы паспорта цистерны №{searchedNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => navigateToSection('cistern-location')}
                className="flex items-center justify-center gap-2 h-16"
              >
                <MapPin className="h-5 w-5" />
                <span>Локализация</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigateToSection('cistern-change-log')}
                className="flex items-center justify-center gap-2 h-16"
              >
                <FileText className="h-5 w-5" />
                <span>Журнал изменений</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigateToSection('repair-history')}
                className="flex items-center justify-center gap-2 h-16"
              >
                <Settings className="h-5 w-5" />
                <span>Сведения о ремонтах</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigateToSection('complectation-list')}
                className="flex items-center justify-center gap-2 h-16"
              >
                <History className="h-5 w-5" />
                <span>Лист комплектации</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Отображение результата поиска */}
      {isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin mr-3" />
              <span className="text-lg text-gray-600">Поиск цистерны...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-red-900 mb-2">Ошибка поиска</h2>
              <p className="text-red-700 mb-4">
                {error instanceof Error ? error.message : 'Не удалось найти цистерну'}
              </p>
              <Button
                onClick={() => setSearchedNumber('')}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Попробовать снова
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {searchedNumber && !isLoading && !error && !cistern && (
        <Card>
          <CardContent className="py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <div className="text-yellow-600 text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-yellow-900 mb-2">Цистерна не найдена</h2>
              <p className="text-yellow-700 mb-4">
                Цистерна с номером <strong>#{searchedNumber}</strong> не найдена в базе данных.
              </p>
              <p className="text-sm text-yellow-600">
                Проверьте правильность номера цистерны или обратитесь к администратору.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Отображение паспорта цистерны */}
      {cistern && (
        <CisternPassportCard cistern={cistern} />
      )}
    </div>
  );
}
