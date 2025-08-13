using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using back.DTOs;
using back.Services;
using back.Attributes;
using System.Security.Claims;

namespace back.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

  /// <summary>
  /// Вход в систему
  /// </summary>
  /// <param name="loginDto">Данные для входа</param>
  /// <returns>JWT токен и информация о пользователе</returns>
  [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authService.LoginAsync(loginDto);
        if (result == null)
        {
            return Unauthorized("Неверные учетные данные");
        }

        return Ok(result);
    }

    /// <summary>
    /// Регистрация нового пользователя (только для администраторов)
    /// </summary>
    /// <param name="registerDto">Данные для регистрации</param>
    /// <returns>Информация о созданном пользователе</returns>
    [HttpPost("register")]
    [Authorize]
    [RequireRole("Admin")]
    [ProducesResponseType(typeof(UserDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authService.RegisterAsync(registerDto);
        if (result == null)
        {
            return BadRequest("Пользователь с таким email уже существует");
        }

        return Ok(result);
    }

    /// <summary>
    /// Получить информацию о текущем пользователе
    /// </summary>
    /// <returns>Информация о пользователе</returns>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(UserDto), 200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var user = await _authService.GetUserByIdAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    /// <summary>
    /// Проверка действительности токена
    /// </summary>
    /// <returns>Статус токена</returns>
    [HttpGet("validate")]
    [Authorize]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    public IActionResult ValidateToken()
    {
        return Ok(new { message = "Токен действителен" });
    }
}
