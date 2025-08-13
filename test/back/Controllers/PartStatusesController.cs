using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class PartStatusesController : BaseCrudController<PartStatus, PartStatusDto, CreatePartStatusDto, UpdatePartStatusDto>
{
    public PartStatusesController(ApplicationDbContext context) : base(context, "partStatus")
    {
    }

    protected override PartStatusDto MapToDto(PartStatus entity)
    {
        return new PartStatusDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = $"Код: {entity.Code}", // Используем Code в качестве описания
            IsActive = true, // В модели нет поля IsActive, устанавливаем по умолчанию
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null,
            CreatorId = null
        };
    }

    protected override Task<PartStatus> MapToEntityAsync(CreatePartStatusDto createDto)
    {
        var entity = new PartStatus
        {
            Name = createDto.Name,
            Code = 0 // Код будет генерироваться автоматически
        };
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(PartStatus entity, UpdatePartStatusDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Name))
            entity.Name = updateDto.Name;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(PartStatus entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(PartStatus entity, bool isUpdate)
    {
        // Проверка уникальности имени
        var existingQuery = _context.PartStatuses.Where(ps => ps.Name == entity.Name);
        if (isUpdate)
            existingQuery = existingQuery.Where(ps => ps.Id != entity.Id);

        var exists = await existingQuery.AnyAsync();
        if (exists)
            throw new InvalidOperationException($"Статус части с именем '{entity.Name}' уже существует");

        // Генерация кода для новых записей
        if (!isUpdate && entity.Code == 0)
        {
            var maxCode = await _context.PartStatuses.MaxAsync(ps => (int?)ps.Code) ?? 0;
            entity.Code = maxCode + 1;
        }
    }

    protected override async Task<(bool CanDelete, string? Reason)> CanDeleteAsync(PartStatus entity)
    {
        // Проверяем, используется ли статус в частях
        var hasParts = await _context.Parts.AnyAsync(p => p.StatusId == entity.Id);

        if (hasParts)
            return (false, "Нельзя удалить статус части, который используется в частях");

        return (true, null);
    }
}
