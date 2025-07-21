import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/users/userApi';
import { LoginRequest, CreateUserRequest, UpdateUserRequest, UserListParams } from '@/types/user';
import { useUserStore } from '@/store/userStore';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams) => [...userKeys.lists(), { params }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  current: () => [...userKeys.all, 'current'] as const,
  permissions: (id: string) => [...userKeys.all, 'permissions', id] as const,
};

// Auth hooks
export function useLogin() {
  const setToken = useUserStore((state) => state.setToken);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => userApi.login(credentials),
    onSuccess: async (response) => {
      if (response.success && response.data) {
        setToken(response.data.accessToken, response.data.refreshToken);
        // Получаем данные пользователя после установки токена
        await getCurrentUser();
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => userApi.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
  });
}

export function useCurrentUser() {
  const token = useUserStore((state) => state.token);
  
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: () => userApi.getCurrentUser(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Не повторяем запрос при ошибке авторизации
  });
}

// User CRUD hooks
export function useUsers(params: UserListParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  });
}

export function useUserPermissions(userId: string) {
  return useQuery({
    queryKey: userKeys.permissions(userId),
    queryFn: () => userApi.getUserPermissions(userId),
    enabled: !!userId,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userApi.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userApi.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.current() });
    },
  });
}

export function useUpdateUserRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roles }: { id: string; roles: string[] }) =>
      userApi.updateUserRoles(id, roles),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.current() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
