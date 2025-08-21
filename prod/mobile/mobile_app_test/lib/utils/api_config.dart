class ApiConfig {
  // Конфигурация API
  static const String baseUrl =
      'http://vagon.sgtrans.by:5000'; // Замените на ваш URL
  static const String apiVersion = 'v1';

  // Endpoints
  static const String authEndpoint = '/users';
  static const String cisternsEndpoint = '/api/railway-cisterns';
  static const String directoriesEndpoint = '/api/directories';

  // Headers
  static const Map<String, String> defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration sendTimeout = Duration(seconds: 30);

  // Response codes
  static const int successCode = 200;
  static const int createdCode = 201;
  static const int noContentCode = 204;
  static const int unauthorizedCode = 401;
  static const int forbiddenCode = 403;
  static const int notFoundCode = 404;
  static const int serverErrorCode = 500;

  // Retry configuration
  static const int maxRetries = 3;
  static const Duration retryDelay = Duration(seconds: 1);
}

// API Endpoints
class ApiEndpoints {
  // Auth endpoints
  static const String login = '/users/login';
  static const String register = '/users/register';
  static const String refreshToken = '/users/refresh-token';
  static const String currentUser = '/users/me';
  static const String allUsers = '/users';
  static const String userPermissions = '/users/{userId}/permissions';
  static const String allRoles = '/users/roles';

  // Cisterns endpoints
  static const String cisterns = '/api/railway-cisterns';
  static const String cisternsDetailed = '/api/railway-cisterns/detailed';
  static const String cisternsDetailedPaged =
      '/api/railway-cisterns/detailed/paged';
  static const String cisternsDetailedSearch =
      '/api/railway-cisterns/detailed/search';
  static const String cisternsNumbers = '/api/railway-cisterns/numbers';
  static const String cisternsNumbersSearch =
      '/api/railway-cisterns/numbers/search';
  static const String cisternById = '/api/railway-cisterns/{id}';
  static const String cisternsSearch = '/api/railway-cisterns/search';

  // Helper methods
  static String getCisternById(String id) => cisternById.replaceAll('{id}', id);
  static String getUserPermissions(String userId) =>
      userPermissions.replaceAll('{userId}', userId);
}
