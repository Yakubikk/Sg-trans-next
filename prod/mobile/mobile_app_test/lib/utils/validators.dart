class Validators {
  /// Валидация email
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email обязателен';
    }

    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return 'Введите корректный email адрес';
    }

    return null;
  }

  /// Валидация пароля
  static String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Пароль обязателен';
    }

    if (value.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }

    if (value.length > 50) {
      return 'Пароль не должен превышать 50 символов';
    }

    return null;
  }

  /// Валидация имени
  static String? validateName(String? value, {String fieldName = 'Поле'}) {
    if (value == null || value.isEmpty) {
      return '$fieldName обязательно';
    }

    if (value.length < 2) {
      return '$fieldName должно содержать минимум 2 символа';
    }

    if (value.length > 50) {
      return '$fieldName не должно превышать 50 символов';
    }

    return null;
  }

  /// Валидация номера телефона
  static String? validatePhoneNumber(String? value) {
    if (value == null || value.isEmpty) {
      return 'Номер телефона обязателен';
    }

    // Убираем все символы кроме цифр и +
    final cleanValue = value.replaceAll(RegExp(r'[^\d+]'), '');

    if (cleanValue.length < 10) {
      return 'Номер телефона слишком короткий';
    }

    if (cleanValue.length > 15) {
      return 'Номер телефона слишком длинный';
    }

    return null;
  }

  /// Валидация обязательного поля
  static String? validateRequired(String? value, {String fieldName = 'Поле'}) {
    if (value == null || value.isEmpty) {
      return '$fieldName обязательно';
    }
    return null;
  }

  /// Валидация числового поля
  static String? validateNumber(
    String? value, {
    String fieldName = 'Поле',
    double? min,
    double? max,
    bool required = false,
  }) {
    if (value == null || value.isEmpty) {
      if (required) {
        return '$fieldName обязательно';
      }
      return null;
    }

    final number = double.tryParse(value);
    if (number == null) {
      return '$fieldName должно быть числом';
    }

    if (min != null && number < min) {
      return '$fieldName должно быть больше или равно $min';
    }

    if (max != null && number > max) {
      return '$fieldName должно быть меньше или равно $max';
    }

    return null;
  }

  /// Валидация целого числа
  static String? validateInteger(
    String? value, {
    String fieldName = 'Поле',
    int? min,
    int? max,
    bool required = false,
  }) {
    if (value == null || value.isEmpty) {
      if (required) {
        return '$fieldName обязательно';
      }
      return null;
    }

    final number = int.tryParse(value);
    if (number == null) {
      return '$fieldName должно быть целым числом';
    }

    if (min != null && number < min) {
      return '$fieldName должно быть больше или равно $min';
    }

    if (max != null && number > max) {
      return '$fieldName должно быть меньше или равно $max';
    }

    return null;
  }

  /// Валидация даты
  static String? validateDate(
    String? value, {
    String fieldName = 'Дата',
    bool required = false,
  }) {
    if (value == null || value.isEmpty) {
      if (required) {
        return '$fieldName обязательна';
      }
      return null;
    }

    try {
      DateTime.parse(value);
      return null;
    } catch (e) {
      return '$fieldName имеет неверный формат';
    }
  }

  /// Валидация минимальной длины
  static String? validateMinLength(
    String? value,
    int minLength, {
    String fieldName = 'Поле',
  }) {
    if (value == null || value.isEmpty) {
      return '$fieldName обязательно';
    }

    if (value.length < minLength) {
      return '$fieldName должно содержать минимум $minLength символов';
    }

    return null;
  }

  /// Валидация максимальной длины
  static String? validateMaxLength(
    String? value,
    int maxLength, {
    String fieldName = 'Поле',
  }) {
    if (value != null && value.length > maxLength) {
      return '$fieldName не должно превышать $maxLength символов';
    }

    return null;
  }
}
