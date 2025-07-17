import { AxiosError } from 'axios';

// Функция для обработки ошибок axios
export const handleAxiosError = (error: AxiosError): Error => {
  let errorMessage = 'Произошла неизвестная ошибка';

  if (error.response) {
    // Ошибка от сервера (4xx, 5xx)
    const status = error.response.status;
    const data = error.response.data as { message?: string; error?: string } | undefined;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || 'Неверный запрос';
        break;
      case 401:
        errorMessage = 'Ошибка авторизации. Войдите в систему заново.';
        break;
      case 403:
        errorMessage = 'Недостаточно прав для выполнения операции.';
        break;
      case 404:
        errorMessage = 'Запрашиваемый ресурс не найден.';
        break;
      case 500:
        errorMessage = 'Внутренняя ошибка сервера.';
        break;
      case 502:
        errorMessage = 'Сервер недоступен. Попробуйте позже.';
        break;
      case 503:
        errorMessage = 'Сервис временно недоступен.';
        break;
      default:
        errorMessage = data?.message || data?.error || `HTTP Error: ${status}`;
    }
  } else if (error.request) {
    // Ошибка сети
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Превышено время ожидания ответа от сервера.';
    } else {
      errorMessage = 'Ошибка сети. Проверьте подключение к серверу.';
    }
  } else {
    // Другие ошибки
    errorMessage = error.message || 'Произошла неизвестная ошибка';
  }

  console.error('API Error:', errorMessage, error);
  return new Error(errorMessage);
};
