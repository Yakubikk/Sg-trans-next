using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Models;
using back.DTOs;
using back.Attributes;
using System.Security.Claims;
using System.Text.Json;

namespace back.Controllers;

/// <summary>
/// Контроллер для управления сохраненными фильтрами пользователей
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SavedFiltersController(ApplicationDbContext context, ILogger<SavedFiltersController> logger) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;
    private readonly ILogger<SavedFiltersController> _logger = logger;

  /// <summary>
  /// Получить все сохраненные фильтры пользователя для определенного типа сущности
  /// </summary>
  [HttpGet("{entityType}")]
    [RequirePermission("references.read")]
    public async Task<ActionResult<List<SavedFilterDto>>> GetFiltersByEntityType(string entityType)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filters = await _context.SavedFilters
                .Where(f => f.UserId == userId && f.EntityType == entityType)
                .OrderBy(f => f.Name)
                .Select(f => new SavedFilterDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    EntityType = f.EntityType,
                    FilterJson = f.FilterJson,
                    SortFieldsJson = f.SortFieldsJson,
                    SelectedColumnsJson = f.SelectedColumnsJson,
                    IsDefault = f.IsDefault,
                    CreatedAt = f.CreatedAt,
                    UpdatedAt = f.UpdatedAt
                })
                .ToListAsync();

            return Ok(filters);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении фильтров для типа {EntityType}", entityType);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Получить все сохраненные фильтры пользователя
    /// </summary>
    [HttpGet]
    [RequirePermission("references.read")]
    public async Task<ActionResult<List<SavedFilterDto>>> GetAllFilters()
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filters = await _context.SavedFilters
                .Where(f => f.UserId == userId)
                .OrderBy(f => f.EntityType)
                .ThenBy(f => f.Name)
                .Select(f => new SavedFilterDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    EntityType = f.EntityType,
                    FilterJson = f.FilterJson,
                    SortFieldsJson = f.SortFieldsJson,
                    SelectedColumnsJson = f.SelectedColumnsJson,
                    IsDefault = f.IsDefault,
                    CreatedAt = f.CreatedAt,
                    UpdatedAt = f.UpdatedAt
                })
                .ToListAsync();

            return Ok(filters);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении всех фильтров пользователя");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Получить фильтр по ID
    /// </summary>
    [HttpGet("filter/{id}")]
    [RequirePermission("references.read")]
    public async Task<ActionResult<SavedFilterDto>> GetFilter(Guid id)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filter = await _context.SavedFilters
                .Where(f => f.Id == id && f.UserId == userId)
                .Select(f => new SavedFilterDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    EntityType = f.EntityType,
                    FilterJson = f.FilterJson,
                    SortFieldsJson = f.SortFieldsJson,
                    SelectedColumnsJson = f.SelectedColumnsJson,
                    IsDefault = f.IsDefault,
                    CreatedAt = f.CreatedAt,
                    UpdatedAt = f.UpdatedAt
                })
                .FirstOrDefaultAsync();

            if (filter == null)
            {
                return NotFound("Фильтр не найден");
            }

            return Ok(filter);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении фильтра {FilterId}", id);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Создать новый сохраненный фильтр
    /// </summary>
    [HttpPost]
    [RequirePermission("references.update")]
    public async Task<ActionResult<SavedFilterDto>> CreateFilter(CreateSavedFilterDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();

            // Проверяем валидность JSON
            if (!IsValidJson(dto.FilterJson) || !IsValidJson(dto.SortFieldsJson) || !IsValidJson(dto.SelectedColumnsJson))
            {
                return BadRequest("Некорректный формат JSON");
            }

            // Если устанавливается фильтр по умолчанию, снимаем флаг с других фильтров этого типа
            if (dto.IsDefault)
            {
                await RemoveDefaultFlagFromOtherFilters(userId, dto.EntityType);
            }

            var filter = new SavedFilter
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                EntityType = dto.EntityType,
                FilterJson = dto.FilterJson,
                SortFieldsJson = dto.SortFieldsJson,
                SelectedColumnsJson = dto.SelectedColumnsJson,
                IsDefault = dto.IsDefault,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.SavedFilters.Add(filter);
            await _context.SaveChangesAsync();

            var result = new SavedFilterDto
            {
                Id = filter.Id,
                Name = filter.Name,
                EntityType = filter.EntityType,
                FilterJson = filter.FilterJson,
                SortFieldsJson = filter.SortFieldsJson,
                SelectedColumnsJson = filter.SelectedColumnsJson,
                IsDefault = filter.IsDefault,
                CreatedAt = filter.CreatedAt,
                UpdatedAt = filter.UpdatedAt
            };

            return CreatedAtAction(nameof(GetFilter), new { id = filter.Id }, result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при создании фильтра");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Обновить сохраненный фильтр
    /// </summary>
    [HttpPut("{id}")]
    [RequirePermission("references.update")]
    public async Task<ActionResult<SavedFilterDto>> UpdateFilter(Guid id, UpdateSavedFilterDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filter = await _context.SavedFilters
                .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

            if (filter == null)
            {
                return NotFound("Фильтр не найден");
            }

            // Обновляем только переданные поля
            if (!string.IsNullOrEmpty(dto.Name))
            {
                filter.Name = dto.Name;
            }

            if (!string.IsNullOrEmpty(dto.FilterJson))
            {
                if (!IsValidJson(dto.FilterJson))
                {
                    return BadRequest("Некорректный формат JSON для фильтров");
                }
                filter.FilterJson = dto.FilterJson;
            }

            if (!string.IsNullOrEmpty(dto.SortFieldsJson))
            {
                if (!IsValidJson(dto.SortFieldsJson))
                {
                    return BadRequest("Некорректный формат JSON для сортировки");
                }
                filter.SortFieldsJson = dto.SortFieldsJson;
            }

            if (!string.IsNullOrEmpty(dto.SelectedColumnsJson))
            {
                if (!IsValidJson(dto.SelectedColumnsJson))
                {
                    return BadRequest("Некорректный формат JSON для столбцов");
                }
                filter.SelectedColumnsJson = dto.SelectedColumnsJson;
            }

            if (dto.IsDefault.HasValue)
            {
                if (dto.IsDefault.Value)
                {
                    await RemoveDefaultFlagFromOtherFilters(userId, filter.EntityType, id);
                }
                filter.IsDefault = dto.IsDefault.Value;
            }

            filter.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var result = new SavedFilterDto
            {
                Id = filter.Id,
                Name = filter.Name,
                EntityType = filter.EntityType,
                FilterJson = filter.FilterJson,
                SortFieldsJson = filter.SortFieldsJson,
                SelectedColumnsJson = filter.SelectedColumnsJson,
                IsDefault = filter.IsDefault,
                CreatedAt = filter.CreatedAt,
                UpdatedAt = filter.UpdatedAt
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при обновлении фильтра {FilterId}", id);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Удалить сохраненный фильтр
    /// </summary>
    [HttpDelete("{id}")]
    [RequirePermission("references.update")]
    public async Task<ActionResult> DeleteFilter(Guid id)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filter = await _context.SavedFilters
                .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

            if (filter == null)
            {
                return NotFound("Фильтр не найден");
            }

            _context.SavedFilters.Remove(filter);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при удалении фильтра {FilterId}", id);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Установить фильтр как фильтр по умолчанию
    /// </summary>
    [HttpPost("{id}/set-default")]
    [RequirePermission("references.update")]
    public async Task<ActionResult> SetAsDefault(Guid id)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filter = await _context.SavedFilters
                .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

            if (filter == null)
            {
                return NotFound("Фильтр не найден");
            }

            // Убираем флаг по умолчанию с других фильтров этого типа
            await RemoveDefaultFlagFromOtherFilters(userId, filter.EntityType, id);

            // Устанавливаем текущий фильтр как по умолчанию
            filter.IsDefault = true;
            filter.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при установке фильтра {FilterId} по умолчанию", id);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Получить фильтр по умолчанию для типа сущности
    /// </summary>
    [HttpGet("{entityType}/default")]
    [RequirePermission("references.read")]
    public async Task<ActionResult<SavedFilterDto>> GetDefaultFilter(string entityType)
    {
        try
        {
            var userId = GetCurrentUserId();
            
            var filter = await _context.SavedFilters
                .Where(f => f.UserId == userId && f.EntityType == entityType && f.IsDefault)
                .Select(f => new SavedFilterDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    EntityType = f.EntityType,
                    FilterJson = f.FilterJson,
                    SortFieldsJson = f.SortFieldsJson,
                    SelectedColumnsJson = f.SelectedColumnsJson,
                    IsDefault = f.IsDefault,
                    CreatedAt = f.CreatedAt,
                    UpdatedAt = f.UpdatedAt
                })
                .FirstOrDefaultAsync();

            if (filter == null)
            {
                return NotFound("Фильтр по умолчанию не найден");
            }

            return Ok(filter);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении фильтра по умолчанию для типа {EntityType}", entityType);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("Пользователь не авторизован");
        }
        return userId;
    }

    private static bool IsValidJson(string jsonString)
    {
        try
        {
            JsonDocument.Parse(jsonString);
            return true;
        }
        catch (JsonException)
        {
            return false;
        }
    }

    private async Task RemoveDefaultFlagFromOtherFilters(Guid userId, string entityType, Guid? excludeId = null)
    {
        var filtersToUpdate = await _context.SavedFilters
            .Where(f => f.UserId == userId && f.EntityType == entityType && f.IsDefault)
            .ToListAsync();

        if (excludeId.HasValue)
        {
            filtersToUpdate = filtersToUpdate.Where(f => f.Id != excludeId.Value).ToList();
        }

        foreach (var filterToUpdate in filtersToUpdate)
        {
            filterToUpdate.IsDefault = false;
            filterToUpdate.UpdatedAt = DateTime.UtcNow;
        }
    }
}
