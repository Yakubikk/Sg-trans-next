using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class LocationsController : BaseCrudController<Location, LocationDto, CreateLocationDto, UpdateLocationDto>
{
    public LocationsController(ApplicationDbContext context) : base(context, "location")
    {
    }

    protected override LocationDto MapToDto(Location entity)
    {
        return new LocationDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Address = null, // В модели нет отдельного поля Address
            Region = $"Тип: {entity.Type}", // Используем Type как Region
            Country = entity.Description, // Используем Description как Country
            CreatedAt = entity.CreatedAt,
            UpdatedAt = null,
            CreatorId = entity.CreatorId
        };
    }

    protected override Task<Location> MapToEntityAsync(CreateLocationDto createDto)
    {
        var entity = new Location
        {
            Name = createDto.Name,
            Type = 1, // Значение по умолчанию
            Description = createDto.Country
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Location entity, UpdateLocationDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;
        
        if (updateDto.Country != null)
            entity.Description = updateDto.Country;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Location entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Location entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.Locations.Where(l => l.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(l => l.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Местоположение с именем '{entity.Name}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Location entity)
    {
        // Проверяем, используется ли местоположение в установках частей
        var hasPartInstallationsFrom = await _context.PartInstallations
            .AnyAsync(pi => pi.FromLocationId == entity.Id);
        
        var hasPartInstallationsTo = await _context.PartInstallations
            .AnyAsync(pi => pi.ToLocationId == entity.Id);

        if (hasPartInstallationsFrom || hasPartInstallationsTo)
            return (false, "Нельзя удалить местоположение, которое используется в установках частей");

        return (true, null);
    }
}
