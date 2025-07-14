import { Role } from './permissions';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  role: Role;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  role: Role;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilters {
  search?: string;
  role?: Role;
}

export interface UserListParams extends UserFilters {
  page?: number;
  limit?: number;
  sortBy?: 'firstName' | 'lastName' | 'email';
  sortOrder?: 'asc' | 'desc';
}
