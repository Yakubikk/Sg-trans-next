import { api } from '@/lib/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  RefreshTokenResponse,
  GetCurrentUserResponse,
  GetAllUsersResponse,
  Permission,
  GetAllRolesResponse,
  UpdateUserRequest,
  UpdateUserRolesRequest,
  ResetPasswordRequest,
} from '@/types/auth';

export const authApi = {
  // Public endpoints
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await api.post('/users/refresh-token', refreshToken);
    return response.data;
  },

  // Protected endpoints
  register: async (data: RegisterUserRequest): Promise<void> => {
    await api.post('/users/register', data);
  },

  getCurrentUser: async (): Promise<GetCurrentUserResponse> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  getAllUsers: async (): Promise<GetAllUsersResponse[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserPermissions: async (userId: string): Promise<Permission[]> => {
    const response = await api.get(`/users/${userId}/permissions`);
    return response.data;
  },

  getAllRoles: async (): Promise<GetAllRolesResponse[]> => {
    const response = await api.get('/users/roles');
    return response.data;
  },

  updateUser: async (userId: string, data: UpdateUserRequest): Promise<GetCurrentUserResponse> => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  updateUserRoles: async (userId: string, data: UpdateUserRolesRequest): Promise<GetCurrentUserResponse> => {
    const response = await api.put(`/users/${userId}/roles`, data);
    return response.data;
  },

  resetPassword: async (userId: string, data: ResetPasswordRequest): Promise<void> => {
    await api.put(`/users/${userId}/reset-password`, data);
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};
