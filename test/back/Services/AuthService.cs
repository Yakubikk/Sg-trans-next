using back.DTOs;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
    Task<UserDto?> RegisterAsync(RegisterDto registerDto);
    Task<UserDto?> GetUserByIdAsync(Guid userId);
}

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthService(ApplicationDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
    {
        var user = await _context.Users
            .Include(u => u.Roles)
            .ThenInclude(r => r.Permissions)
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            return null;
        }

        var roles = user.Roles.Select(r => r.Name).ToList();
        var permissions = user.Roles
            .SelectMany(r => r.Permissions)
            .Select(p => p.Name)
            .Distinct()
            .ToList();

        var token = _jwtService.GenerateToken(user.Id, user.Email, roles, permissions);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            FullName = $"{user.FirstName} {user.LastName}",
            Roles = roles,
            Permissions = permissions
        };
    }

    public async Task<UserDto?> RegisterAsync(RegisterDto registerDto)
    {
        // Проверяем, существует ли пользователь
        if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
        {
            return null;
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Patronymic = registerDto.Patronymic,
            PhoneNumber = registerDto.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        _context.Users.Add(user);

        // Добавляем роли
        if (registerDto.RoleIds.Any())
        {
            var roleQuery = _context.Roles.Where(r => registerDto.RoleIds.Contains(r.Id));
            var roles = await roleQuery.ToListAsync();
            
            user.Roles = roles;
        }

        await _context.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Patronymic = user.Patronymic,
            PhoneNumber = user.PhoneNumber,
            Roles = user.Roles.Select(r => r.Name).ToList()
        };
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid userId)
    {
        var user = await _context.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return null;

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Patronymic = user.Patronymic,
            PhoneNumber = user.PhoneNumber,
            Roles = user.Roles.Select(r => r.Name).ToList()
        };
    }
}
