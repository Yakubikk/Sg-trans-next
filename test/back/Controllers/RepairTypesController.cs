using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class RepairTypesController : BaseCrudController<RepairType, RepairTypeDto, CreateRepairTypeDto, UpdateRepairTypeDto>
{
    public RepairTypesController(ApplicationDbContext context) : base(context, "repairType")
    {
    }

    protected override RepairTypeDto MapToDto(RepairType entity)
    {
        return new RepairTypeDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            DurationDays = null, // В модели нет поля DurationDays
            CreatedAt = entity.CreatedAt,
            UpdatedAt = null, // В модели нет UpdatedAt
            CreatorId = null // В модели нет CreatorId
        };
    }

    protected override Task<RepairType> MapToEntityAsync(CreateRepairTypeDto createDto)
    {
        var entity = new RepairType
        {
            Name = createDto.Name,
            Description = createDto.Description,
            Code = GenerateCode(createDto.Name)
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(RepairType entity, UpdateRepairTypeDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
        {
            entity.Name = updateDto.Name;
            entity.Code = GenerateCode(updateDto.Name);
        }
        
        if (updateDto.Description != null)
            entity.Description = updateDto.Description;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(RepairType entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(RepairType entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingByNameQuery = _context.RepairTypes.Where(rt => rt.Name == entity.Name);
        if (isUpdate)
            existingByNameQuery = existingByNameQuery.Where(rt => rt.Id != entity.Id);

        var nameExists = await existingByNameQuery.AnyAsync();
        if (nameExists)
            throw new InvalidOperationException($"Тип ремонта с именем '{entity.Name}' уже существует");

        // Проверка уникальности кода
        var existingByCodeQuery = _context.RepairTypes.Where(rt => rt.Code == entity.Code);
        if (isUpdate)
            existingByCodeQuery = existingByCodeQuery.Where(rt => rt.Id != entity.Id);

        var codeExists = await existingByCodeQuery.AnyAsync();
        if (codeExists)
            throw new InvalidOperationException($"Тип ремонта с кодом '{entity.Code}' уже существует");
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(RepairType entity)
    {
        // Проверяем, используется ли тип ремонта
        var hasRepairs = await _context.Repairs.AnyAsync(r => r.RepairTypeId == entity.Id);
        if (hasRepairs)
            return (false, "Нельзя удалить тип ремонта, который используется в ремонтах");

        var hasMilageCisterns = await _context.MilageCisterns.AnyAsync(mc => mc.RepairTypeId == entity.Id);
        if (hasMilageCisterns)
            return (false, "Нельзя удалить тип ремонта, который используется в записях пробега цистерн");

        return (true, null);
    }

    private string GenerateCode(string name)
    {
        // Простая генерация кода на основе имени
        if (string.IsNullOrEmpty(name))
            return "UNK";

        var words = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (words.Length == 1)
            return words[0].Length >= 3 ? words[0].Substring(0, 3).ToUpper() : words[0].ToUpper();

        var code = "";
        foreach (var word in words.Take(3))
        {
            if (word.Length > 0)
                code += word[0];
        }

        return code.ToUpper();
    }
}
