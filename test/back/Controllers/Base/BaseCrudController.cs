using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using back.Models;
using back.DTOs;
using back.Attributes;
using System.Security.Claims;

namespace back.Controllers.Base;

[ApiController]
[Authorize]
[Produces("application/json")]
public abstract class BaseCrudController<TEntity, TDto, TCreateDto, TUpdateDto> : ControllerBase
    where TEntity : class
    where TDto : class
    where TCreateDto : class
    where TUpdateDto : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<TEntity> _dbSet;
    protected readonly string _entityName;

    protected BaseCrudController(ApplicationDbContext context, string entityName)
    {
        _context = context;
        _dbSet = _context.Set<TEntity>();
        _entityName = entityName.ToLower();
    }

    /// <summary>
    /// Получить список записей с пагинацией
    /// </summary>
    [HttpGet]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int size = 20, [FromQuery] string? search = null)
    {
        if (!HasPermission("read"))
            return Forbid();

        var skip = (page - 1) * size;
        
        var query = GetBaseQuery();
        
        if (!string.IsNullOrEmpty(search))
        {
            query = ApplySearch(query, search);
        }

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip(skip)
            .Take(size)
            .ToListAsync();

        var dtos = items.Select(MapToDto).ToList();

        var result = new PaginatedResult<TDto>
        {
            Items = dtos,
            TotalCount = totalCount,
            Page = page,
            Size = size
        };

        return Ok(result);
    }

    /// <summary>
    /// Получить список записей с применением сохраненного фильтра
    /// </summary>
    [HttpPost("apply-filter")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> GetAllWithFilter([FromBody] ApplyFilterDto applyFilterDto, [FromQuery] int page = 1, [FromQuery] int size = 20)
    {
        if (!HasPermission("read"))
            return Forbid();

        try
        {
            var userId = GetCurrentUserId();
            var savedFilter = await _context.SavedFilters
                .FirstOrDefaultAsync(f => f.Id == applyFilterDto.FilterId && f.UserId == userId);

            if (savedFilter == null)
                return NotFound("Сохраненный фильтр не найден");

            var skip = (page - 1) * size;
            var query = GetBaseQuery();

            // Применяем фильтрацию из сохраненного фильтра
            query = await ApplyFilterFromJson(query, savedFilter.FilterJson);

            // Применяем сортировку из сохраненного фильтра
            query = await ApplySortFromJson(query, savedFilter.SortFieldsJson);

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip(skip)
                .Take(size)
                .ToListAsync();

            var dtos = items.Select(MapToDto).ToList();

            // Применяем выбранные столбцы (если поддерживается)
            var filteredDtos = await ApplyColumnSelection(dtos, savedFilter.SelectedColumnsJson);

            var result = new PaginatedResult<TDto>
            {
                Items = filteredDtos,
                TotalCount = totalCount,
                Page = page,
                Size = size
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка при применении фильтра: {ex.Message}");
        }
    }

    /// <summary>
    /// Получить запись по ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> GetById(Guid id)
    {
        if (!HasPermission("read"))
            return Forbid();

        var query = GetBaseQuery();
        var entity = await GetEntityByIdQuery(query, id).FirstOrDefaultAsync();

        if (entity == null)
            return NotFound($"{_entityName} не найден");

        var dto = MapToDto(entity);
        return Ok(dto);
    }

    /// <summary>
    /// Создать новую запись
    /// </summary>
    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> Create([FromBody] TCreateDto createDto)
    {
        if (!HasPermission("create"))
            return Forbid();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var entity = await MapToEntityAsync(createDto);
            SetCreationInfo(entity);

            await ValidateEntity(entity, isUpdate: false);

            _dbSet.Add(entity);
            await _context.SaveChangesAsync();

            var dto = MapToDto(entity);
            return CreatedAtAction(nameof(GetById), new { id = GetEntityId(entity) }, dto);
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка при создании {_entityName}: {ex.Message}");
        }
    }

    /// <summary>
    /// Обновить существующую запись
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> Update(Guid id, [FromBody] TUpdateDto updateDto)
    {
        if (!HasPermission("update"))
            return Forbid();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
                return NotFound($"{_entityName} не найден");

            await ApplyUpdateAsync(entity, updateDto);
            SetUpdateInfo(entity);

            await ValidateEntity(entity, isUpdate: true);

            await _context.SaveChangesAsync();

            var dto = MapToDto(entity);
            return Ok(dto);
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка при обновлении {_entityName}: {ex.Message}");
        }
    }

    /// <summary>
    /// Удалить запись
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public virtual async Task<IActionResult> Delete(Guid id)
    {
        if (!HasPermission("delete"))
            return Forbid();

        try
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
                return NotFound($"{_entityName} не найден");

            // Проверить зависимости перед удалением
            var canDelete = await CanDeleteAsync(entity);
            if (!canDelete.CanDelete)
                return BadRequest(canDelete.Reason);

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка при удалении {_entityName}: {ex.Message}");
        }
    }

    // Абстрактные методы, которые должны быть реализованы в наследниках
    protected abstract TDto MapToDto(TEntity entity);
    protected abstract Task<TEntity> MapToEntityAsync(TCreateDto createDto);
    protected abstract Task ApplyUpdateAsync(TEntity entity, TUpdateDto updateDto);
    protected abstract Guid GetEntityId(TEntity entity);

    // Виртуальные методы с базовой реализацией
    protected virtual IQueryable<TEntity> GetBaseQuery()
    {
        return _dbSet.AsQueryable();
    }

    protected virtual IQueryable<TEntity> GetEntityByIdQuery(IQueryable<TEntity> query, Guid id)
    {
        // Базовая реализация для entities с Id свойством
        return query.Where(e => EF.Property<Guid>(e, "Id") == id);
    }

    protected virtual IQueryable<TEntity> ApplySearch(IQueryable<TEntity> query, string search)
    {
        // Базовая реализация - поиск по Name или Value, если есть
        try
        {
            // Сначала пробуем поиск по Name
            return query.Where(e => EF.Property<string>(e, "Name").Contains(search));
        }
        catch
        {
            try
            {
                // Если Name нет, пробуем по Value
                return query.Where(e => EF.Property<string>(e, "Value").Contains(search));
            }
            catch
            {
                return query; // Если ни одно поле не найдено, возвращаем исходный запрос
            }
        }
    }

    protected virtual void SetCreationInfo(TEntity entity)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var now = DateTime.UtcNow;

        try
        {
            // Пытаемся установить стандартные поля
            var idProperty = entity.GetType().GetProperty("Id");
            if (idProperty != null && idProperty.PropertyType == typeof(Guid))
            {
                idProperty.SetValue(entity, Guid.NewGuid());
            }

            var createdAtProperty = entity.GetType().GetProperty("CreatedAt");
            if (createdAtProperty != null)
            {
                createdAtProperty.SetValue(entity, now);
            }

            var creatorIdProperty = entity.GetType().GetProperty("CreatorId");
            if (creatorIdProperty != null && !string.IsNullOrEmpty(userId))
            {
                creatorIdProperty.SetValue(entity, userId);
            }
        }
        catch
        {
            // Игнорируем ошибки, если свойства не существуют
        }
    }

    protected virtual void SetUpdateInfo(TEntity entity)
    {
        var now = DateTime.UtcNow;

        try
        {
            var updatedAtProperty = entity.GetType().GetProperty("UpdatedAt");
            if (updatedAtProperty != null)
            {
                updatedAtProperty.SetValue(entity, now);
            }
        }
        catch
        {
            // Игнорируем ошибки, если свойство не существует
        }
    }

    protected virtual Task ValidateEntity(TEntity entity, bool isUpdate)
    {
        // Базовая валидация - может быть переопределена в наследниках
        return Task.CompletedTask;
    }

    protected virtual Task<(bool CanDelete, string? Reason)> CanDeleteAsync(TEntity entity)
    {
        // Базовая проверка - может быть переопределена в наследниках
        return Task.FromResult((true, (string?)null));
    }

    protected bool HasPermission(string action)
    {
        var permission = $"{_entityName}.{action}";
        return User.Claims.Any(c => c.Type == "Permission" && c.Value == permission);
    }

    protected Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("Пользователь не авторизован");
        }
        return userId;
    }

    protected virtual Task<IQueryable<TEntity>> ApplyFilterFromJson(IQueryable<TEntity> query, string filterJson)
    {
        if (string.IsNullOrEmpty(filterJson) || filterJson == "{}")
            return Task.FromResult(query);

        try
        {
            // Базовая реализация - просто возвращаем исходный запрос
            // Каждый наследник может переопределить этот метод для применения специфичных фильтров
            return Task.FromResult(query);
        }
        catch
        {
            return Task.FromResult(query);
        }
    }

    protected virtual Task<IQueryable<TEntity>> ApplySortFromJson(IQueryable<TEntity> query, string sortJson)
    {
        if (string.IsNullOrEmpty(sortJson) || sortJson == "[]")
            return Task.FromResult(query);

        try
        {
            // Базовая реализация - сортировка по Id
            IQueryable<TEntity> sortedQuery = query.OrderBy(e => EF.Property<Guid>(e, "Id"));
            return Task.FromResult(sortedQuery);
        }
        catch
        {
            return Task.FromResult(query);
        }
    }

    /// <summary>
    /// Применяет выбор колонок к списку DTO объектов
    /// </summary>
    /// <param name="dtos">Список DTO объектов</param>
    /// <param name="selectedColumnsJson">JSON с выбранными колонками</param>
    /// <returns>Отфильтрованный список DTO</returns>
    protected virtual Task<List<TDto>> ApplyColumnSelection(List<TDto> dtos, string selectedColumnsJson)
    {
        if (string.IsNullOrEmpty(selectedColumnsJson) || selectedColumnsJson == "[]")
            return Task.FromResult(dtos);

        try
        {
            // Базовая реализация - возвращаем все данные
            // Каждый наследник может переопределить для фильтрации столбцов
            return Task.FromResult(dtos);
        }
        catch
        {
            return Task.FromResult(dtos);
        }
    }
}
