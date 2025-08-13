using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;

namespace back.Controllers;

[Route("api/[controller]")]
public class RailwayCisternsController(ApplicationDbContext context) : BaseCrudController<RailwayCistern, RailwayCisternDto, CreateRailwayCisternDto, UpdateRailwayCisternDto>(context, "cisterns")
{
    protected override RailwayCisternDto MapToDto(RailwayCistern entity)
    {
        return new RailwayCisternDto
        {
            Id = entity.Id,
            Number = entity.Number,
            ManufacturerId = entity.ManufacturerId,
            ManufacturerName = entity.Manufacturer?.Name,
            BuildDate = entity.BuildDate,
            TareWeight = entity.TareWeight,
            LoadCapacity = entity.LoadCapacity,
            Length = entity.Length,
            AxleCount = entity.AxleCount,
            Volume = entity.Volume,
            FillingVolume = entity.FillingVolume,
            InitialTareWeight = entity.InitialTareWeight,
            TypeId = entity.TypeId,
            TypeName = entity.Type?.Name,
            ModelId = entity.ModelId,
            ModelName = entity.Model?.Name,
            CommissioningDate = entity.CommissioningDate,
            SerialNumber = entity.SerialNumber,
            RegistrationNumber = entity.RegistrationNumber,
            RegistrationDate = entity.RegistrationDate,
            RegistrarId = entity.RegistrarId,
            RegistrarName = entity.Registrar?.Name,
            Notes = entity.Notes,
            Ownerid = entity.Ownerid,
            OwnerName = entity.Owner?.Name,
            TechСonditions = entity.TechСonditions,
            Pripiska = entity.Pripiska,
            ReRegistrationDate = entity.ReRegistrationDate,
            Pressure = entity.Pressure,
            TestPressure = entity.TestPressure,
            Rent = entity.Rent,
            AffiliationId = entity.AffiliationId,
            AffiliationName = entity.Affiliation?.Value,
            ServiceLifeYears = entity.ServiceLifeYears,
            PeriodMajorRepair = entity.PeriodMajorRepair,
            PeriodPeriodicTest = entity.PeriodPeriodicTest,
            PeriodIntermediateTest = entity.PeriodIntermediateTest,
            PeriodDepotRepair = entity.PeriodDepotRepair,
            DangerClass = entity.DangerClass,
            Substance = entity.Substance,
            TareWeight2 = entity.TareWeight2,
            TareWeight3 = entity.TareWeight3
        };
    }

    protected override Task<RailwayCistern> MapToEntityAsync(CreateRailwayCisternDto createDto)
    {
        var entity = new RailwayCistern
        {
            Number = createDto.Number,
            ManufacturerId = createDto.ManufacturerId,
            BuildDate = createDto.BuildDate,
            TareWeight = createDto.TareWeight,
            LoadCapacity = createDto.LoadCapacity,
            Length = createDto.Length,
            AxleCount = createDto.AxleCount,
            Volume = createDto.Volume,
            FillingVolume = createDto.FillingVolume,
            InitialTareWeight = createDto.InitialTareWeight,
            TypeId = createDto.TypeId,
            ModelId = createDto.ModelId,
            CommissioningDate = createDto.CommissioningDate,
            SerialNumber = createDto.SerialNumber,
            RegistrationNumber = createDto.RegistrationNumber,
            RegistrationDate = createDto.RegistrationDate,
            RegistrarId = createDto.RegistrarId,
            Notes = createDto.Notes,
            Ownerid = createDto.Ownerid,
            TechСonditions = createDto.TechСonditions,
            Pripiska = createDto.Pripiska,
            ReRegistrationDate = createDto.ReRegistrationDate,
            Pressure = createDto.Pressure,
            TestPressure = createDto.TestPressure,
            Rent = createDto.Rent,
            AffiliationId = createDto.AffiliationId,
            ServiceLifeYears = createDto.ServiceLifeYears,
            PeriodMajorRepair = createDto.PeriodMajorRepair,
            PeriodPeriodicTest = createDto.PeriodPeriodicTest,
            PeriodIntermediateTest = createDto.PeriodIntermediateTest,
            PeriodDepotRepair = createDto.PeriodDepotRepair,
            DangerClass = createDto.DangerClass,
            Substance = createDto.Substance,
            TareWeight2 = createDto.TareWeight2,
            TareWeight3 = createDto.TareWeight3,
            CreatedAt = DateTime.UtcNow,
            CreatorId = GetCurrentUserId().ToString()
        };
        
        return Task.FromResult(entity);
    }

