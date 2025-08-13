using System.ComponentModel.DataAnnotations;

namespace back.DTOs;

/// <summary>
/// Данные для входа в систему
/// </summary>
public class LoginDto
{
    /// <summary>
    /// Email пользователя
    /// </summary>
    [Required(ErrorMessage = "Email обязателен")]
    [EmailAddress(ErrorMessage = "Неверный формат email")]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    [Required(ErrorMessage = "Пароль обязателен")]
    [MinLength(6, ErrorMessage = "Пароль должен содержать минимум 6 символов")]
    public string Password { get; set; } = string.Empty;
}

/// <summary>
/// Данные для регистрации пользователя
/// </summary>
public class RegisterDto
{
    /// <summary>
    /// Email пользователя
    /// </summary>
    [Required(ErrorMessage = "Email обязателен")]
    [EmailAddress(ErrorMessage = "Неверный формат email")]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    [Required(ErrorMessage = "Пароль обязателен")]
    [MinLength(6, ErrorMessage = "Пароль должен содержать минимум 6 символов")]
    public string Password { get; set; } = string.Empty;
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    [Required(ErrorMessage = "Имя обязательно")]
    public string FirstName { get; set; } = string.Empty;
    
    /// <summary>
    /// Фамилия пользователя
    /// </summary>
    [Required(ErrorMessage = "Фамилия обязательна")]
    public string LastName { get; set; } = string.Empty;
    
    /// <summary>
    /// Отчество пользователя
    /// </summary>
    public string Patronymic { get; set; } = string.Empty;
    
    /// <summary>
    /// Номер телефона пользователя
    /// </summary>
    [Required(ErrorMessage = "Номер телефона обязателен")]
    [Phone(ErrorMessage = "Неверный формат номера телефона")]
    public string PhoneNumber { get; set; } = string.Empty;
    
    /// <summary>
    /// Список идентификаторов ролей для назначения пользователю
    /// </summary>
    public List<int> RoleIds { get; set; } = new();
}

/// <summary>
/// Ответ с данными аутентификации
/// </summary>
public class AuthResponseDto
{
    /// <summary>
    /// JWT токен для доступа к API
    /// </summary>
    public string Token { get; set; } = string.Empty;
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Полное имя пользователя
    /// </summary>
    public string FullName { get; set; } = string.Empty;
    
    /// <summary>
    /// Список ролей пользователя
    /// </summary>
    public List<string> Roles { get; set; } = new();
    
    /// <summary>
    /// Список разрешений пользователя
    /// </summary>
    public List<string> Permissions { get; set; } = new();
}

/// <summary>
/// Информация о пользователе
/// </summary>
public class UserDto
{
    /// <summary>
    /// Уникальный идентификатор пользователя
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Email пользователя
    /// </summary>
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string FirstName { get; set; } = string.Empty;
    
    /// <summary>
    /// Фамилия пользователя
    /// </summary>
    public string LastName { get; set; } = string.Empty;
    
    /// <summary>
    /// Отчество пользователя
    /// </summary>
    public string Patronymic { get; set; } = string.Empty;
    
    /// <summary>
    /// Номер телефона пользователя
    /// </summary>
    public string PhoneNumber { get; set; } = string.Empty;
    
    /// <summary>
    /// Список ролей пользователя
    /// </summary>
    public List<string> Roles { get; set; } = new();
}
