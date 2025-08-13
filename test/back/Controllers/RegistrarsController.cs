using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class RegistrarsController : BaseCrudController<Registrar, RegistrarDto, CreateRegistrarDto, UpdateRegistrarDto>
{
    public RegistrarsController(ApplicationDbContext context) : base(context, "registrar")
    {
    }

    protected override RegistrarDto MapToDto(Registrar entity)
    {
        return new RegistrarDto
        {
            Id = entity.Id,
            Name = entity.Name,
            ShortName = null, // В модели нет поля ShortName
            Address = null, // В модели нет поля Address
            Code = null, // В модели нет поля Code
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<Registrar> MapToEntityAsync(CreateRegistrarDto createDto)
    {
        var entity = new Registrar
        {
            Name = createDto.Name
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Registrar entity, UpdateRegistrarDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Registrar entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Registrar entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.Registrars.Where(r => r.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(r => r.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Регистратор с именем '{entity.Name}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Registrar entity)
    {
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.RegistrarId == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить регистратора, который используется в железнодорожных цистернах");

        return (true, null);
    }
}
