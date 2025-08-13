using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class PartTypesController(ApplicationDbContext context) : BaseCrudController<PartType, PartTypeDto, CreatePartTypeDto, UpdatePartTypeDto>(context, "parttypes")
{
  protected override PartTypeDto MapToDto(PartType entity)
    {
        return new PartTypeDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = $"Код: {entity.Code}",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<PartType> MapToEntityAsync(CreatePartTypeDto createDto)
    {
        var entity = new PartType
        {
            Name = createDto.Name,
            Code = 0
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(PartType entity, UpdatePartTypeDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(PartType entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(PartType entity, bool isUpdate)
    {
        var existingQuery = _context.PartTypes.Where(pt => pt.Name == entity.Name);
        if (isUpdate)
            existingQuery = existingQuery.Where(pt => pt.Id != entity.Id);

        var exists = await existingQuery.AnyAsync();
        if (exists)
            throw new InvalidOperationException($"Тип части с именем '{entity.Name}' уже существует");

        if (!isUpdate && entity.Code == 0)
        {
            var maxCode = await _context.PartTypes.MaxAsync(pt => (int?)pt.Code) ?? 0;
            entity.Code = maxCode + 1;
        }
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(PartType entity)
    {
        var hasParts = await _context.Parts.AnyAsync(p => p.PartTypeId == entity.Id);

        if (hasParts)
            return (false, "Нельзя удалить тип части, который используется в частях");

        return (true, null);
    }
}
