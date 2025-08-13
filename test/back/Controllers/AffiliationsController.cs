using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class AffiliationsController(ApplicationDbContext context) : BaseCrudController<Affiliation, AffiliationDto, CreateAffiliationDto, UpdateAffiliationDto>(context, "affiliations")
{
  protected override AffiliationDto MapToDto(Affiliation entity)
    {
        return new AffiliationDto
        {
            Id = entity.Id,
            Value = entity.Value,
            CreatedAt = DateTime.UtcNow, // Поскольку в модели нет CreatedAt
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<Affiliation> MapToEntityAsync(CreateAffiliationDto createDto)
    {
        var entity = new Affiliation
        {
            Value = createDto.Value
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Affiliation entity, UpdateAffiliationDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Value))
            entity.Value = updateDto.Value;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Affiliation entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Affiliation entity, bool isUpdate)
    {
        // Проверка уникальности значения
        var existingQuery = _context.Affiliations.Where(a => a.Value == entity.Value);
        if (isUpdate)
            existingQuery = existingQuery.Where(a => a.Id != entity.Id);

        var exists = await existingQuery.AnyAsync();
        if (exists)
            throw new InvalidOperationException($"Принадлежность с значением '{entity.Value}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Affiliation entity)
    {
        // Проверяем, используется ли принадлежность в цистернах
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.AffiliationId == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить принадлежность, которая используется в железнодорожных цистернах");

        return (true, null);
    }
}
