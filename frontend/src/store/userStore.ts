import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, LoginRequest, CreateUserRequest, UpdateUserRequest, UserListParams } from '@/types/user';
import { userApi } from '@/api/users/userApi';

interface UserState {
  // Текущий пользователь
  currentUser: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Список пользователей
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  isLoadingUsers: boolean;

  // Фильтры
  filters: Partial<UserListParams>;

  // Базовые методы для управления состоянием
  setUser: (user: User) => void;
  setToken: (token: string, refreshToken?: string) => void;
  clearUser: () => void;

  // Методы аутентификации
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;

  // Методы управления пользователями
  fetchUsers: (params?: UserListParams) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;

  // Методы пагинации и фильтрации
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Partial<UserListParams>) => void;
  clearFilters: () => void;

  // Сброс состояния
  reset: () => void;
}

const initialState = {
  currentUser: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  users: [],
  totalUsers: 0,
  currentPage: 1,
  totalPages: 0,
  isLoadingUsers: false,
  filters: {}
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Базовые методы для управления состоянием
        setUser: (user: User) => set({ currentUser: user }),
        setToken: (token: string, refreshToken?: string) => set({ 
          token, 
          isAuthenticated: true,
          ...(refreshToken && { refreshToken }) 
        }),
        clearUser: () => set({ 
          currentUser: null, 
          token: null, 
          refreshToken: null, 
          isAuthenticated: false 
        }),

        // Аутентификация
        login: async (credentials: LoginRequest) => {
          set({ isLoading: true });
          try {
            const response = await userApi.login(credentials);
            
            // Сохраняем токены и устанавливаем authenticated в true
            set({
              token: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              isAuthenticated: true
            });
            
            // Небольшая задержка для сохранения в localStorage
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Получаем данные пользователя после сохранения токенов
            await get().getCurrentUser();
            
            set({ isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          try {
            // Вызываем logout из API для очистки localStorage
            await userApi.logout();
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            // Очищаем состояние пользователя
            set({
              currentUser: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false
            });
          }
        },

        getCurrentUser: async () => {
          const { token } = get();
          console.log('getCurrentUser called with token:', token ? 'exists' : 'missing');
          if (!token) return;

          try {
            const response = await userApi.getCurrentUser();
            console.log('getCurrentUser success:', response.data);
            set({ currentUser: response.data, isAuthenticated: true });
          } catch (error) {
            console.error('Get current user error:', error);
            get().clearUser();
          }
        },

        // Управление пользователями
        fetchUsers: async (params?: UserListParams) => {
          set({ isLoadingUsers: true });
          try {
            const { filters, currentPage } = get();
            const searchParams = {
              ...filters,
              ...params,
              page: params?.page || currentPage,
              limit: params?.limit || 10
            };

            const response = await userApi.getUsers(searchParams);
            set({
              users: response.data.data,
              totalUsers: response.data.total,
              totalPages: response.data.totalPages,
              currentPage: response.data.page,
              isLoadingUsers: false
            });
          } catch (error) {
            set({ isLoadingUsers: false });
            throw error;
          }
        },

        createUser: async (userData: CreateUserRequest) => {
          const response = await userApi.createUser(userData);
          // Обновляем список пользователей
          get().fetchUsers();
          return response.data;
        },

        updateUser: async (id: string, userData: UpdateUserRequest) => {
          const response = await userApi.updateUser(id, userData);
          const user = response.data;
          // Обновляем пользователя в списке
          const { users } = get();
          const updatedUsers = users.map(u => u.id === id ? user : u);
          set({ users: updatedUsers });
          
          // Если обновляем текущего пользователя
          const { currentUser } = get();
          if (currentUser?.id === id) {
            set({ currentUser: user });
          }
          
          return user;
        },

        deleteUser: async (id: string) => {
          await userApi.deleteUser(id);
          // Удаляем пользователя из списка
          const { users } = get();
          const filteredUsers = users.filter(u => u.id !== id);
          set({ users: filteredUsers });
        },

        // Пагинация и фильтрация
        setCurrentPage: (page: number) => {
          set({ currentPage: page });
          get().fetchUsers({ page });
        },

        setFilters: (filters: Partial<UserListParams>) => {
          set({ 
            filters: { ...get().filters, ...filters },
            currentPage: 1 
          });
          get().fetchUsers({ ...filters, page: 1 });
        },

        clearFilters: () => {
          set({ filters: {}, currentPage: 1 });
          get().fetchUsers({ page: 1 });
        },

        // Сброс состояния
        reset: () => set(initialState)
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          currentUser: state.currentUser,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
