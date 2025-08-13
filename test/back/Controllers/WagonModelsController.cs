using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class WagonModelsController : BaseCrudController<WagonModel, WagonModelDto, CreateWagonModelDto, UpdateWagonModelDto>
{
    public WagonModelsController(ApplicationDbContext context) : base(context, "wagonModel")
    {
    }

    protected override WagonModelDto MapToDto(WagonModel entity)
    {
        return new WagonModelDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Code = null, // В модели нет поля Code
            WagonTypeId = null, // В модели нет связи с WagonType
            WagonType = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<WagonModel> MapToEntityAsync(CreateWagonModelDto createDto)
    {
        var entity = new WagonModel
        {
            Name = createDto.Name
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(WagonModel entity, UpdateWagonModelDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(WagonModel entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(WagonModel entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.WagonModels.Where(wm => wm.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(wm => wm.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Модель вагона с именем '{entity.Name}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(WagonModel entity)
    {
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.ModelId == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить модель вагона, которая используется в железнодорожных цистернах");

        return (true, null);
    }
}
