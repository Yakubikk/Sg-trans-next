class AppConstants {
  // API Configuration
  static const String baseUrl =
      'http://vagon.sgtrans.by:5000'; // Замените на ваш URL
  static const Duration connectionTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 10);

  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userIdKey = 'user_id';

  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;

  // App Info
  static const String appName = 'SG Trans Mobile';
  static const String appVersion = '1.0.0';

  // Validation
  static const int minPasswordLength = 6;
  static const int maxPasswordLength = 50;

  // UI
  static const double defaultPadding = 16.0;
  static const double smallPadding = 8.0;
  static const double largePadding = 24.0;
  static const double cardElevation = 2.0;
  static const double borderRadius = 8.0;
}
