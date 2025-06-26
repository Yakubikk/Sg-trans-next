import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { userApi } from '@/api/userApi';
import { User, LoginRequest, CreateUserRequest, UpdateUserRequest, UserListParams } from '@/types/user';

interface UserState {
  // Текущий пользователь
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Список пользователей
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  isLoadingUsers: boolean;

  // Фильтры и поиск
  filters: UserListParams;

  // Действия для аутентификации
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;

  // Действия для управления пользователями
  fetchUsers: (params?: UserListParams) => Promise<void>;
  getUserById: (id: string) => Promise<User>;
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  banUser: (id: string) => Promise<User>;
  unbanUser: (id: string) => Promise<User>;
  toggleUserStatus: (id: string) => Promise<User>;

  // Действия для фильтров
  setFilters: (filters: Partial<UserListParams>) => void;
  clearFilters: () => void;

  // Утилиты
  reset: () => void;
}

const initialState = {
  currentUser: null,
  token: null,
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

        // Аутентификация
        login: async (credentials: LoginRequest) => {
          set({ isLoading: true });
          try {
            const response = await userApi.login(credentials);
            const { user, token } = response.data;
            
            set({
              currentUser: user,
              token,
              isAuthenticated: true,
              isLoading: false
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            await userApi.logout();
            set({
              ...initialState
            });
          } catch (error) {
            // Даже если запрос не удался, очищаем локальное состояние
            set({
              ...initialState
            });
            throw error;
          }
        },

        getCurrentUser: async () => {
          const { token } = get();
          if (!token) return;

          set({ isLoading: true });
          try {
            const response = await userApi.getCurrentUser();
            set({
              currentUser: response.data,
              isAuthenticated: true,
              isLoading: false
            });
          } catch (error) {
            set({
              currentUser: null,
              token: null,
              isAuthenticated: false,
              isLoading: false
            });
            throw error;
          }
        },

        // Управление пользователями
        fetchUsers: async (params?: UserListParams) => {
          set({ isLoadingUsers: true });
          try {
            const mergedParams = { ...get().filters, ...params };
            const response = await userApi.getUsers(mergedParams);
            const { data, total, page, totalPages } = response.data;
            
            set({
              users: data,
              totalUsers: total,
              currentPage: page,
              totalPages,
              isLoadingUsers: false,
              filters: mergedParams
            });
          } catch (error) {
            set({ isLoadingUsers: false });
            throw error;
          }
        },

        getUserById: async (id: string) => {
          const response = await userApi.getUserById(id);
          return response.data;
        },

        createUser: async (userData: CreateUserRequest) => {
          const response = await userApi.createUser(userData);
          const newUser = response.data;
          
          // Обновляем список пользователей
          set(state => ({
            users: [newUser, ...state.users],
            totalUsers: state.totalUsers + 1
          }));

          return newUser;
        },

        updateUser: async (id: string, userData: UpdateUserRequest) => {
          const response = await userApi.updateUser(id, userData);
          const updatedUser = response.data;
          
          // Обновляем пользователя в списке
          set(state => ({
            users: state.users.map(user => 
              user.id === id ? updatedUser : user
            ),
            currentUser: state.currentUser?.id === id ? updatedUser : state.currentUser
          }));

          return updatedUser;
        },

        deleteUser: async (id: string) => {
          await userApi.deleteUser(id);
          
          // Удаляем пользователя из списка
          set(state => ({
            users: state.users.filter(user => user.id !== id),
            totalUsers: state.totalUsers - 1
          }));
        },

        banUser: async (id: string) => {
          const response = await userApi.banUser(id);
          const updatedUser = response.data;
          
          // Обновляем пользователя в списке
          set(state => ({
            users: state.users.map(user => 
              user.id === id ? updatedUser : user
            )
          }));

          return updatedUser;
        },

        unbanUser: async (id: string) => {
          const response = await userApi.unbanUser(id);
          const updatedUser = response.data;
          
          // Обновляем пользователя в списке
          set(state => ({
            users: state.users.map(user => 
              user.id === id ? updatedUser : user
            )
          }));

          return updatedUser;
        },

        toggleUserStatus: async (id: string) => {
          const response = await userApi.toggleUserStatus(id);
          const updatedUser = response.data;
          
          // Обновляем пользователя в списке
          set(state => ({
            users: state.users.map(user => 
              user.id === id ? updatedUser : user
            )
          }));

          return updatedUser;
        },

        // Фильтры
        setFilters: (newFilters: Partial<UserListParams>) => {
          set(state => ({
            filters: { ...state.filters, ...newFilters }
          }));
        },

        clearFilters: () => {
          set({ filters: {} });
        },

        // Сброс состояния
        reset: () => {
          set(initialState);
        }
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          currentUser: state.currentUser,
          token: state.token,
          isAuthenticated: state.isAuthenticated
        })
      }
    ),
    {
      name: 'user-store'
    }
  )
);
