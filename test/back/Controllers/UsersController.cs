using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using back.Models;
using back.DTOs;
using back.Attributes;
using back.Controllers.Base;
using System.Security.Claims;

namespace back.Controllers;

/// <summary>
/// Контроллер для управления пользователями
/// </summary>
/// <remarks>
/// Инициализирует новый экземпляр контроллера пользователей
/// </remarks>
/// <param name="context">Контекст базы данных</param>
[Route("api/[controller]")]
[RequireRole("Admin")]
public class UsersController(ApplicationDbContext context) : BaseCrudController<User, UserDto, RegisterDto, UpdateUserDto>(context, "users")
{

  /// <summary>
  /// Получает базовый запрос для пользователей
  /// </summary>
  /// <returns>Запрос с включенными ролями</returns>
    protected override IQueryable<User> GetBaseQuery()
    {
        return _dbSet.Include(u => u.Roles);
    }

    /// <summary>
    /// Получает запрос для конкретного пользователя по ID с включенными ролями
    /// </summary>
    /// <param name="query">Базовый запрос</param>
    /// <param name="id">Идентификатор пользователя</param>
    /// <returns>Запрос для получения пользователя по ID</returns>
    protected override IQueryable<User> GetEntityByIdQuery(IQueryable<User> query, Guid id)
    {
        return query.Where(u => u.Id == id);
    }    /// <summary>
    /// Применяет поиск к запросу пользователей
    /// </summary>
    /// <param name="query">Базовый запрос</param>
    /// <param name="search">Поисковая строка</param>
    /// <returns>Запрос с примененным поиском</returns>
    protected override IQueryable<User> ApplySearch(IQueryable<User> query, string search)
    {
        var searchLower = search.ToLower();
        return query.Where(u => 
            u.FirstName.ToLower().Contains(searchLower) ||
            u.LastName.ToLower().Contains(searchLower) ||
            u.Email.ToLower().Contains(searchLower) ||
            u.PhoneNumber.Contains(search));
    }

    /// <summary>
    /// Преобразует сущность пользователя в DTO
    /// </summary>
    /// <param name="entity">Сущность пользователя</param>
    /// <returns>DTO пользователя</returns>
    protected override UserDto MapToDto(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            Email = entity.Email,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Patronymic = entity.Patronymic,
            PhoneNumber = entity.PhoneNumber,
            Roles = entity.Roles.Select(r => r.Name).ToList()
        };
    }

    /// <summary>
    /// Создает сущность пользователя из DTO для создания
    /// </summary>
    /// <param name="createDto">DTO для создания пользователя</param>
    /// <returns>Сущность пользователя</returns>
    protected override async Task<User> MapToEntityAsync(RegisterDto createDto)
    {
        // Хэширование пароля
        var passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(createDto.Password);
        
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = createDto.Email,
            FirstName = createDto.FirstName,
            LastName = createDto.LastName,
            Patronymic = createDto.Patronymic,
            PhoneNumber = createDto.PhoneNumber,
            PasswordHash = passwordHash
        };

        // Добавляем роли
        if (createDto.RoleIds.Any())
        {
            var roles = await _context.Roles
                .Where(r => createDto.RoleIds.Contains(r.Id))
                .ToListAsync();
            
            foreach (var role in roles)
            {
                user.Roles.Add(role);
            }
        }

        return user;
    }

    /// <summary>
    /// Применяет обновления к сущности пользователя
    /// </summary>
    /// <param name="entity">Сущность пользователя</param>
    /// <param name="updateDto">DTO для обновления</param>
    protected override async Task ApplyUpdateAsync(User entity, UpdateUserDto updateDto)
    {
        entity.Email = updateDto.Email ?? entity.Email;
        entity.FirstName = updateDto.FirstName ?? entity.FirstName;
        entity.LastName = updateDto.LastName ?? entity.LastName;
        entity.Patronymic = updateDto.Patronymic ?? entity.Patronymic;
        entity.PhoneNumber = updateDto.PhoneNumber ?? entity.PhoneNumber;

        // Обновляем роли, если они переданы
        if (updateDto.RoleIds != null)
        {
            // Загружаем текущие роли пользователя
            await _context.Entry(entity)
                .Collection(u => u.Roles)
                .LoadAsync();

            // Получаем новые роли из базы данных
            var newRoles = await _context.Roles
                .Where(r => updateDto.RoleIds.Contains(r.Id))
                .ToListAsync();

            // Находим роли для удаления (текущие роли, которых нет в новом списке)
            var rolesToRemove = entity.Roles
                .Where(currentRole => !updateDto.RoleIds.Contains(currentRole.Id))
                .ToList();

            // Находим роли для добавления (новые роли, которых нет у пользователя)
            var currentRoleIds = entity.Roles.Select(r => r.Id).ToList();
            var rolesToAdd = newRoles
                .Where(newRole => !currentRoleIds.Contains(newRole.Id))
                .ToList();

            // Удаляем роли
            foreach (var role in rolesToRemove)
            {
                entity.Roles.Remove(role);
            }

            // Добавляем новые роли
            foreach (var role in rolesToAdd)
            {
                entity.Roles.Add(role);
            }
        }
    }

    /// <summary>
    /// Получает идентификатор сущности пользователя
    /// </summary>
    /// <param name="entity">Сущность пользователя</param>
    /// <returns>Идентификатор пользователя</returns>
    protected override Guid GetEntityId(User entity)
    {
        return entity.Id;
    }

    /// <summary>
    /// Валидирует сущность пользователя
    /// </summary>
    /// <param name="entity">Сущность пользователя</param>
    /// <param name="isUpdate">Флаг обновления</param>
    protected override async Task ValidateEntity(User entity, bool isUpdate)
    {
        // Проверяем уникальность email
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == entity.Email && u.Id != entity.Id);
        
        if (existingUser != null)
        {
            throw new InvalidOperationException($"Пользователь с email {entity.Email} уже существует");
        }
    }
}
