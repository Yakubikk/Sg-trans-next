using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class ManufacturersController : BaseCrudController<Manufacturer, ManufacturerDto, CreateManufacturerDto, UpdateManufacturerDto>
{
    public ManufacturersController(ApplicationDbContext context) : base(context, "manufacturer")
    {
    }

    protected override ManufacturerDto MapToDto(Manufacturer entity)
    {
        return new ManufacturerDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Country = entity.Country,
            ShortName = entity.ShortName,
            Code = entity.Code,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt,
            CreatorId = entity.CreatorId
        };
    }

    protected override Task<Manufacturer> MapToEntityAsync(CreateManufacturerDto createDto)
    {
        var entity = new Manufacturer
        {
            Name = createDto.Name,
            Country = createDto.Country,
            ShortName = createDto.ShortName,
            Code = createDto.Code
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Manufacturer entity, UpdateManufacturerDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;
        
        if (!string.IsNullOrEmpty(updateDto.Country))
            entity.Country = updateDto.Country;
        
        if (updateDto.ShortName != null)
            entity.ShortName = updateDto.ShortName;
        
        if (updateDto.Code.HasValue)
            entity.Code = updateDto.Code.Value;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Manufacturer entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Manufacturer entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.Manufacturers.Where(m => m.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(m => m.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Производитель с именем '{entity.Name}' уже существует");

        // Проверка уникальности кода
        var existingByCodeQuery = _context.Manufacturers.Where(m => m.Code == entity.Code);
        if (isUpdate)
            existingByCodeQuery = existingByCodeQuery.Where(m => m.Id != entity.Id);

        var codeExists = await existingByCodeQuery.AnyAsync();
        if (codeExists)
            throw new InvalidOperationException($"Производитель с кодом '{entity.Code}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Manufacturer entity)
    {
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.ManufacturerId == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить производителя, который используется в железнодорожных цистернах");

        return (true, null);
    }
}
