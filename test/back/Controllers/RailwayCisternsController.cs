using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using back.DTOs;
using back.Models;
using back.Attributes;

namespace back.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces("application/json")]
public class RailwayCisternsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RailwayCisternsController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Получить список цистерн
    /// </summary>
    /// <param name="page">Номер страницы (начиная с 1)</param>
    /// <param name="size">Размер страницы</param>
    /// <returns>Список железнодорожных цистерн с пагинацией</returns>
    [HttpGet]
    [RequirePermission("cisterns.read")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetCisterns([FromQuery] int page = 1, [FromQuery] int size = 20)
    {
        var skip = (page - 1) * size;
        
        var query = _context.RailwayCisterns
            .Include(c => c.Manufacturer)
            .Include(c => c.Model)
            .Include(c => c.Type)
            .Include(c => c.Owner)
            .Include(c => c.Affiliation)
            .Include(c => c.Registrar)
            .Skip(skip)
            .Take(size);

        var cisterns = await query.Select(c => new RailwayCisternDto
            {
                Id = c.Id,
                Number = c.Number,
                ManufacturerId = c.ManufacturerId,
                ManufacturerName = c.Manufacturer.Name,
                BuildDate = c.BuildDate,
                TareWeight = c.TareWeight,
                LoadCapacity = c.LoadCapacity,
                Length = c.Length,
                AxleCount = c.AxleCount,
                Volume = c.Volume,
                FillingVolume = c.FillingVolume,
                InitialTareWeight = c.InitialTareWeight,
                TypeId = c.TypeId,
                TypeName = c.Type.Name,
                ModelId = c.ModelId,
                ModelName = c.Model != null ? c.Model.Name : null,
                CommissioningDate = c.CommissioningDate,
                SerialNumber = c.SerialNumber,
                RegistrationNumber = c.RegistrationNumber,
                RegistrationDate = c.RegistrationDate,
                RegistrarId = c.RegistrarId,
                RegistrarName = c.Registrar != null ? c.Registrar.Name : null,
                Notes = c.Notes,
                Ownerid = c.Ownerid,
                OwnerName = c.Owner != null ? c.Owner.Name : null,
                TechСonditions = c.TechСonditions,
                Pripiska = c.Pripiska,
                ReRegistrationDate = c.ReRegistrationDate,
                Pressure = c.Pressure,
                TestPressure = c.TestPressure,
                Rent = c.Rent,
                AffiliationId = c.AffiliationId,
                AffiliationName = c.Affiliation.Value,
                ServiceLifeYears = c.ServiceLifeYears,
                PeriodMajorRepair = c.PeriodMajorRepair,
                PeriodPeriodicTest = c.PeriodPeriodicTest,
                PeriodIntermediateTest = c.PeriodIntermediateTest,
                PeriodDepotRepair = c.PeriodDepotRepair,
                DangerClass = c.DangerClass,
                Substance = c.Substance,
                TareWeight2 = c.TareWeight2,
                TareWeight3 = c.TareWeight3
            })
            .ToListAsync();

        var total = await _context.RailwayCisterns.CountAsync();

        return Ok(new
        {
            data = cisterns,
            total,
            page,
            size,
            totalPages = (int)Math.Ceiling((double)total / size)
        });
    }

    /// <summary>
    /// Получить цистерну по ID
    /// </summary>
    /// <param name="id">Уникальный идентификатор цистерны</param>
    /// <returns>Детальная информация о цистерне</returns>
    [HttpGet("{id}")]
    [RequirePermission("cisterns.read")]
    [ProducesResponseType(typeof(RailwayCisternDto), 200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCistern(Guid id)
    {
        var query = _context.RailwayCisterns
            .Include(c => c.Manufacturer)
            .Include(c => c.Model)
            .Include(c => c.Type)
            .Include(c => c.Owner)
            .Include(c => c.Affiliation)
            .Include(c => c.Registrar)
            .Where(c => c.Id == id);

        var cistern = await query.Select(c => new RailwayCisternDto
            {
                Id = c.Id,
                Number = c.Number,
                ManufacturerId = c.ManufacturerId,
                ManufacturerName = c.Manufacturer.Name,
                BuildDate = c.BuildDate,
                TareWeight = c.TareWeight,
                LoadCapacity = c.LoadCapacity,
                Length = c.Length,
                AxleCount = c.AxleCount,
                Volume = c.Volume,
                FillingVolume = c.FillingVolume,
                InitialTareWeight = c.InitialTareWeight,
                TypeId = c.TypeId,
                TypeName = c.Type.Name,
                ModelId = c.ModelId,
                ModelName = c.Model != null ? c.Model.Name : null,
                CommissioningDate = c.CommissioningDate,
                SerialNumber = c.SerialNumber,
                RegistrationNumber = c.RegistrationNumber,
                RegistrationDate = c.RegistrationDate,
                RegistrarId = c.RegistrarId,
                RegistrarName = c.Registrar != null ? c.Registrar.Name : null,
                Notes = c.Notes,
                Ownerid = c.Ownerid,
                OwnerName = c.Owner != null ? c.Owner.Name : null,
                TechСonditions = c.TechСonditions,
                Pripiska = c.Pripiska,
                ReRegistrationDate = c.ReRegistrationDate,
                Pressure = c.Pressure,
                TestPressure = c.TestPressure,
                Rent = c.Rent,
                AffiliationId = c.AffiliationId,
                AffiliationName = c.Affiliation.Value,
                ServiceLifeYears = c.ServiceLifeYears,
                PeriodMajorRepair = c.PeriodMajorRepair,
                PeriodPeriodicTest = c.PeriodPeriodicTest,
                PeriodIntermediateTest = c.PeriodIntermediateTest,
                PeriodDepotRepair = c.PeriodDepotRepair,
                DangerClass = c.DangerClass,
                Substance = c.Substance,
                TareWeight2 = c.TareWeight2,
                TareWeight3 = c.TareWeight3
            })
            .FirstOrDefaultAsync();

        if (cistern == null)
        {
            return NotFound($"Цистерна с ID {id} не найдена");
        }

        return Ok(cistern);
    }

    /// <summary>
    /// Создать новую цистерну
    /// </summary>
    /// <param name="createDto">Данные для создания цистерны</param>
    /// <returns>Созданная цистерна</returns>
    [HttpPost]
    [RequirePermission("cisterns.create")]
    [ProducesResponseType(typeof(RailwayCistern), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> CreateCistern([FromBody] CreateRailwayCisternDto createDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Проверяем, что номер уникален
        if (await _context.RailwayCisterns.AnyAsync(c => c.Number == createDto.Number))
        {
            return BadRequest("Цистерна с таким номером уже существует");
        }

        // Проверяем существование связанных сущностей
        if (!await _context.Affiliations.AnyAsync(a => a.Id == createDto.AffiliationId))
        {
            return BadRequest("Указанная принадлежность не существует");
        }

        var cistern = new RailwayCistern
        {
            Id = Guid.NewGuid(),
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
            UpdatedAt = DateTime.UtcNow,
            CreatorId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty
        };

        _context.RailwayCisterns.Add(cistern);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCistern), new { id = cistern.Id }, cistern);
    }

    /// <summary>
    /// Обновить цистерну
    /// </summary>
    /// <param name="id">Уникальный идентификатор цистерны</param>
    /// <param name="updateDto">Данные для обновления</param>
    /// <returns>Обновленная цистерна</returns>
    [HttpPut("{id}")]
    [RequirePermission("cisterns.update")]
    [ProducesResponseType(typeof(RailwayCistern), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateCistern(Guid id, [FromBody] UpdateRailwayCisternDto updateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var cistern = await _context.RailwayCisterns.FindAsync(id);
        if (cistern == null)
        {
            return NotFound($"Цистерна с ID {id} не найдена");
        }

        // Проверяем уникальность номера при изменении
        if (!string.IsNullOrEmpty(updateDto.Number) && updateDto.Number != cistern.Number)
        {
            if (await _context.RailwayCisterns.AnyAsync(c => c.Number == updateDto.Number && c.Id != id))
            {
                return BadRequest("Цистерна с таким номером уже существует");
            }
            cistern.Number = updateDto.Number;
        }

        // Обновляем только переданные поля
        if (updateDto.ManufacturerId.HasValue)
            cistern.ManufacturerId = updateDto.ManufacturerId.Value;
        
        if (updateDto.BuildDate.HasValue)
            cistern.BuildDate = updateDto.BuildDate.Value;
        
        if (updateDto.TareWeight.HasValue)
            cistern.TareWeight = updateDto.TareWeight.Value;
        
        if (updateDto.LoadCapacity.HasValue)
            cistern.LoadCapacity = updateDto.LoadCapacity.Value;
        
        if (updateDto.Length.HasValue)
            cistern.Length = updateDto.Length.Value;
        
        if (updateDto.AxleCount.HasValue)
            cistern.AxleCount = updateDto.AxleCount.Value;
        
        if (updateDto.Volume.HasValue)
            cistern.Volume = updateDto.Volume.Value;
        
        if (updateDto.FillingVolume.HasValue)
            cistern.FillingVolume = updateDto.FillingVolume;
        
        if (updateDto.InitialTareWeight.HasValue)
            cistern.InitialTareWeight = updateDto.InitialTareWeight;
        
        if (updateDto.TypeId.HasValue)
            cistern.TypeId = updateDto.TypeId.Value;
        
        if (updateDto.ModelId.HasValue)
            cistern.ModelId = updateDto.ModelId;
        
        if (updateDto.CommissioningDate.HasValue)
            cistern.CommissioningDate = updateDto.CommissioningDate;
        
        if (!string.IsNullOrEmpty(updateDto.SerialNumber))
            cistern.SerialNumber = updateDto.SerialNumber;
        
        if (!string.IsNullOrEmpty(updateDto.RegistrationNumber))
            cistern.RegistrationNumber = updateDto.RegistrationNumber;
        
        if (updateDto.RegistrationDate.HasValue)
            cistern.RegistrationDate = updateDto.RegistrationDate.Value;
        
        if (updateDto.RegistrarId.HasValue)
            cistern.RegistrarId = updateDto.RegistrarId;
        
        if (updateDto.Notes != null)
            cistern.Notes = updateDto.Notes;
        
        if (updateDto.Ownerid.HasValue)
            cistern.Ownerid = updateDto.Ownerid;
        
        if (updateDto.TechСonditions != null)
            cistern.TechСonditions = updateDto.TechСonditions;
        
        if (updateDto.Pripiska != null)
            cistern.Pripiska = updateDto.Pripiska;
        
        if (updateDto.ReRegistrationDate.HasValue)
            cistern.ReRegistrationDate = updateDto.ReRegistrationDate;
        
        if (updateDto.Pressure.HasValue)
            cistern.Pressure = updateDto.Pressure.Value;
        
        if (updateDto.TestPressure.HasValue)
            cistern.TestPressure = updateDto.TestPressure.Value;
        
        if (updateDto.Rent != null)
            cistern.Rent = updateDto.Rent;
        
        if (updateDto.AffiliationId.HasValue)
            cistern.AffiliationId = updateDto.AffiliationId.Value;
        
        if (updateDto.ServiceLifeYears.HasValue)
            cistern.ServiceLifeYears = updateDto.ServiceLifeYears.Value;
        
        if (updateDto.PeriodMajorRepair.HasValue)
            cistern.PeriodMajorRepair = updateDto.PeriodMajorRepair;
        
        if (updateDto.PeriodPeriodicTest.HasValue)
            cistern.PeriodPeriodicTest = updateDto.PeriodPeriodicTest;
        
        if (updateDto.PeriodIntermediateTest.HasValue)
            cistern.PeriodIntermediateTest = updateDto.PeriodIntermediateTest;
        
        if (updateDto.PeriodDepotRepair.HasValue)
            cistern.PeriodDepotRepair = updateDto.PeriodDepotRepair;
        
        if (updateDto.DangerClass.HasValue)
            cistern.DangerClass = updateDto.DangerClass.Value;
        
        if (!string.IsNullOrEmpty(updateDto.Substance))
            cistern.Substance = updateDto.Substance;
        
        if (updateDto.TareWeight2.HasValue)
            cistern.TareWeight2 = updateDto.TareWeight2.Value;
        
        if (updateDto.TareWeight3.HasValue)
            cistern.TareWeight3 = updateDto.TareWeight3.Value;

        cistern.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(cistern);
    }

    /// <summary>
    /// Удалить цистерну
    /// </summary>
    /// <param name="id">Уникальный идентификатор цистерны</param>
    /// <returns>Результат удаления</returns>
    [HttpDelete("{id}")]
    [RequirePermission("cisterns.delete")]
    [ProducesResponseType(204)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> DeleteCistern(Guid id)
    {
        var cistern = await _context.RailwayCisterns.FindAsync(id);
        if (cistern == null)
        {
            return NotFound($"Цистерна с ID {id} не найдена");
        }

        _context.RailwayCisterns.Remove(cistern);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
