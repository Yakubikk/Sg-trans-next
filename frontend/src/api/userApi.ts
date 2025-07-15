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
    patronymic: '',
    phoneNumber: '',
    role: Role.ADMIN,
  },
  {
    id: '3',
    email: 'user@example.com',
    firstName: 'Петр',
    lastName: 'Пользователев',
    patronymic: '',
    phoneNumber: '',
    role: Role.USER,
  }
];

// Симуляция задержки сети
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Генерация случайного ID
const generateId = () => Math.random().toString(36).substr(2, 9);

class UserApiService {
  private users: User[] = [...FAKE_USERS];

  // Получаем токен из localStorage (где его сохраняет Zustand persist)
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const persistedState = localStorage.getItem('user-store');
      console.log('getToken: persistedState from localStorage:', persistedState);
      
      if (persistedState) {
        const parsed = JSON.parse(persistedState);
        const token = parsed.state?.token || null;
        console.log('getToken: extracted token:', token);
        return token;
      }
    } catch (error) {
      console.error('Ошибка при получении токена из localStorage:', error);
    }
    return null;
  }

  // Получаем текущего пользователя из localStorage
  private getCurrentUserFromStorage(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const persistedState = localStorage.getItem('user-store');
      if (persistedState) {
        const parsed = JSON.parse(persistedState);
        return parsed.state?.currentUser || null;
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя из localStorage:', error);
    }
    return null;
  }

  // Аутентификация
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    await delay(800);

    const user = this.users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }
    
    const mockToken = `fake_token_${user.id}_${Date.now()}`;
    const mockRefreshToken = `fake_refresh_${user.id}_${Date.now()}`;

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
    
    return {
      success: true,
      data: undefined,
      message: 'Успешный выход из системы'
    };
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(300);

    const token = this.getToken();
    console.log('getCurrentUser: token from localStorage:', token);
    
    if (!token) {
      console.log('getCurrentUser: Токен не найден в localStorage');
      throw new Error('Токен не найден');
    }

    // Симулируем проверку токена - извлекаем ID пользователя
    const tokenParts = token.split('_');
    if (tokenParts.length < 3 || tokenParts[0] !== 'fake' || tokenParts[1] !== 'token') {
      console.log('getCurrentUser: Недействительный токен:', token);
      throw new Error('Недействительный токен');
    }

    const userId = tokenParts[2];
    const currentUser = this.users.find(u => u.id === userId);

    if (!currentUser) {
      console.log('getCurrentUser: Пользователь не найден для ID:', userId);
      throw new Error('Пользователь не найден');
    }

    console.log('getCurrentUser: Пользователь найден:', currentUser);
    return {
      success: true,
      data: currentUser
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
      patronymic: userData.patronymic,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
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
    };

    this.users[userIndex] = updatedUser;

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
    const currentUser = this.getCurrentUserFromStorage();
    if (currentUser?.id === id) {
      throw new Error('Нельзя удалить самого себя');
    }

    this.users.splice(userIndex, 1);

    return {
      success: true,
      data: undefined,
      message: 'Пользователь успешно удален'
    };
  }
}

// Экспортируем синглтон
export const userApi = new UserApiService();
