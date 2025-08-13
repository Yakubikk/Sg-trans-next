using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class OwnersController(ApplicationDbContext context) : BaseCrudController<Owner, OwnerDto, CreateOwnerDto, UpdateOwnerDto>(context, "owners")
{
  protected override OwnerDto MapToDto(Owner entity)
    {
        return new OwnerDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Unp = entity.Unp,
            ShortName = entity.ShortName,
            Address = entity.Address,
            TreatRepairs = entity.TreatRepairs,
            Code = entity.Code,
            CreatedAt = entity.CreatedAt ?? DateTime.UtcNow,
            UpdatedAt = entity.UpdatedAt,
            CreatorId = entity.CreatorId
        };
    }

    protected override Task<Owner> MapToEntityAsync(CreateOwnerDto createDto)
    {
        var entity = new Owner
        {
            Name = createDto.Name,
            Unp = createDto.Unp,
            ShortName = createDto.ShortName,
            Address = createDto.Address,
            TreatRepairs = createDto.TreatRepairs,
            Code = createDto.Code
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(Owner entity, UpdateOwnerDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;
        
        if (updateDto.Unp != null)
            entity.Unp = updateDto.Unp;
        
        if (!string.IsNullOrEmpty(updateDto.ShortName))
            entity.ShortName = updateDto.ShortName;
        
        if (updateDto.Address != null)
            entity.Address = updateDto.Address;
        
        if (updateDto.TreatRepairs.HasValue)
            entity.TreatRepairs = updateDto.TreatRepairs.Value;
        
        if (updateDto.Code.HasValue)
            entity.Code = updateDto.Code;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(Owner entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(Owner entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.Owners.Where(o => o.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(o => o.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Владелец с именем '{entity.Name}' уже существует");

        // Проверка уникальности УНП, если указан
        if (!string.IsNullOrEmpty(entity.Unp))
        {
            var existingByUnpQuery = _context.Owners.Where(o => o.Unp == entity.Unp);
            if (isUpdate)
                existingByUnpQuery = existingByUnpQuery.Where(o => o.Id != entity.Id);

            var unpExists = await existingByUnpQuery.AnyAsync();
            if (unpExists)
                throw new InvalidOperationException($"Владелец с УНП '{entity.Unp}' уже существует");
        }

        // Проверка уникальности кода, если указан
        if (entity.Code.HasValue)
        {
            var existingByCodeQuery = _context.Owners.Where(o => o.Code == entity.Code);
            if (isUpdate)
                existingByCodeQuery = existingByCodeQuery.Where(o => o.Id != entity.Id);

            var codeExists = await existingByCodeQuery.AnyAsync();
            if (codeExists)
                throw new InvalidOperationException($"Владелец с кодом '{entity.Code}' уже существует");
        }
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(Owner entity)
    {
        var hasRailwayCisterns = await _context.RailwayCisterns
            .AnyAsync(rc => rc.Ownerid == entity.Id);

        if (hasRailwayCisterns)
            return (false, "Нельзя удалить владельца, который используется в железнодорожных цистернах");

        return (true, null);
    }
}
