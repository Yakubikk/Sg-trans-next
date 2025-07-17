import { useState } from 'react';
import toast from 'react-hot-toast';

interface UseApiCallOptions {
  loadingMessage?: string;
  successMessage?: string | ((data: unknown) => string);
  errorMessage?: string | ((error: Error) => string);
}

interface UseApiCallReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (apiCall: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

export function useApiCall<T = unknown>(
  options: UseApiCallOptions = {}
): UseApiCallReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);

    let loadingToast: string | undefined;
    
    if (options.loadingMessage) {
      loadingToast = toast.loading(options.loadingMessage);
    }

    try {
      const result = await apiCall();
      setData(result);

      // Определяем сообщение об успехе
      let successMsg = 'Операция выполнена успешно';
      if (typeof options.successMessage === 'function') {
        successMsg = options.successMessage(result);
      } else if (options.successMessage) {
        successMsg = options.successMessage;
      }

      if (loadingToast) {
        toast.success(successMsg, { id: loadingToast });
      } else {
        toast.success(successMsg);
      }

      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Неизвестная ошибка');
      
      // Определяем сообщение об ошибке
      let errorMsg = errorObj.message;
      if (typeof options.errorMessage === 'function') {
        errorMsg = options.errorMessage(errorObj);
      } else if (options.errorMessage) {
        errorMsg = options.errorMessage;
      }

      setError(errorMsg);

      if (loadingToast) {
        toast.error(errorMsg, { id: loadingToast });
      } else {
        toast.error(errorMsg);
      }

      console.error('API Error:', errorObj);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
