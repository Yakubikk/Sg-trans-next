using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class WagonTypesController : BaseCrudController<WagonType, WagonTypeDto, CreateWagonTypeDto, UpdateWagonTypeDto>
{
    public WagonTypesController(ApplicationDbContext context) : base(context, "wagonType")
    {
    }

    protected override WagonTypeDto MapToDto(WagonType entity)
    {
        return new WagonTypeDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Type, // Используем поле Type как описание
            Code = null, // В модели нет отдельного поля Code
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<WagonType> MapToEntityAsync(CreateWagonTypeDto createDto)
    {
        var entity = new WagonType
        {
            Name = createDto.Name,
            Type = createDto.Description ?? createDto.Name
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(WagonType entity, UpdateWagonTypeDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;
        
        if (!string.IsNullOrEmpty(updateDto.Description))
            entity.Type = updateDto.Description;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(WagonType entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(WagonType entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.WagonTypes.Where(wt => wt.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(wt => wt.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Тип вагона с именем '{entity.Name}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(WagonType entity)
    {
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.TypeId == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить тип вагона, который используется в железнодорожных цистернах");

        return (true, null);
    }
}
