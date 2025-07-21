'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  RailwayCisternCard 
} from "@/components";
import { useRailwayCisternByNumber } from '@/hooks';

interface SearchForm {
  wagonNumber: string;
}

export default function WagonPassportSearch() {
  const [searchNumber, setSearchNumber] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<SearchForm>({
    defaultValues: {
      wagonNumber: ''
    },
    mode: 'onChange'
  });

  const wagonNumber = watch('wagonNumber');
  
  const { 
    data: cistern, 
    isLoading, 
    error, 
    isError 
  } = useRailwayCisternByNumber(searchNumber);

  const onSubmit = () => {
    const trimmedNumber = wagonNumber?.trim();
    if (trimmedNumber && isValid) {
      setSearchNumber(trimmedNumber);
    }
  };

  const handleClear = () => {
    reset();
    setSearchNumber('');
    toast.success('Поиск очищен');
  };

  // Автоматический поиск при нажатии Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && wagonNumber?.trim() && isValid) {
        e.preventDefault();
        const trimmedNumber = wagonNumber.trim();
        setSearchNumber(trimmedNumber);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wagonNumber, isValid]);

  // Показываем toast при ошибках
  useEffect(() => {
    if (isError && error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
        toast.error('Цистерна с указанным номером не найдена');
      } else {
        toast.error('Ошибка при поиске вагона');
      }
    }
  }, [isError, error]);

  // Показываем toast при успешном поиске
  useEffect(() => {
    if (cistern && searchNumber) {
      toast.success(`Найдена цистерна: ${searchNumber}`);
    }
  }, [cistern, searchNumber]);

  return (
    <>
      {/* Поиск вагона */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Поиск вагона</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                {/* <label htmlFor="wagonNumber" className="block text-sm font-medium text-gray-700">
                  Номер вагона
                </label> */}
                <Input
                  id="wagonNumber"
                  type="text"
                  {...register('wagonNumber', {
                    required: 'Введите номер вагона',
                    minLength: {
                      value: 2,
                      message: 'Номер вагона должен содержать минимум 2 символа'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Номер вагона не может быть длиннее 20 символов'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\-_\s]+$/,
                      message: 'Номер может содержать только буквы, цифры, дефисы, подчеркивания и пробелы'
                    },
                    validate: {
                      notOnlySpaces: (value) => {
                        return value?.trim().length > 0 || 'Номер не может состоять только из пробелов';
                      }
                    }
                  })}
                  placeholder="Введите номер вагона"
                  disabled={isLoading}
                  aria-invalid={!!errors.wagonNumber}
                />
                {errors.wagonNumber && (
                  <p className="text-sm text-red-600">
                    {errors.wagonNumber.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-col justify-end">
                <Button
                  type="submit"
                  disabled={isLoading || !isValid || !wagonNumber?.trim()}
                  size="lg"
                >
                  {isLoading ? 'Поиск...' : 'Показать'}
                </Button>
                {(cistern || searchNumber) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleClear}
                  >
                    Очистить
                  </Button>
                )}
              </div>
            </div>

            {/* Индикатор поиска */}
            {searchNumber && !cistern && !isError && isLoading && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-600">
                  Выполняется поиск...
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Карточка вагона */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Паспортные данные</CardTitle>
            {cistern && searchNumber && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Найдено: {searchNumber}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {cistern ? (
            <RailwayCisternCard cistern={cistern} />
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Данные вагона не загружены</h3>
                <p className="text-gray-500">
                  Введите номер вагона и нажмите кнопку &quot;Показать&quot; для отображения паспортных данных
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
