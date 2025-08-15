using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Controllers.Base;
using back.DTOs;
using back.Models;
using System.Text.Json;
using System.Linq.Expressions;

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

    /// <summary>
    /// Получить паспорт цистерны с детальной информацией
    /// </summary>
    /// <param name="id">Идентификатор цистерны</param>
    /// <returns>Паспорт цистерны</returns>
    [HttpGet("{id}/passport")]
    public async Task<ActionResult<RailwayCisternPassportDto>> GetPassport(Guid id)
    {
        var cistern = await _context.RailwayCisterns
            .Include(c => c.Manufacturer)
            .Include(c => c.Type)
            .Include(c => c.Model)
            .Include(c => c.Owner)
            .Include(c => c.Affiliation)
            .Include(c => c.Registrar)
            .Include(c => c.PartInstallations)
                .ThenInclude(pi => pi.Part)
                .ThenInclude(p => p.PartType)
            .Include(c => c.PartInstallations)
                .ThenInclude(pi => pi.Part)
                .ThenInclude(p => p.Status)
            .Include(c => c.PartInstallations)
                .ThenInclude(pi => pi.FromLocation)
            .Include(c => c.PartInstallations)
                .ThenInclude(pi => pi.ToLocation)
            .Include(c => c.Vessel)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (cistern == null)
        {
            return NotFound();
        }

        var passportDto = new RailwayCisternPassportDto
        {
            Id = cistern.Id,
            Number = cistern.Number,
            SerialNumber = cistern.SerialNumber,
            RegistrationNumber = cistern.RegistrationNumber,
            
            // Производство
            Manufacturer = cistern.Manufacturer?.Name,
            BuildDate = cistern.BuildDate,
            CommissioningDate = cistern.CommissioningDate,
            
            // Тип и модель
            Type = cistern.Type?.Name,
            Model = cistern.Model?.Name,
            
            // Весовые характеристики
            TareWeight = cistern.TareWeight,
            TareWeight2 = cistern.TareWeight2,
            TareWeight3 = cistern.TareWeight3,
            InitialTareWeight = cistern.InitialTareWeight,
            LoadCapacity = cistern.LoadCapacity,
            
            // Размеры
            Length = cistern.Length,
            AxleCount = cistern.AxleCount,
            Volume = cistern.Volume,
            FillingVolume = cistern.FillingVolume,
            
            // Давление
            Pressure = cistern.Pressure,
            TestPressure = cistern.TestPressure,
            
            // Опасность
            DangerClass = cistern.DangerClass,
            Substance = cistern.Substance,
            
            // Регистрация
            RegistrationDate = cistern.RegistrationDate,
            ReRegistrationDate = cistern.ReRegistrationDate,
            Registrar = cistern.Registrar?.Name,
            
            // Владение
            Owner = cistern.Owner?.Name,
            Affiliation = cistern.Affiliation?.Value,
            Rent = cistern.Rent,
            Pripiska = cistern.Pripiska,
            
            // Ремонт и обслуживание
            ServiceLifeYears = cistern.ServiceLifeYears,
            PeriodMajorRepair = cistern.PeriodMajorRepair,
            PeriodPeriodicTest = cistern.PeriodPeriodicTest,
            PeriodIntermediateTest = cistern.PeriodIntermediateTest,
            PeriodDepotRepair = cistern.PeriodDepotRepair,
            
            // Дополнительно
            TechСonditions = cistern.TechСonditions,
            Notes = cistern.Notes,
            
            CreatedAt = cistern.CreatedAt,
            UpdatedAt = cistern.UpdatedAt,
            
            // Установленные части
            InstalledParts = cistern.PartInstallations
                .Where(pi => pi.RemovedAt == null) // Только активные установки
                .Select(pi => new InstalledPartDto
                {
                    Id = pi.Id,
                    PartId = pi.PartId,
                    PartTypeName = pi.Part?.PartType?.Name,
                    PartStatusName = pi.Part?.Status?.Name,
                    SerialNumber = pi.Part?.SerialNumber,
                    ManufactureYear = pi.Part?.ManufactureYear,
                    InstalledAt = pi.InstalledAt,
                    InstalledBy = pi.InstalledBy,
                    RemovedAt = pi.RemovedAt,
                    RemovedBy = pi.RemovedBy,
                    FromLocationName = pi.FromLocation?.Name,
                    ToLocationName = pi.ToLocation?.Name,
                    Notes = pi.Notes
                }).ToList(),
            
            // Сосуд под давлением
            VesselInfo = cistern.Vessel != null ? new VesselInfoDto
            {
                Id = cistern.Vessel.Id,
                // Добавить нужные поля из Vessel модели
            } : null
        };

        return Ok(passportDto);
    }

    protected override Task<IQueryable<RailwayCistern>> ApplyFilterFromJson(IQueryable<RailwayCistern> query, string filterJson)
    {
        if (string.IsNullOrEmpty(filterJson) || filterJson == "{}" || filterJson == "[]")
            return Task.FromResult(query);

        try
        {
            using var document = JsonDocument.Parse(filterJson);
            var root = document.RootElement;

            // Если это массив фильтров
            if (root.ValueKind == JsonValueKind.Array)
            {
                foreach (var filterElement in root.EnumerateArray())
                {
                    query = ApplyFilter(query, filterElement);
                }
            }
            // Если это объект с группой фильтров
            else if (root.ValueKind == JsonValueKind.Object && root.TryGetProperty("filters", out var filtersProperty))
            {
                foreach (var filterElement in filtersProperty.EnumerateArray())
                {
                    query = ApplyFilter(query, filterElement);
                }
            }

            return Task.FromResult(query);
        }
        catch (Exception ex)
        {
            // Логируем ошибку, но не ломаем запрос
            Console.WriteLine($"Error applying filter: {ex.Message}");
            return Task.FromResult(query);
        }
    }

    private IQueryable<RailwayCistern> ApplyFilter(IQueryable<RailwayCistern> query, JsonElement filterElement)
    {
        if (!filterElement.TryGetProperty("field", out var fieldProperty) ||
            !filterElement.TryGetProperty("operator", out var operatorProperty) ||
            !filterElement.TryGetProperty("value", out var valueProperty))
        {
            return query;
        }

        var field = fieldProperty.GetString();
        var operatorStr = operatorProperty.GetString();
        
        // Для операторов BETWEEN значение может быть массивом
        string? value;
        if (valueProperty.ValueKind == JsonValueKind.Array)
        {
            // Преобразуем массив в JSON строку
            value = JsonSerializer.Serialize(valueProperty);
        }
        else
        {
            value = valueProperty.GetString();
        }

        if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(operatorStr))
            return query;

        return field.ToLower() switch
        {
            "number" => ApplyStringFilter(query, "Number", operatorStr, value ?? ""),
            "serialnumber" => ApplyStringFilter(query, "SerialNumber", operatorStr, value ?? ""),
            "manufacturername" => ApplyStringFilter(query, "ManufacturerName", operatorStr, value ?? ""),
            "typename" => ApplyStringFilter(query, "TypeName", operatorStr, value ?? ""),
            "modelname" => ApplyStringFilter(query, "ModelName", operatorStr, value ?? ""),
            "tareweight" => ApplyNumericFilter(query, "TareWeight", operatorStr, value ?? ""),
            "loadcapacity" => ApplyNumericFilter(query, "LoadCapacity", operatorStr, value ?? ""),
            "volume" => ApplyNumericFilter(query, "Volume", operatorStr, value ?? ""),
            "builddate" => ApplyDateFilter(query, "BuildDate", operatorStr, value ?? ""),
            "registrationdate" => ApplyDateFilter(query, "RegistrationDate", operatorStr, value ?? ""),
            "ownername" => ApplyStringFilter(query, "OwnerName", operatorStr, value ?? ""),
            "registrarname" => ApplyStringFilter(query, "RegistrarName", operatorStr, value ?? ""),
            "axlecount" => ApplyNumericFilter(query, "AxleCount", operatorStr, value ?? ""),
            "pressure" => ApplyNumericFilter(query, "Pressure", operatorStr, value ?? ""),
            "dangerclass" => ApplyNumericFilter(query, "DangerClass", operatorStr, value ?? ""),
            "substance" => ApplyStringFilter(query, "Substance", operatorStr, value ?? ""),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringFilter(IQueryable<RailwayCistern> query, 
        string fieldName, string operatorStr, string value)
    {
        if (string.IsNullOrEmpty(value) && operatorStr != "isNull" && operatorStr != "isNotNull")
            return query;

        return operatorStr.ToLower() switch
        {
            "equals" => ApplyStringEquals(query, fieldName, value),
            "notequals" => ApplyStringNotEquals(query, fieldName, value),
            "contains" => ApplyStringContains(query, fieldName, value),
            "notcontains" => ApplyStringNotContains(query, fieldName, value),
            "startswith" => ApplyStringStartsWith(query, fieldName, value),
            "endswith" => ApplyStringEndsWith(query, fieldName, value),
            "isnull" => ApplyStringIsNull(query, fieldName),
            "isnotnull" => ApplyStringIsNotNull(query, fieldName),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericFilter(IQueryable<RailwayCistern> query,
        string fieldName, string operatorStr, string value)
    {
        if (!decimal.TryParse(value, out var numericValue))
            return query;

        return operatorStr.ToLower() switch
        {
            "equals" => ApplyNumericEquals(query, fieldName, numericValue),
            "notequals" => ApplyNumericNotEquals(query, fieldName, numericValue),
            "greaterthan" => ApplyNumericGreaterThan(query, fieldName, numericValue),
            "greaterthanorequal" => ApplyNumericGreaterThanOrEqual(query, fieldName, numericValue),
            "lessthan" => ApplyNumericLessThan(query, fieldName, numericValue),
            "lessthanorequal" => ApplyNumericLessThanOrEqual(query, fieldName, numericValue),
            "between" => ApplyNumericBetween(query, fieldName, value),
            "notbetween" => ApplyNumericNotBetween(query, fieldName, value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateFilter(IQueryable<RailwayCistern> query,
        string fieldName, string operatorStr, string value)
    {
        if (!DateOnly.TryParse(value, out var dateValue))
            return query;

        return operatorStr.ToLower() switch
        {
            "equals" => ApplyDateEquals(query, fieldName, dateValue),
            "notequals" => ApplyDateNotEquals(query, fieldName, dateValue),
            "greaterthan" => ApplyDateGreaterThan(query, fieldName, dateValue),
            "greaterthanorequal" => ApplyDateGreaterThanOrEqual(query, fieldName, dateValue),
            "lessthan" => ApplyDateLessThan(query, fieldName, dateValue),
            "lessthanorequal" => ApplyDateLessThanOrEqual(query, fieldName, dateValue),
            "between" => ApplyDateBetween(query, fieldName, value),
            "notbetween" => ApplyDateNotBetween(query, fieldName, value),
            _ => query
        };
    }

    // String filter methods
    private IQueryable<RailwayCistern> ApplyStringEquals(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number == value),
            "SerialNumber" => query.Where(x => x.SerialNumber == value),
            "ManufacturerName" => query.Where(x => x.Manufacturer != null && x.Manufacturer.Name == value),
            "TypeName" => query.Where(x => x.Type != null && x.Type.Name == value),
            "ModelName" => query.Where(x => x.Model != null && x.Model.Name == value),
            "OwnerName" => query.Where(x => x.Owner != null && x.Owner.Name == value),
            "RegistrarName" => query.Where(x => x.Registrar != null && x.Registrar.Name == value),
            "Substance" => query.Where(x => x.Substance == value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringNotEquals(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number != value),
            "SerialNumber" => query.Where(x => x.SerialNumber != value),
            "ManufacturerName" => query.Where(x => x.Manufacturer == null || x.Manufacturer.Name != value),
            "TypeName" => query.Where(x => x.Type == null || x.Type.Name != value),
            "ModelName" => query.Where(x => x.Model == null || x.Model.Name != value),
            "OwnerName" => query.Where(x => x.Owner == null || x.Owner.Name != value),
            "RegistrarName" => query.Where(x => x.Registrar == null || x.Registrar.Name != value),
            "Substance" => query.Where(x => x.Substance != value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringContains(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number != null && x.Number.Contains(value)),
            "SerialNumber" => query.Where(x => x.SerialNumber != null && x.SerialNumber.Contains(value)),
            "ManufacturerName" => query.Where(x => x.Manufacturer != null && x.Manufacturer.Name != null && x.Manufacturer.Name.Contains(value)),
            "TypeName" => query.Where(x => x.Type != null && x.Type.Name != null && x.Type.Name.Contains(value)),
            "ModelName" => query.Where(x => x.Model != null && x.Model.Name != null && x.Model.Name.Contains(value)),
            "OwnerName" => query.Where(x => x.Owner != null && x.Owner.Name != null && x.Owner.Name.Contains(value)),
            "RegistrarName" => query.Where(x => x.Registrar != null && x.Registrar.Name != null && x.Registrar.Name.Contains(value)),
            "Substance" => query.Where(x => x.Substance != null && x.Substance.Contains(value)),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringNotContains(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number == null || !x.Number.Contains(value)),
            "SerialNumber" => query.Where(x => x.SerialNumber == null || !x.SerialNumber.Contains(value)),
            "ManufacturerName" => query.Where(x => x.Manufacturer == null || x.Manufacturer.Name == null || !x.Manufacturer.Name.Contains(value)),
            "TypeName" => query.Where(x => x.Type == null || x.Type.Name == null || !x.Type.Name.Contains(value)),
            "ModelName" => query.Where(x => x.Model == null || x.Model.Name == null || !x.Model.Name.Contains(value)),
            "OwnerName" => query.Where(x => x.Owner == null || x.Owner.Name == null || !x.Owner.Name.Contains(value)),
            "RegistrarName" => query.Where(x => x.Registrar == null || x.Registrar.Name == null || !x.Registrar.Name.Contains(value)),
            "Substance" => query.Where(x => x.Substance == null || !x.Substance.Contains(value)),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringStartsWith(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number != null && x.Number.StartsWith(value)),
            "SerialNumber" => query.Where(x => x.SerialNumber != null && x.SerialNumber.StartsWith(value)),
            "ManufacturerName" => query.Where(x => x.Manufacturer != null && x.Manufacturer.Name != null && x.Manufacturer.Name.StartsWith(value)),
            "TypeName" => query.Where(x => x.Type != null && x.Type.Name != null && x.Type.Name.StartsWith(value)),
            "ModelName" => query.Where(x => x.Model != null && x.Model.Name != null && x.Model.Name.StartsWith(value)),
            "OwnerName" => query.Where(x => x.Owner != null && x.Owner.Name != null && x.Owner.Name.StartsWith(value)),
            "RegistrarName" => query.Where(x => x.Registrar != null && x.Registrar.Name != null && x.Registrar.Name.StartsWith(value)),
            "Substance" => query.Where(x => x.Substance != null && x.Substance.StartsWith(value)),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringEndsWith(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number != null && x.Number.EndsWith(value)),
            "SerialNumber" => query.Where(x => x.SerialNumber != null && x.SerialNumber.EndsWith(value)),
            "ManufacturerName" => query.Where(x => x.Manufacturer != null && x.Manufacturer.Name != null && x.Manufacturer.Name.EndsWith(value)),
            "TypeName" => query.Where(x => x.Type != null && x.Type.Name != null && x.Type.Name.EndsWith(value)),
            "ModelName" => query.Where(x => x.Model != null && x.Model.Name != null && x.Model.Name.EndsWith(value)),
            "OwnerName" => query.Where(x => x.Owner != null && x.Owner.Name != null && x.Owner.Name.EndsWith(value)),
            "RegistrarName" => query.Where(x => x.Registrar != null && x.Registrar.Name != null && x.Registrar.Name.EndsWith(value)),
            "Substance" => query.Where(x => x.Substance != null && x.Substance.EndsWith(value)),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringIsNull(IQueryable<RailwayCistern> query, string fieldName)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number == null),
            "SerialNumber" => query.Where(x => x.SerialNumber == null),
            "ManufacturerName" => query.Where(x => x.Manufacturer == null || x.Manufacturer.Name == null),
            "TypeName" => query.Where(x => x.Type == null || x.Type.Name == null),
            "ModelName" => query.Where(x => x.Model == null || x.Model.Name == null),
            "OwnerName" => query.Where(x => x.Owner == null || x.Owner.Name == null),
            "RegistrarName" => query.Where(x => x.Registrar == null || x.Registrar.Name == null),
            "Substance" => query.Where(x => x.Substance == null),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyStringIsNotNull(IQueryable<RailwayCistern> query, string fieldName)
    {
        return fieldName switch
        {
            "Number" => query.Where(x => x.Number != null),
            "SerialNumber" => query.Where(x => x.SerialNumber != null),
            "ManufacturerName" => query.Where(x => x.Manufacturer != null && x.Manufacturer.Name != null),
            "TypeName" => query.Where(x => x.Type != null && x.Type.Name != null),
            "ModelName" => query.Where(x => x.Model != null && x.Model.Name != null),
            "OwnerName" => query.Where(x => x.Owner != null && x.Owner.Name != null),
            "RegistrarName" => query.Where(x => x.Registrar != null && x.Registrar.Name != null),
            "Substance" => query.Where(x => x.Substance != null),
            _ => query
        };
    }

    // Numeric filter methods
    private IQueryable<RailwayCistern> ApplyNumericEquals(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight == value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity == value),
            "Volume" => query.Where(x => x.Volume == value),
            "AxleCount" => query.Where(x => x.AxleCount == value),
            "Pressure" => query.Where(x => x.Pressure == value),
            "DangerClass" => query.Where(x => x.DangerClass == value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericNotEquals(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight != value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity != value),
            "Volume" => query.Where(x => x.Volume != value),
            "AxleCount" => query.Where(x => x.AxleCount != value),
            "Pressure" => query.Where(x => x.Pressure != value),
            "DangerClass" => query.Where(x => x.DangerClass != value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericGreaterThan(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight > value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity > value),
            "Volume" => query.Where(x => x.Volume > value),
            "AxleCount" => query.Where(x => x.AxleCount > value),
            "Pressure" => query.Where(x => x.Pressure > value),
            "DangerClass" => query.Where(x => x.DangerClass > value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericGreaterThanOrEqual(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight >= value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity >= value),
            "Volume" => query.Where(x => x.Volume >= value),
            "AxleCount" => query.Where(x => x.AxleCount >= value),
            "Pressure" => query.Where(x => x.Pressure >= value),
            "DangerClass" => query.Where(x => x.DangerClass >= value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericLessThan(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight < value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity < value),
            "Volume" => query.Where(x => x.Volume < value),
            "AxleCount" => query.Where(x => x.AxleCount < value),
            "Pressure" => query.Where(x => x.Pressure < value),
            "DangerClass" => query.Where(x => x.DangerClass < value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyNumericLessThanOrEqual(IQueryable<RailwayCistern> query, string fieldName, decimal value)
    {
        return fieldName switch
        {
            "TareWeight" => query.Where(x => x.TareWeight <= value),
            "LoadCapacity" => query.Where(x => x.LoadCapacity <= value),
            "Volume" => query.Where(x => x.Volume <= value),
            "AxleCount" => query.Where(x => x.AxleCount <= value),
            "Pressure" => query.Where(x => x.Pressure <= value),
            "DangerClass" => query.Where(x => x.DangerClass <= value),
            _ => query
        };
    }

    // Date filter methods
    private IQueryable<RailwayCistern> ApplyDateEquals(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate == value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate == value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateNotEquals(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate != value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate != value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateGreaterThan(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate > value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate > value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateGreaterThanOrEqual(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate >= value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate >= value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateLessThan(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate < value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate < value),
            _ => query
        };
    }

    private IQueryable<RailwayCistern> ApplyDateLessThanOrEqual(IQueryable<RailwayCistern> query, string fieldName, DateOnly value)
    {
        return fieldName switch
        {
            "BuildDate" => query.Where(x => x.BuildDate <= value),
            "RegistrationDate" => query.Where(x => x.RegistrationDate <= value),
            _ => query
        };
    }

    // BETWEEN operators for numeric values
    private IQueryable<RailwayCistern> ApplyNumericBetween(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        try
        {
            // Парсим JSON массив или разделенную запятой строку
            decimal[] values;
            if (value.StartsWith("[") && value.EndsWith("]"))
            {
                var jsonArray = JsonSerializer.Deserialize<string[]>(value);
                values = jsonArray?.Select(decimal.Parse).ToArray() ?? new decimal[0];
            }
            else if (value.Contains(","))
            {
                values = value.Split(',').Select(s => decimal.Parse(s.Trim())).ToArray();
            }
            else
            {
                return query; // Не валидный формат для BETWEEN
            }

            if (values.Length != 2) return query;

            var min = Math.Min(values[0], values[1]);
            var max = Math.Max(values[0], values[1]);

            return fieldName switch
            {
                "TareWeight" => query.Where(x => x.TareWeight >= min && x.TareWeight <= max),
                "LoadCapacity" => query.Where(x => x.LoadCapacity >= min && x.LoadCapacity <= max),
                "Volume" => query.Where(x => x.Volume >= min && x.Volume <= max),
                "AxleCount" => query.Where(x => x.AxleCount >= min && x.AxleCount <= max),
                "Pressure" => query.Where(x => x.Pressure >= min && x.Pressure <= max),
                "DangerClass" => query.Where(x => x.DangerClass >= min && x.DangerClass <= max),
                _ => query
            };
        }
        catch
        {
            return query;
        }
    }

    private IQueryable<RailwayCistern> ApplyNumericNotBetween(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        try
        {
            // Парсим JSON массив или разделенную запятой строку
            decimal[] values;
            if (value.StartsWith("[") && value.EndsWith("]"))
            {
                var jsonArray = JsonSerializer.Deserialize<string[]>(value);
                values = jsonArray?.Select(decimal.Parse).ToArray() ?? new decimal[0];
            }
            else if (value.Contains(","))
            {
                values = value.Split(',').Select(s => decimal.Parse(s.Trim())).ToArray();
            }
            else
            {
                return query; // Не валидный формат для NOT BETWEEN
            }

            if (values.Length != 2) return query;

            var min = Math.Min(values[0], values[1]);
            var max = Math.Max(values[0], values[1]);

            return fieldName switch
            {
                "TareWeight" => query.Where(x => x.TareWeight < min || x.TareWeight > max),
                "LoadCapacity" => query.Where(x => x.LoadCapacity < min || x.LoadCapacity > max),
                "Volume" => query.Where(x => x.Volume < min || x.Volume > max),
                "AxleCount" => query.Where(x => x.AxleCount < min || x.AxleCount > max),
                "Pressure" => query.Where(x => x.Pressure < min || x.Pressure > max),
                "DangerClass" => query.Where(x => x.DangerClass < min || x.DangerClass > max),
                _ => query
            };
        }
        catch
        {
            return query;
        }
    }

    // BETWEEN operators for date values
    private IQueryable<RailwayCistern> ApplyDateBetween(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        try
        {
            Console.WriteLine($"ApplyDateBetween: field={fieldName}, value={value}");
            
            // Парсим JSON массив или разделенную запятой строку
            DateOnly[] dates;
            if (value.StartsWith("[") && value.EndsWith("]"))
            {
                var jsonArray = JsonSerializer.Deserialize<string[]>(value);
                dates = jsonArray?.Select(DateOnly.Parse).ToArray() ?? new DateOnly[0];
                Console.WriteLine($"Parsed JSON array: {string.Join(", ", dates)}");
            }
            else if (value.Contains(","))
            {
                dates = value.Split(',').Select(s => DateOnly.Parse(s.Trim())).ToArray();
                Console.WriteLine($"Parsed CSV: {string.Join(", ", dates)}");
            }
            else
            {
                Console.WriteLine("Invalid format for BETWEEN");
                return query; // Не валидный формат для BETWEEN
            }

            if (dates.Length != 2) 
            {
                Console.WriteLine($"Expected 2 dates, got {dates.Length}");
                return query;
            }

            var startDate = dates[0] < dates[1] ? dates[0] : dates[1];
            var endDate = dates[0] > dates[1] ? dates[0] : dates[1];
            
            Console.WriteLine($"Date range: {startDate} to {endDate}");

            return fieldName switch
            {
                "BuildDate" => query.Where(x => x.BuildDate >= startDate && x.BuildDate <= endDate),
                "RegistrationDate" => query.Where(x => x.RegistrationDate >= startDate && x.RegistrationDate <= endDate),
                _ => query
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in ApplyDateBetween: {ex.Message}");
            return query;
        }
    }

    private IQueryable<RailwayCistern> ApplyDateNotBetween(IQueryable<RailwayCistern> query, string fieldName, string value)
    {
        try
        {
            // Парсим JSON массив или разделенную запятой строку
            DateOnly[] dates;
            if (value.StartsWith("[") && value.EndsWith("]"))
            {
                var jsonArray = JsonSerializer.Deserialize<string[]>(value);
                dates = jsonArray?.Select(DateOnly.Parse).ToArray() ?? new DateOnly[0];
            }
            else if (value.Contains(","))
            {
                dates = value.Split(',').Select(s => DateOnly.Parse(s.Trim())).ToArray();
            }
            else
            {
                return query; // Не валидный формат для NOT BETWEEN
            }

            if (dates.Length != 2) return query;

            var startDate = dates[0] < dates[1] ? dates[0] : dates[1];
            var endDate = dates[0] > dates[1] ? dates[0] : dates[1];

            return fieldName switch
            {
                "BuildDate" => query.Where(x => x.BuildDate < startDate || x.BuildDate > endDate),
                "RegistrationDate" => query.Where(x => x.RegistrationDate < startDate || x.RegistrationDate > endDate),
                _ => query
            };
        }
        catch
        {
            return query;
        }
    }
}