    protected override Task ApplyUpdateAsync(RailwayCistern entity, UpdateRailwayCisternDto updateDto)
    {
        if (!string.IsNullOrEmpty(updateDto.Number))
            entity.Number = updateDto.Number;
            
        if (updateDto.ManufacturerId.HasValue)
            entity.ManufacturerId = updateDto.ManufacturerId.Value;
            
        if (updateDto.BuildDate.HasValue)
            entity.BuildDate = updateDto.BuildDate.Value;
            
        if (updateDto.TareWeight.HasValue)
            entity.TareWeight = updateDto.TareWeight.Value;
            
        if (updateDto.LoadCapacity.HasValue)
            entity.LoadCapacity = updateDto.LoadCapacity.Value;
            
        if (updateDto.Length.HasValue)
            entity.Length = updateDto.Length.Value;
            
        if (updateDto.AxleCount.HasValue)
            entity.AxleCount = updateDto.AxleCount.Value;
            
        if (updateDto.Volume.HasValue)
            entity.Volume = updateDto.Volume.Value;
            
        if (updateDto.FillingVolume.HasValue)
            entity.FillingVolume = updateDto.FillingVolume.Value;
            
        if (updateDto.InitialTareWeight.HasValue)
            entity.InitialTareWeight = updateDto.InitialTareWeight.Value;
            
        if (updateDto.TypeId.HasValue)
            entity.TypeId = updateDto.TypeId.Value;
            
        if (updateDto.ModelId.HasValue)
            entity.ModelId = updateDto.ModelId;
            
        if (updateDto.CommissioningDate.HasValue)
            entity.CommissioningDate = updateDto.CommissioningDate;
            
        if (!string.IsNullOrEmpty(updateDto.SerialNumber))
            entity.SerialNumber = updateDto.SerialNumber;
            
        if (!string.IsNullOrEmpty(updateDto.RegistrationNumber))
            entity.RegistrationNumber = updateDto.RegistrationNumber;
            
        if (updateDto.RegistrationDate.HasValue)
            entity.RegistrationDate = updateDto.RegistrationDate.Value;
            
        if (updateDto.RegistrarId.HasValue)
            entity.RegistrarId = updateDto.RegistrarId;
            
        if (updateDto.Notes != null)
            entity.Notes = updateDto.Notes;
            
        if (updateDto.Ownerid.HasValue)
            entity.Ownerid = updateDto.Ownerid;
            
        if (updateDto.TechСonditions != null)
            entity.TechСonditions = updateDto.TechСonditions;
            
        if (updateDto.Pripiska != null)
            entity.Pripiska = updateDto.Pripiska;
            
        if (updateDto.ReRegistrationDate.HasValue)
            entity.ReRegistrationDate = updateDto.ReRegistrationDate;
            
        if (updateDto.Pressure.HasValue)
            entity.Pressure = updateDto.Pressure.Value;
            
        if (updateDto.TestPressure.HasValue)
            entity.TestPressure = updateDto.TestPressure.Value;
            
        if (!string.IsNullOrEmpty(updateDto.Rent))
            entity.Rent = updateDto.Rent;
            
        if (updateDto.AffiliationId.HasValue)
            entity.AffiliationId = updateDto.AffiliationId.Value;
            
        if (updateDto.ServiceLifeYears.HasValue)
            entity.ServiceLifeYears = updateDto.ServiceLifeYears.Value;
            
        if (updateDto.PeriodMajorRepair.HasValue)
            entity.PeriodMajorRepair = updateDto.PeriodMajorRepair.Value;
            
        if (updateDto.PeriodPeriodicTest.HasValue)
            entity.PeriodPeriodicTest = updateDto.PeriodPeriodicTest.Value;
            
        if (updateDto.PeriodIntermediateTest.HasValue)
            entity.PeriodIntermediateTest = updateDto.PeriodIntermediateTest.Value;
            
        if (updateDto.PeriodDepotRepair.HasValue)
            entity.PeriodDepotRepair = updateDto.PeriodDepotRepair.Value;
            
        if (updateDto.DangerClass.HasValue)
            entity.DangerClass = updateDto.DangerClass.Value;
            
        if (updateDto.Substance != null)
            entity.Substance = updateDto.Substance;
            
        if (updateDto.TareWeight2.HasValue)
            entity.TareWeight2 = updateDto.TareWeight2.Value;
            
        if (updateDto.TareWeight3.HasValue)
            entity.TareWeight3 = updateDto.TareWeight3.Value;

        return Task.CompletedTask;
    }

