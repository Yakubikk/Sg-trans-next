import 'package:shared_preferences/shared_preferences.dart';
import '../models/auth_models.dart';
import '../utils/api_config.dart';
import 'api_service.dart';

class AuthService {
  final ApiService _apiService;

  AuthService(this._apiService);

  // Login
  Future<LoginResponse> login(LoginRequest request) async {
    final response = await _apiService.post(
      ApiEndpoints.login,
      data: request.toJson(),
    );

    if (response.statusCode == ApiConfig.successCode) {
      final responseData = response.data;
      if (responseData == null) {
        throw Exception('Login failed: empty response');
      }

      final loginResponse = LoginResponse.fromJson(responseData);
      await _saveTokens(loginResponse);
      return loginResponse;
    } else {
      throw Exception(
        'Login failed: ${response.statusMessage ?? 'Unknown error'}',
      );
    }
  }

  // Register
  Future<void> register(RegisterUserRequest request) async {
    final response = await _apiService.post(
      ApiEndpoints.register,
      data: request.toJson(),
    );

    if (response.statusCode != ApiConfig.successCode &&
        response.statusCode != ApiConfig.createdCode) {
      throw Exception('Registration failed: ${response.statusMessage}');
    }
  }

  // Get current user
  Future<User> getCurrentUser() async {
    final response = await _apiService.get(ApiEndpoints.currentUser);

    if (response.statusCode == ApiConfig.successCode) {
      final responseData = response.data;
      if (responseData == null) {
        throw Exception('Failed to get current user: empty response');
      }
      return User.fromJson(responseData);
    } else {
      throw Exception(
        'Failed to get current user: ${response.statusMessage ?? 'Unknown error'}',
      );
    }
  }

  // Get all users
  Future<List<User>> getAllUsers() async {
    final response = await _apiService.get(ApiEndpoints.allUsers);

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data.map((json) => User.fromJson(json)).toList();
    } else {
      throw Exception('Failed to get users: ${response.statusMessage}');
    }
  }

  // Get user permissions
  Future<List<Permission>> getUserPermissions(String userId) async {
    final response = await _apiService.get(
      ApiEndpoints.getUserPermissions(userId),
    );

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data.map((json) => Permission.fromJson(json)).toList();
    } else {
      throw Exception(
        'Failed to get user permissions: ${response.statusMessage}',
      );
    }
  }

  // Get all roles
  Future<List<Role>> getAllRoles() async {
    final response = await _apiService.get(ApiEndpoints.allRoles);

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data.map((json) => Role.fromJson(json)).toList();
    } else {
      throw Exception('Failed to get roles: ${response.statusMessage}');
    }
  }

  // Logout
  Future<void> logout() async {
    await _clearTokens();
  }

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    final accessToken = prefs.getString('access_token');
    return accessToken != null;
  }

  // Save tokens to local storage
  Future<void> _saveTokens(LoginResponse loginResponse) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('access_token', loginResponse.accessToken);
    await prefs.setString('refresh_token', loginResponse.refreshToken);
  }

  // Clear tokens from local storage
  Future<void> _clearTokens() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('access_token');
    await prefs.remove('refresh_token');
  }
}
