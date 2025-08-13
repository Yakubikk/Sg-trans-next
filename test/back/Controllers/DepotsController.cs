using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class DepotsController : BaseCrudController<Depot, DepotDto, CreateDepotDto, UpdateDepotDto>
{
    public DepotsController(ApplicationDbContext context) : base(context, "depot")
    {
    }

    protected override DepotDto MapToDto(Depot entity)
    {
        return new DepotDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Code = entity.Code,
            Location = entity.Location,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = null, // В модели нет UpdatedAt
            CreatorId = entity.CreatorId
        };
    }

    protected override Task<Depot> MapToEntityAsync(CreateDepotDto createDto)
    {
        var entity = new Depot
        {
            Name = createDto.Name,
            Code = createDto.Code,
            Location = createDto.Location
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Depot entity, UpdateDepotDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;
        
        if (!string.IsNullOrEmpty(updateDto.Code))
            entity.Code = updateDto.Code;
        
        if (updateDto.Location != null)
            entity.Location = updateDto.Location;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Depot entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Depot entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.Depots.Where(d => d.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(d => d.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Депо с именем '{entity.Name}' уже существует");

        // Проверка уникальности кода
        var existingByCodeQuery = _context.Depots.Where(d => d.Code == entity.Code);
        if (isUpdate)
            existingByCodeQuery = existingByCodeQuery.Where(d => d.Id != entity.Id);

        var codeExists = await existingByCodeQuery.AnyAsync();
        if (codeExists)
            throw new InvalidOperationException($"Депо с кодом '{entity.Code}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Depot entity)
    {
        // Проверяем, используется ли депо в частях или ремонтах
        var hasParts = await _context.Parts.AnyAsync(p => p.DepotId == entity.Id);
        if (hasParts)
            return (false, "Нельзя удалить депо, которое используется в частях");

        var hasRepairs = await _context.Repairs.AnyAsync(r => r.DepotId == entity.Id);
        if (hasRepairs)
            return (false, "Нельзя удалить депо, которое используется в ремонтах");

        return (true, null);
    }
}
