import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  LoginRequest, 
  LoginResponse, 
  ApiResponse, 
  PaginatedResponse, 
  UserListParams 
} from '@/types/user';
import { createApiInstance, AUTH_API_CONFIG } from '../core/apiInstance';
import { makeRequest } from '../core/requestHandler';

// Создаем экземпляр axios для пользователей
const authApiInstance = createApiInstance(AUTH_API_CONFIG);

// Аутентификация
export const login = async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return makeRequest<LoginResponse>(authApiInstance, 'post', '/users/login', credentials);
};

export const logout = async (): Promise<ApiResponse<void>> => {
  // Возвращаем успешный ответ без обращения к серверу
  return Promise.resolve({
    data: undefined as void,
    success: true,
    message: 'Успешный выход из системы'
  });
};

export const refreshToken = async (refreshToken: string): Promise<ApiResponse<LoginResponse>> => {
  return makeRequest<LoginResponse>(authApiInstance, 'post', '/users/refresh-token', { refreshToken });
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return makeRequest<User>(authApiInstance, 'get', '/users/me');
};

// CRUD операции для пользователей
export const getUsers = async (params: UserListParams = {}): Promise<ApiResponse<PaginatedResponse<User>>> => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.roles && params.roles.length > 0) {
    params.roles.forEach(role => queryParams.append('roles', role));
  }
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());

  const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return makeRequest<PaginatedResponse<User>>(authApiInstance, 'get', url);
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  return makeRequest<User>(authApiInstance, 'get', `/users/${id}`);
};

export const createUser = async (userData: CreateUserRequest): Promise<ApiResponse<User>> => {
  return makeRequest<User>(authApiInstance, 'post', '/users/register', userData);
};

export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> => {
  return makeRequest<User>(authApiInstance, 'put', `/users/${id}`, { ...userData, userId: id });
};

export const updateUserRoles = async (id: string, roles: string[]): Promise<ApiResponse<User>> => {
  return makeRequest<User>(authApiInstance, 'put', `/users/${id}/roles`, { userId: id, roles });
};

export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  return makeRequest<void>(authApiInstance, 'delete', `/users/${id}`);
};

export const getUserPermissions = async (userId: string): Promise<ApiResponse<string[]>> => {
  return makeRequest<string[]>(authApiInstance, 'get', `/users/${userId}/permissions`);
};

// Объект с API функциями для обратной совместимости
export const userApi = {
  login,
  logout,
  refreshToken,
  getCurrentUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRoles,
  deleteUser,
  getUserPermissions,
};
