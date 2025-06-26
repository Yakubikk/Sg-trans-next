import { Role } from '@/types/permissions';
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

// Fake данные пользователей
const FAKE_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Админ',
    lastName: 'Системы',
    role: Role.ADMIN,
    isActive: true,
    isBanned: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    lastLoginAt: '2024-12-26T10:30:00.000Z',
    avatar: 'https://ui-avatars.com/api/?name=Admin+System&background=6366f1&color=fff'
  },
  {
    id: '2',
    email: 'manager@example.com',
    firstName: 'Иван',
    lastName: 'Менеджеров',
    role: Role.MANAGER,
    isActive: true,
    isBanned: false,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
    lastLoginAt: '2024-12-25T14:20:00.000Z',
    avatar: 'https://ui-avatars.com/api/?name=Ivan+Manager&background=10b981&color=fff'
  },
  {
    id: '3',
    email: 'user@example.com',
    firstName: 'Петр',
    lastName: 'Пользователев',
    role: Role.USER,
    isActive: true,
    isBanned: false,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    lastLoginAt: '2024-12-24T09:15:00.000Z',
    avatar: 'https://ui-avatars.com/api/?name=Petr+User&background=f59e0b&color=fff'
  },
  {
    id: '4',
    email: 'inactive@example.com',
    firstName: 'Анна',
    lastName: 'Неактивная',
    role: Role.USER,
    isActive: false,
    isBanned: false,
    createdAt: '2024-02-15T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Inactive&background=6b7280&color=fff'
  },
  {
    id: '5',
    email: 'banned@example.com',
    firstName: 'Сергей',
    lastName: 'Заблокированный',
    role: Role.USER,
    isActive: false,
    isBanned: true,
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
    lastLoginAt: '2024-03-15T16:45:00.000Z',
    avatar: 'https://ui-avatars.com/api/?name=Sergey+Banned&background=ef4444&color=fff'
  }
];

// Симуляция задержки сети
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Генерация случайного ID
const generateId = () => Math.random().toString(36).substr(2, 9);

class UserApiService {
  private users: User[] = [...FAKE_USERS];
  private currentUser: User | null = null;
  private token: string | null = null;

  // Аутентификация
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    await delay(800);

    const user = this.users.find(u => u.email === credentials.email && !u.isBanned);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    if (!user.isActive) {
      throw new Error('Аккаунт деактивирован');
    }

    // Обновляем время последнего входа
    user.lastLoginAt = new Date().toISOString();
    
    const mockToken = `fake_token_${user.id}_${Date.now()}`;
    const mockRefreshToken = `fake_refresh_${user.id}_${Date.now()}`;

    this.currentUser = user;
    this.token = mockToken;

    return {
      success: true,
      data: {
        user,
        token: mockToken,
        refreshToken: mockRefreshToken
      },
      message: 'Успешный вход в систему'
    };
  }

  async logout(): Promise<ApiResponse<void>> {
    await delay(200);
    
    this.currentUser = null;
    this.token = null;

    return {
      success: true,
      data: undefined,
      message: 'Успешный выход из системы'
    };
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(300);

    if (!this.currentUser || !this.token) {
      throw new Error('Пользователь не авторизован');
    }

    return {
      success: true,
      data: this.currentUser
    };
  }

  // CRUD операции для пользователей
  async getUsers(params: UserListParams = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
    await delay(600);

    let filteredUsers = [...this.users];

    // Применяем фильтры
    if (params.search) {
      const search = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    if (params.role) {
      filteredUsers = filteredUsers.filter(user => user.role === params.role);
    }

    if (params.isActive !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.isActive === params.isActive);
    }

    if (params.isBanned !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.isBanned === params.isBanned);
    }

    // Сортировка
    if (params.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[params.sortBy!] as string | undefined;
        const bValue = b[params.sortBy!] as string | undefined;
        
        if (!aValue && !bValue) return 0;
        if (!aValue) return 1;
        if (!bValue) return -1;
        
        if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Пагинация
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        data: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    };
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    await delay(300);

    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return {
      success: true,
      data: user
    };
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    await delay(800);

    // Проверяем, есть ли уже пользователь с таким email
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser: User = {
      id: generateId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      isActive: true,
      isBanned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.firstName + '+' + userData.lastName)}&background=6366f1&color=fff`
    };

    this.users.push(newUser);

    return {
      success: true,
      data: newUser,
      message: 'Пользователь успешно создан'
    };
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    await delay(600);

    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    // Проверяем email на уникальность, если он изменяется
    if (userData.email && userData.email !== this.users[userIndex].email) {
      const existingUser = this.users.find(u => u.email === userData.email && u.id !== id);
      if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
      }
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };

    // Обновляем аватар если изменилось имя
    if (userData.firstName || userData.lastName) {
      updatedUser.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedUser.firstName + '+' + updatedUser.lastName)}&background=6366f1&color=fff`;
    }

    this.users[userIndex] = updatedUser;

    // Если обновляем текущего пользователя
    if (this.currentUser?.id === id) {
      this.currentUser = updatedUser;
    }

    return {
      success: true,
      data: updatedUser,
      message: 'Пользователь успешно обновлен'
    };
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    await delay(500);

    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    // Нельзя удалить самого себя
    if (this.currentUser?.id === id) {
      throw new Error('Нельзя удалить самого себя');
    }

    this.users.splice(userIndex, 1);

    return {
      success: true,
      data: undefined,
      message: 'Пользователь успешно удален'
    };
  }

  async banUser(id: string): Promise<ApiResponse<User>> {
    await delay(400);

    return this.updateUser(id, { isBanned: true, isActive: false });
  }

  async unbanUser(id: string): Promise<ApiResponse<User>> {
    await delay(400);

    return this.updateUser(id, { isBanned: false, isActive: true });
  }

  async toggleUserStatus(id: string): Promise<ApiResponse<User>> {
    await delay(400);

    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return this.updateUser(id, { isActive: !user.isActive });
  }
}

// Экспортируем синглтон
export const userApi = new UserApiService();