    protected override Guid GetEntityId(RailwayCistern entity)
    {
        return entity.Id;
    }

    protected override async Task ValidateEntity(RailwayCistern entity, bool isUpdate)
    {
        if (string.IsNullOrWhiteSpace(entity.Number))
        {
            throw new ArgumentException("Номер цистерны обязателен");
        }

        // Проверка уникальности номера
        var existingCistern = await _context.RailwayCisterns
            .FirstOrDefaultAsync(c => c.Number == entity.Number && c.Id != entity.Id);
        
        if (existingCistern != null)
        {
            throw new ArgumentException($"Цистерна с номером {entity.Number} уже существует");
        }

        // Проверка существования связанных сущностей
        if (!await _context.Manufacturers.AnyAsync(m => m.Id == entity.ManufacturerId))
        {
            throw new ArgumentException("Указанный производитель не найден");
        }

        if (!await _context.WagonTypes.AnyAsync(t => t.Id == entity.TypeId))
        {
            throw new ArgumentException("Указанный тип вагона не найден");
        }

        if (entity.ModelId.HasValue && !await _context.WagonModels.AnyAsync(m => m.Id == entity.ModelId))
        {
            throw new ArgumentException("Указанная модель вагона не найдена");
        }

        if (entity.RegistrarId.HasValue && !await _context.Registrars.AnyAsync(r => r.Id == entity.RegistrarId))
        {
            throw new ArgumentException("Указанный регистратор не найден");
        }

        if (entity.Ownerid.HasValue && !await _context.Owners.AnyAsync(o => o.Id == entity.Ownerid))
        {
            throw new ArgumentException("Указанный владелец не найден");
        }

        if (!await _context.Affiliations.AnyAsync(a => a.Id == entity.AffiliationId))
        {
            throw new ArgumentException("Указанная принадлежность не найдена");
        }
    }

    protected override Task<(bool CanDelete, string? Reason)> CanDeleteAsync(RailwayCistern entity)
    {
        // Проверяем, есть ли связанные записи
        // Для упрощения пока считаем что можно всегда удалить
        return Task.FromResult((true, (string?)null));
    }

    protected override IQueryable<RailwayCistern> GetBaseQuery()
    {
        return _context.RailwayCisterns
            .Include(c => c.Manufacturer)
            .Include(c => c.Model)
            .Include(c => c.Type)
            .Include(c => c.Owner)
            .Include(c => c.Affiliation)
            .Include(c => c.Registrar);
    }

    protected override IQueryable<RailwayCistern> ApplySearch(IQueryable<RailwayCistern> query, string search)
    {
        return query.Where(c => 
            c.Number.Contains(search) ||
            c.Manufacturer.Name.Contains(search) ||
            c.Type.Name.Contains(search) ||
            (c.Model != null && c.Model.Name.Contains(search)) ||
            (c.Owner != null && c.Owner.Name.Contains(search)) ||
            c.Affiliation.Value.Contains(search) ||
            (c.Registrar != null && c.Registrar.Name.Contains(search))
        );
    }
}