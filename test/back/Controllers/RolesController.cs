using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using back.Models;
using back.Attributes;

namespace back.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces("application/json")]
public class RolesController(ApplicationDbContext context) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;

  /// <summary>
  /// Получить список всех ролей
  /// </summary>
  /// <returns>Список ролей с разрешениями</returns>
  [HttpGet]
    [RequirePermission("users.read")]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _context.Roles
            .Include(r => r.Permissions)
            .Select(r => new
            {
                r.Id,
                r.Name,
                Permissions = r.Permissions.Select(p => new { p.Id, p.Name }).ToList()
            })
            .ToListAsync();

        return Ok(roles);
    }

    /// <summary>
    /// Получить список всех разрешений
    /// </summary>
    /// <returns>Список разрешений</returns>
    [HttpGet("permissions")]
    [RequirePermission("users.read")]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetPermissions()
    {
        var permissions = await _context.PermissionEntities
            .Select(p => new { p.Id, p.Name })
            .ToListAsync();

        return Ok(permissions);
    }

    /// <summary>
    /// Получить статус инициализации системы
    /// </summary>
    /// <returns>Информация о состоянии инициализации</returns>
    [HttpGet("init-status")]
    [RequirePermission("admin.full")]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetInitializationStatus()
    {
        var rolesCount = await _context.Roles.CountAsync();
        var permissionsCount = await _context.PermissionEntities.CountAsync();
        var usersCount = await _context.Users.CountAsync();

        return Ok(new
        {
            RolesCount = rolesCount,
            PermissionsCount = permissionsCount,
            UsersCount = usersCount,
            IsInitialized = rolesCount > 0 && permissionsCount > 0
        });
    }
}
