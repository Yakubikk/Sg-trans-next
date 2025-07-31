using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public record ResponseForPagination(
    List<RailwayCisternDetailDTO> RailwayCisterns,
    int TotalCount,
    int TotalPages,
    int CurrentPage,
    int PageSize);

public static class RailwayCisternEndpoints
{
    public static void MapRailwayCisternEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/railway-cisterns")
            .RequireAuthorization()
            .WithTags("railway-cisterns");

        // Get basic list
        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
            {
                var cisterns = await context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Affiliation)
                    .Select(rc => new RailwayCisternListDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        ManufacturerName = rc.Manufacturer.Name,
                        BuildDate = rc.BuildDate,
                        TypeName = rc.Type.Name,
                        ModelName = rc.Model.Name,
                        OwnerName = rc.Owner.Name,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        AffiliationValue = rc.Affiliation.Value
                    })
                    .ToListAsync();
                return Results.Ok(cisterns);
            })
            .WithName("GetRailwayCisterns")
            .Produces<List<RailwayCisternListDTO>>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Get detailed list
        group.MapGet("/detailed", async ([FromServices] ApplicationDbContext context) =>
            {
                var cisterns = await context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .Select(rc => new RailwayCisternDetailDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        Manufacturer = new ManufacturerDTO
                        {
                            Id = rc.Manufacturer.Id,
                            Name = rc.Manufacturer.Name,
                            Country = rc.Manufacturer.Country,
                            ShortName = rc.Manufacturer.ShortName,
                            Code = rc.Manufacturer.Code
                        },
                        BuildDate = rc.BuildDate,
                        TareWeight = rc.TareWeight,
                        LoadCapacity = rc.LoadCapacity,
                        Length = rc.Length,
                        AxleCount = rc.AxleCount,
                        Volume = rc.Volume,
                        FillingVolume = rc.FillingVolume,
                        InitialTareWeight = rc.InitialTareWeight,
                        Type = new WagonTypeDTO
                        {
                            Id = rc.Type.Id,
                            Name = rc.Type.Name,
                            Type = rc.Type.Type
                        },
                        Model = rc.Model != null
                            ? new WagonModelDTO
                            {
                                Id = rc.Model.Id,
                                Name = rc.Model.Name
                            }
                            : null,
                        CommissioningDate = rc.CommissioningDate,
                        SerialNumber = rc.SerialNumber,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        Registrar = rc.Registrar != null
                            ? new RegistrarDTO
                            {
                                Id = rc.Registrar.Id,
                                Name = rc.Registrar.Name
                            }
                            : null,
                        Notes = rc.Notes,
                        Owner = rc.Owner != null
                            ? new OwnerDTO
                            {
                                Id = rc.Owner.Id,
                                Name = rc.Owner.Name,
                                UNP = rc.Owner.UNP,
                                ShortName = rc.Owner.ShortName,
                                Address = rc.Owner.Address,
                                TreatRepairs = rc.Owner.TreatRepairs
                            }
                            : null,
                        TechConditions = rc.TechConditions,
                        Pripiska = rc.Pripiska,
                        ReRegistrationDate = rc.ReRegistrationDate,
                        Pressure = rc.Pressure,
                        TestPressure = rc.TestPressure,
                        Rent = rc.Rent,
                        Affiliation = new AffiliationDTO
                        {
                            Id = rc.Affiliation.Id,
                            Value = rc.Affiliation.Value
                        },
                        ServiceLifeYears = rc.ServiceLifeYears,
                        PeriodMajorRepair = rc.PeriodMajorRepair,
                        PeriodPeriodicTest = rc.PeriodPeriodicTest,
                        PeriodIntermediateTest = rc.PeriodIntermediateTest,
                        PeriodDepotRepair = rc.PeriodDepotRepair,
                        DangerClass = rc.DangerClass,
                        Substance = rc.Substance,
                        TareWeight2 = rc.TareWeight2,
                        TareWeight3 = rc.TareWeight3,
                        CreatedAt = rc.CreatedAt,
                        UpdatedAt = rc.UpdatedAt
                    })
                    .ToListAsync();
                return Results.Ok(cisterns);
            })
            .WithName("GetDetailedRailwayCisterns")
            .Produces<List<RailwayCisternDetailDTO>>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Get detailed list with pagination
        group.MapGet("/detailed/paged", async (
                [FromServices] ApplicationDbContext context,
                [FromQuery] int page = 1,
                [FromQuery] int pageSize = 10) =>
            {
                var query = context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .AsQueryable();

                var totalCount = await query.CountAsync();
                var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

                var cisterns = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(rc => new RailwayCisternDetailDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        Manufacturer = new ManufacturerDTO
                        {
                            Id = rc.Manufacturer.Id,
                            Name = rc.Manufacturer.Name,
                            Country = rc.Manufacturer.Country,
                            ShortName = rc.Manufacturer.ShortName,
                            Code = rc.Manufacturer.Code
                        },
                        BuildDate = rc.BuildDate,
                        TareWeight = rc.TareWeight,
                        LoadCapacity = rc.LoadCapacity,
                        Length = rc.Length,
                        AxleCount = rc.AxleCount,
                        Volume = rc.Volume,
                        FillingVolume = rc.FillingVolume,
                        InitialTareWeight = rc.InitialTareWeight,
                        Type = new WagonTypeDTO
                        {
                            Id = rc.Type.Id,
                            Name = rc.Type.Name,
                            Type = rc.Type.Type
                        },
                        Model = rc.Model != null
                            ? new WagonModelDTO
                            {
                                Id = rc.Model.Id,
                                Name = rc.Model.Name
                            }
                            : null,
                        CommissioningDate = rc.CommissioningDate,
                        SerialNumber = rc.SerialNumber,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        Registrar = rc.Registrar != null
                            ? new RegistrarDTO
                            {
                                Id = rc.Registrar.Id,
                                Name = rc.Registrar.Name
                            }
                            : null,
                        Notes = rc.Notes,
                        Owner = rc.Owner != null
                            ? new OwnerDTO
                            {
                                Id = rc.Owner.Id,
                                Name = rc.Owner.Name,
                                UNP = rc.Owner.UNP,
                                ShortName = rc.Owner.ShortName,
                                Address = rc.Owner.Address,
                                TreatRepairs = rc.Owner.TreatRepairs
                            }
                            : null,
                        TechConditions = rc.TechConditions,
                        Pripiska = rc.Pripiska,
                        ReRegistrationDate = rc.ReRegistrationDate,
                        Pressure = rc.Pressure,
                        TestPressure = rc.TestPressure,
                        Rent = rc.Rent,
                        Affiliation = new AffiliationDTO
                        {
                            Id = rc.Affiliation.Id,
                            Value = rc.Affiliation.Value
                        },
                        ServiceLifeYears = rc.ServiceLifeYears,
                        PeriodMajorRepair = rc.PeriodMajorRepair,
                        PeriodPeriodicTest = rc.PeriodPeriodicTest,
                        PeriodIntermediateTest = rc.PeriodIntermediateTest,
                        PeriodDepotRepair = rc.PeriodDepotRepair,
                        DangerClass = rc.DangerClass,
                        Substance = rc.Substance,
                        TareWeight2 = rc.TareWeight2,
                        TareWeight3 = rc.TareWeight3,
                        CreatedAt = rc.CreatedAt,
                        UpdatedAt = rc.UpdatedAt
                    })
                    .ToListAsync();

                var response = new ResponseForPagination(cisterns, 
                    totalCount, 
                    totalPages,
                    page, 
                    pageSize);

                return Results.Ok(response);
            })
            .WithName("GetPagedDetailedRailwayCisterns")
            .Produces<ResponseForPagination>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Search detailed list by number
        group.MapGet("/detailed/search", async (
                [FromServices] ApplicationDbContext context,
                [FromQuery] string number) =>
            {
                if (string.IsNullOrWhiteSpace(number))
                    return Results.BadRequest("Search number is required");

                var cisterns = await context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .Where(rc => rc.Number.Contains(number))
                    .Select(rc => new RailwayCisternDetailDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        Manufacturer = new ManufacturerDTO
                        {
                            Id = rc.Manufacturer.Id,
                            Name = rc.Manufacturer.Name,
                            Country = rc.Manufacturer.Country,
                            ShortName = rc.Manufacturer.ShortName,
                            Code = rc.Manufacturer.Code
                        },
                        BuildDate = rc.BuildDate,
                        TareWeight = rc.TareWeight,
                        LoadCapacity = rc.LoadCapacity,
                        Length = rc.Length,
                        AxleCount = rc.AxleCount,
                        Volume = rc.Volume,
                        FillingVolume = rc.FillingVolume,
                        InitialTareWeight = rc.InitialTareWeight,
                        Type = new WagonTypeDTO
                        {
                            Id = rc.Type.Id,
                            Name = rc.Type.Name,
                            Type = rc.Type.Type
                        },
                        Model = rc.Model != null
                            ? new WagonModelDTO
                            {
                                Id = rc.Model.Id,
                                Name = rc.Model.Name
                            }
                            : null,
                        CommissioningDate = rc.CommissioningDate,
                        SerialNumber = rc.SerialNumber,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        Registrar = rc.Registrar != null
                            ? new RegistrarDTO
                            {
                                Id = rc.Registrar.Id,
                                Name = rc.Registrar.Name
                            }
                            : null,
                        Notes = rc.Notes,
                        Owner = rc.Owner != null
                            ? new OwnerDTO
                            {
                                Id = rc.Owner.Id,
                                Name = rc.Owner.Name,
                                UNP = rc.Owner.UNP,
                                ShortName = rc.Owner.ShortName,
                                Address = rc.Owner.Address,
                                TreatRepairs = rc.Owner.TreatRepairs
                            }
                            : null,
                        TechConditions = rc.TechConditions,
                        Pripiska = rc.Pripiska,
                        ReRegistrationDate = rc.ReRegistrationDate,
                        Pressure = rc.Pressure,
                        TestPressure = rc.TestPressure,
                        Rent = rc.Rent,
                        Affiliation = new AffiliationDTO
                        {
                            Id = rc.Affiliation.Id,
                            Value = rc.Affiliation.Value
                        },
                        ServiceLifeYears = rc.ServiceLifeYears,
                        PeriodMajorRepair = rc.PeriodMajorRepair,
                        PeriodPeriodicTest = rc.PeriodPeriodicTest,
                        PeriodIntermediateTest = rc.PeriodIntermediateTest,
                        PeriodDepotRepair = rc.PeriodDepotRepair,
                        DangerClass = rc.DangerClass,
                        Substance = rc.Substance,
                        TareWeight2 = rc.TareWeight2,
                        TareWeight3 = rc.TareWeight3,
                        CreatedAt = rc.CreatedAt,
                        UpdatedAt = rc.UpdatedAt
                    })
                    .ToListAsync();

                return Results.Ok(cisterns);
            })
            .WithName("SearchDetailedRailwayCisterns")
            .Produces<List<RailwayCisternDetailDTO>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .RequirePermissions(Permission.Read);

        // Get by ID with detailed info
        group.MapGet("/{id}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
            {
                var cistern = await context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Where(rc => rc.Id == id)
                    .Select(rc => new RailwayCisternDetailDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        Manufacturer = new ManufacturerDTO
                        {
                            Id = rc.Manufacturer.Id,
                            Name = rc.Manufacturer.Name,
                            Country = rc.Manufacturer.Country,
                            ShortName = rc.Manufacturer.ShortName,
                            Code = rc.Manufacturer.Code,
                            CreatedAt = rc.Manufacturer.CreatedAt,
                            UpdatedAt = rc.Manufacturer.UpdatedAt
                        },
                        BuildDate = rc.BuildDate,
                        TareWeight = rc.TareWeight,
                        LoadCapacity = rc.LoadCapacity,
                        Length = rc.Length,
                        AxleCount = rc.AxleCount,
                        Volume = rc.Volume,
                        FillingVolume = rc.FillingVolume,
                        InitialTareWeight = rc.InitialTareWeight,
                        Type = new WagonTypeDTO
                        {
                            Id = rc.Type.Id,
                            Name = rc.Type.Name,
                            Type = rc.Type.Type
                        },
                        Model = rc.Model != null
                            ? new WagonModelDTO
                            {
                                Id = rc.Model.Id,
                                Name = rc.Model.Name
                            }
                            : null,
                        CommissioningDate = rc.CommissioningDate,
                        SerialNumber = rc.SerialNumber,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        Registrar = rc.Registrar != null
                            ? new RegistrarDTO
                            {
                                Id = rc.Registrar.Id,
                                Name = rc.Registrar.Name
                            }
                            : null,
                        Notes = rc.Notes,
                        Owner = rc.Owner != null
                            ? new OwnerDTO
                            {
                                Id = rc.Owner.Id,
                                Name = rc.Owner.Name,
                                UNP = rc.Owner.UNP,
                                ShortName = rc.Owner.ShortName,
                                Address = rc.Owner.Address,
                                TreatRepairs = rc.Owner.TreatRepairs,
                                CreatedAt = rc.Owner.CreatedAt,
                                UpdatedAt = rc.Owner.UpdatedAt
                            }
                            : null,
                        TechConditions = rc.TechConditions,
                        Pripiska = rc.Pripiska,
                        ReRegistrationDate = rc.ReRegistrationDate,
                        Pressure = rc.Pressure,
                        TestPressure = rc.TestPressure,
                        Rent = rc.Rent,
                        Affiliation = new AffiliationDTO
                        {
                            Id = rc.Affiliation.Id,
                            Value = rc.Affiliation.Value
                        },
                        ServiceLifeYears = rc.ServiceLifeYears,
                        PeriodMajorRepair = rc.PeriodMajorRepair,
                        PeriodPeriodicTest = rc.PeriodPeriodicTest,
                        PeriodIntermediateTest = rc.PeriodIntermediateTest,
                        PeriodDepotRepair = rc.PeriodDepotRepair,
                        DangerClass = rc.DangerClass,
                        Substance = rc.Substance,
                        TareWeight2 = rc.TareWeight2,
                        TareWeight3 = rc.TareWeight3,
                        CreatedAt = rc.CreatedAt,
                        UpdatedAt = rc.UpdatedAt
                    })
                    .FirstOrDefaultAsync();

                return cistern is null ? Results.NotFound() : Results.Ok(cistern);
            })
            .WithName("GetRailwayCisternById")
            .Produces<RailwayCisternDetailDTO>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .RequirePermissions(Permission.Read);

        group.MapPost("/",
                async ([FromServices] ApplicationDbContext context, [FromBody] CreateRailwayCisternDTO dto,
                    HttpContext httpContext) =>
                {
                    var cistern = new RailwayCistern
                    {
                        Number = dto.Number,
                        ManufacturerId = dto.ManufacturerId,
                        BuildDate = dto.BuildDate,
                        TareWeight = dto.TareWeight,
                        LoadCapacity = dto.LoadCapacity,
                        Length = dto.Length,
                        AxleCount = dto.AxleCount,
                        Volume = dto.Volume,
                        FillingVolume = dto.FillingVolume,
                        InitialTareWeight = dto.InitialTareWeight,
                        TypeId = dto.TypeId,
                        ModelId = dto.ModelId,
                        CommissioningDate = dto.CommissioningDate,
                        SerialNumber = dto.SerialNumber,
                        RegistrationNumber = dto.RegistrationNumber,
                        RegistrationDate = dto.RegistrationDate,
                        RegistrarId = dto.RegistrarId,
                        Notes = dto.Notes,
                        CreatedAt = DateTimeOffset.UtcNow,
                        UpdatedAt = DateTimeOffset.UtcNow,
                        CreatorId = httpContext.User.FindFirstValue("userId"),
                        OwnerId = dto.OwnerId,
                        TechConditions = dto.TechConditions,
                        Pripiska = dto.Pripiska,
                        ReRegistrationDate = dto.ReRegistrationDate,
                        Pressure = dto.Pressure,
                        TestPressure = dto.TestPressure,
                        Rent = dto.Rent,
                        AffiliationId = dto.AffiliationId,
                        ServiceLifeYears = dto.ServiceLifeYears,
                        PeriodMajorRepair = dto.PeriodMajorRepair,
                        PeriodPeriodicTest = dto.PeriodPeriodicTest,
                        PeriodIntermediateTest = dto.PeriodIntermediateTest,
                        PeriodDepotRepair = dto.PeriodDepotRepair,
                        DangerClass = dto.DangerClass,
                        Substance = dto.Substance,
                        TareWeight2 = dto.TareWeight2,
                        TareWeight3 = dto.TareWeight3
                    };

                    context.Add(cistern);
                    await context.SaveChangesAsync();

                    return Results.Created($"/api/railway-cisterns/{cistern.Id}", cistern.Id);
                })
            .WithName("CreateRailwayCistern")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .RequirePermissions(Permission.Create);

        group.MapPut("/{id}",
                async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id,
                    [FromBody] UpdateRailwayCisternDTO dto) =>
                {
                    var cistern = await context.Set<RailwayCistern>().FindAsync(id);
                    if (cistern == null)
                        return Results.NotFound();

                    cistern.Number = dto.Number;
                    cistern.ManufacturerId = dto.ManufacturerId;
                    cistern.BuildDate = dto.BuildDate;
                    cistern.TareWeight = dto.TareWeight;
                    cistern.LoadCapacity = dto.LoadCapacity;
                    cistern.Length = dto.Length;
                    cistern.AxleCount = dto.AxleCount;
                    cistern.Volume = dto.Volume;
                    cistern.FillingVolume = dto.FillingVolume;
                    cistern.InitialTareWeight = dto.InitialTareWeight;
                    cistern.TypeId = dto.TypeId;
                    cistern.ModelId = dto.ModelId;
                    cistern.CommissioningDate = dto.CommissioningDate;
                    cistern.SerialNumber = dto.SerialNumber;
                    cistern.RegistrationNumber = dto.RegistrationNumber;
                    cistern.RegistrationDate = dto.RegistrationDate;
                    cistern.RegistrarId = dto.RegistrarId;
                    cistern.Notes = dto.Notes;
                    cistern.UpdatedAt = DateTimeOffset.UtcNow;
                    cistern.OwnerId = dto.OwnerId;
                    cistern.TechConditions = dto.TechConditions;
                    cistern.Pripiska = dto.Pripiska;
                    cistern.ReRegistrationDate = dto.ReRegistrationDate;
                    cistern.Pressure = dto.Pressure;
                    cistern.TestPressure = dto.TestPressure;
                    cistern.Rent = dto.Rent;
                    cistern.AffiliationId = dto.AffiliationId;
                    cistern.ServiceLifeYears = dto.ServiceLifeYears;
                    cistern.PeriodMajorRepair = dto.PeriodMajorRepair;
                    cistern.PeriodPeriodicTest = dto.PeriodPeriodicTest;
                    cistern.PeriodIntermediateTest = dto.PeriodIntermediateTest;
                    cistern.PeriodDepotRepair = dto.PeriodDepotRepair;
                    cistern.DangerClass = dto.DangerClass;
                    cistern.Substance = dto.Substance;
                    cistern.TareWeight2 = dto.TareWeight2;
                    cistern.TareWeight3 = dto.TareWeight3;

                    await context.SaveChangesAsync();
                    return Results.NoContent();
                })
            .WithName("UpdateRailwayCistern")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem()
            .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
            {
                var cistern = await context.Set<RailwayCistern>().FindAsync(id);
                if (cistern == null)
                    return Results.NotFound();

                context.Remove(cistern);
                await context.SaveChangesAsync();
                return Results.NoContent();
            })
            .WithName("DeleteRailwayCistern")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .RequirePermissions(Permission.Delete);

        // Advanced search with filtering and sorting
        group.MapPost("/search", async (
                [FromServices] ApplicationDbContext context,
                [FromBody] RailwayCisternFilterSortDTO request) =>
            {
                var query = context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .AsQueryable();

                if (request.Filters != null)
                {
                    var f = request.Filters;
                        
                    if (f.Numbers != null && f.Numbers.Any())
                        query = query.Where(rc => f.Numbers.Contains(rc.Number));
                        
                    if (f.ManufacturerIds != null && f.ManufacturerIds.Any())
                        query = query.Where(rc => f.ManufacturerIds.Contains(rc.ManufacturerId));
                        
                    if (f.BuildDateFrom.HasValue)
                        query = query.Where(rc => rc.BuildDate >= f.BuildDateFrom);
                    if (f.BuildDateTo.HasValue)
                        query = query.Where(rc => rc.BuildDate <= f.BuildDateTo);
                        
                    if (f.TareWeightFrom.HasValue)
                        query = query.Where(rc => rc.TareWeight >= f.TareWeightFrom);
                    if (f.TareWeightTo.HasValue)
                        query = query.Where(rc => rc.TareWeight <= f.TareWeightTo);
                        
                    if (f.LoadCapacityFrom.HasValue)
                        query = query.Where(rc => rc.LoadCapacity >= f.LoadCapacityFrom);
                    if (f.LoadCapacityTo.HasValue)
                        query = query.Where(rc => rc.LoadCapacity <= f.LoadCapacityTo);
                        
                    if (f.LengthFrom.HasValue)
                        query = query.Where(rc => rc.Length >= f.LengthFrom);
                    if (f.LengthTo.HasValue)
                        query = query.Where(rc => rc.Length <= f.LengthTo);
                        
                    if (f.AxleCounts != null && f.AxleCounts.Any())
                        query = query.Where(rc => f.AxleCounts.Contains(rc.AxleCount));
                        
                    if (f.VolumeFrom.HasValue)
                        query = query.Where(rc => rc.Volume >= f.VolumeFrom);
                    if (f.VolumeTo.HasValue)
                        query = query.Where(rc => rc.Volume <= f.VolumeTo);
                        
                    if (f.FillingVolumeFrom.HasValue)
                        query = query.Where(rc => rc.FillingVolume >= f.FillingVolumeFrom);
                    if (f.FillingVolumeTo.HasValue)
                        query = query.Where(rc => rc.FillingVolume <= f.FillingVolumeTo);
                        
                    if (f.InitialTareWeightFrom.HasValue)
                        query = query.Where(rc => rc.InitialTareWeight >= f.InitialTareWeightFrom);
                    if (f.InitialTareWeightTo.HasValue)
                        query = query.Where(rc => rc.InitialTareWeight <= f.InitialTareWeightTo);
                        
                    if (f.TypeIds != null && f.TypeIds.Any())
                        query = query.Where(rc => f.TypeIds.Contains(rc.TypeId));
                        
                    if (f.ModelIds != null && f.ModelIds.Any())
                        query = query.Where(rc => rc.ModelId.HasValue && f.ModelIds.Contains(rc.ModelId.Value));
                        
                    if (f.CommissioningDateFrom.HasValue)
                        query = query.Where(rc => rc.CommissioningDate >= f.CommissioningDateFrom);
                    if (f.CommissioningDateTo.HasValue)
                        query = query.Where(rc => rc.CommissioningDate <= f.CommissioningDateTo);
                        
                    if (f.SerialNumbers != null && f.SerialNumbers.Any())
                        query = query.Where(rc => f.SerialNumbers.Contains(rc.SerialNumber));
                        
                    if (f.RegistrationNumbers != null && f.RegistrationNumbers.Any())
                        query = query.Where(rc => f.RegistrationNumbers.Contains(rc.RegistrationNumber));
                        
                    if (f.RegistrationDateFrom.HasValue)
                        query = query.Where(rc => rc.RegistrationDate >= f.RegistrationDateFrom);
                    if (f.RegistrationDateTo.HasValue)
                        query = query.Where(rc => rc.RegistrationDate <= f.RegistrationDateTo);
                        
                    if (f.RegistrarIds != null && f.RegistrarIds.Any())
                        query = query.Where(rc => rc.RegistrarId.HasValue && f.RegistrarIds.Contains(rc.RegistrarId.Value));
                        
                    if (f.OwnerIds != null && f.OwnerIds.Any())
                        query = query.Where(rc => rc.OwnerId.HasValue && f.OwnerIds.Contains(rc.OwnerId.Value));
                        
                    if (f.TechConditions != null && f.TechConditions.Any())
                        query = query.Where(rc => rc.TechConditions != null && f.TechConditions.Contains(rc.TechConditions));
                        
                    if (f.Prispiski != null && f.Prispiski.Any())
                        query = query.Where(rc => rc.Pripiska != null && f.Prispiski.Contains(rc.Pripiska));
                        
                    if (f.ReRegistrationDateFrom.HasValue)
                        query = query.Where(rc => rc.ReRegistrationDate >= f.ReRegistrationDateFrom);
                    if (f.ReRegistrationDateTo.HasValue)
                        query = query.Where(rc => rc.ReRegistrationDate <= f.ReRegistrationDateTo);
                        
                    if (f.PressureFrom.HasValue)
                        query = query.Where(rc => rc.Pressure >= f.PressureFrom);
                    if (f.PressureTo.HasValue)
                        query = query.Where(rc => rc.Pressure <= f.PressureTo);
                        
                    if (f.TestPressureFrom.HasValue)
                        query = query.Where(rc => rc.TestPressure >= f.TestPressureFrom);
                    if (f.TestPressureTo.HasValue)
                        query = query.Where(rc => rc.TestPressure <= f.TestPressureTo);
                        
                    if (f.Rents != null && f.Rents.Any())
                        query = query.Where(rc => rc.Rent != null && f.Rents.Contains(rc.Rent));
                        
                    if (f.AffiliationIds != null && f.AffiliationIds.Any())
                        query = query.Where(rc => f.AffiliationIds.Contains(rc.AffiliationId));
                        
                    if (f.ServiceLifeYearsFrom.HasValue)
                        query = query.Where(rc => rc.ServiceLifeYears >= f.ServiceLifeYearsFrom);
                    if (f.ServiceLifeYearsTo.HasValue)
                        query = query.Where(rc => rc.ServiceLifeYears <= f.ServiceLifeYearsTo);
                        
                    if (f.PeriodMajorRepairFrom.HasValue)
                        query = query.Where(rc => rc.PeriodMajorRepair >= f.PeriodMajorRepairFrom);
                    if (f.PeriodMajorRepairTo.HasValue)
                        query = query.Where(rc => rc.PeriodMajorRepair <= f.PeriodMajorRepairTo);
                        
                    if (f.PeriodPeriodicTestFrom.HasValue)
                        query = query.Where(rc => rc.PeriodPeriodicTest >= f.PeriodPeriodicTestFrom);
                    if (f.PeriodPeriodicTestTo.HasValue)
                        query = query.Where(rc => rc.PeriodPeriodicTest <= f.PeriodPeriodicTestTo);
                        
                    if (f.PeriodIntermediateTestFrom.HasValue)
                        query = query.Where(rc => rc.PeriodIntermediateTest >= f.PeriodIntermediateTestFrom);
                    if (f.PeriodIntermediateTestTo.HasValue)
                        query = query.Where(rc => rc.PeriodIntermediateTest <= f.PeriodIntermediateTestTo);
                        
                    if (f.PeriodDepotRepairFrom.HasValue)
                        query = query.Where(rc => rc.PeriodDepotRepair >= f.PeriodDepotRepairFrom);
                    if (f.PeriodDepotRepairTo.HasValue)
                        query = query.Where(rc => rc.PeriodDepotRepair <= f.PeriodDepotRepairTo);
                        
                    if (f.DangerClasses != null && f.DangerClasses.Any())
                        query = query.Where(rc => f.DangerClasses.Contains(rc.DangerClass));
                        
                    if (f.Substances != null && f.Substances.Any())
                        query = query.Where(rc => f.Substances.Contains(rc.Substance));
                        
                    if (f.TareWeight2From.HasValue)
                        query = query.Where(rc => rc.TareWeight2 >= f.TareWeight2From);
                    if (f.TareWeight2To.HasValue)
                        query = query.Where(rc => rc.TareWeight2 <= f.TareWeight2To);
                        
                    if (f.TareWeight3From.HasValue)
                        query = query.Where(rc => rc.TareWeight3 >= f.TareWeight3From);
                    if (f.TareWeight3To.HasValue)
                        query = query.Where(rc => rc.TareWeight3 <= f.TareWeight3To);
                        
                    if (f.CreatedAtFrom.HasValue)
                        query = query.Where(rc => rc.CreatedAt >= f.CreatedAtFrom);
                    if (f.CreatedAtTo.HasValue)
                        query = query.Where(rc => rc.CreatedAt <= f.CreatedAtTo);
                        
                    if (f.UpdatedAtFrom.HasValue)
                        query = query.Where(rc => rc.UpdatedAt >= f.UpdatedAtFrom);
                    if (f.UpdatedAtTo.HasValue)
                        query = query.Where(rc => rc.UpdatedAt <= f.UpdatedAtTo);
                }

                // Apply sorting
                if (request.SortFields != null && request.SortFields.Any())
                {
                    var firstSort = request.SortFields.First();
                    var orderedQuery = ApplySort(query, firstSort);

                    foreach (var sortField in request.SortFields.Skip(1))
                    {
                        orderedQuery = ApplyThenBy(orderedQuery, sortField);
                    }

                    query = orderedQuery;
                }
                else
                {
                    // Default sorting by UpdatedAt descending if no sort specified
                    query = query.OrderByDescending(rc => rc.UpdatedAt);
                }

                var totalCount = await query.CountAsync();
                var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

                var cisterns = await query
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(rc => new RailwayCisternDetailDTO
                    {
                        Id = rc.Id,
                        Number = rc.Number,
                        Manufacturer = new ManufacturerDTO
                        {
                            Id = rc.Manufacturer.Id,
                            Name = rc.Manufacturer.Name,
                            Country = rc.Manufacturer.Country,
                            ShortName = rc.Manufacturer.ShortName,
                            Code = rc.Manufacturer.Code
                        },
                        BuildDate = rc.BuildDate,
                        TareWeight = rc.TareWeight,
                        LoadCapacity = rc.LoadCapacity,
                        Length = rc.Length,
                        AxleCount = rc.AxleCount,
                        Volume = rc.Volume,
                        FillingVolume = rc.FillingVolume,
                        InitialTareWeight = rc.InitialTareWeight,
                        Type = new WagonTypeDTO
                        {
                            Id = rc.Type.Id,
                            Name = rc.Type.Name,
                            Type = rc.Type.Type
                        },
                        Model = rc.Model != null
                            ? new WagonModelDTO
                            {
                                Id = rc.Model.Id,
                                Name = rc.Model.Name
                            }
                            : null,
                        CommissioningDate = rc.CommissioningDate,
                        SerialNumber = rc.SerialNumber,
                        RegistrationNumber = rc.RegistrationNumber,
                        RegistrationDate = rc.RegistrationDate,
                        Registrar = rc.Registrar != null
                            ? new RegistrarDTO
                            {
                                Id = rc.Registrar.Id,
                                Name = rc.Registrar.Name
                            }
                            : null,
                        Notes = rc.Notes,
                        Owner = rc.Owner != null
                            ? new OwnerDTO
                            {
                                Id = rc.Owner.Id,
                                Name = rc.Owner.Name,
                                UNP = rc.Owner.UNP,
                                ShortName = rc.Owner.ShortName,
                                Address = rc.Owner.Address,
                                TreatRepairs = rc.Owner.TreatRepairs
                            }
                            : null,
                        TechConditions = rc.TechConditions,
                        Pripiska = rc.Pripiska,
                        ReRegistrationDate = rc.ReRegistrationDate,
                        Pressure = rc.Pressure,
                        TestPressure = rc.TestPressure,
                        Rent = rc.Rent,
                        Affiliation = new AffiliationDTO
                        {
                            Id = rc.Affiliation.Id,
                            Value = rc.Affiliation.Value
                        },
                        ServiceLifeYears = rc.ServiceLifeYears,
                        PeriodMajorRepair = rc.PeriodMajorRepair,
                        PeriodPeriodicTest = rc.PeriodPeriodicTest,
                        PeriodIntermediateTest = rc.PeriodIntermediateTest,
                        PeriodDepotRepair = rc.PeriodDepotRepair,
                        DangerClass = rc.DangerClass,
                        Substance = rc.Substance,
                        TareWeight2 = rc.TareWeight2,
                        TareWeight3 = rc.TareWeight3,
                        CreatedAt = rc.CreatedAt,
                        UpdatedAt = rc.UpdatedAt
                    })
                    .ToListAsync();

                var response = new ResponseForPagination(cisterns,
                    totalCount,
                    totalPages,
                    request.Page,
                    request.PageSize);

                return Results.Ok(response);
            })
            .WithName("SearchRailwayCisternsWithFilters")
            .Produces<ResponseForPagination>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);
    }

    private static IOrderedQueryable<RailwayCistern> ApplySort(IQueryable<RailwayCistern> query, SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "number" => sort.Descending ? query.OrderByDescending(rc => rc.Number) : query.OrderBy(rc => rc.Number),
            "manufacturername" => sort.Descending ? query.OrderByDescending(rc => rc.Manufacturer.Name) : query.OrderBy(rc => rc.Manufacturer.Name),
            "builddate" => sort.Descending ? query.OrderByDescending(rc => rc.BuildDate) : query.OrderBy(rc => rc.BuildDate),
            "tareweight" => sort.Descending ? query.OrderByDescending(rc => rc.TareWeight) : query.OrderBy(rc => rc.TareWeight),
            "loadcapacity" => sort.Descending ? query.OrderByDescending(rc => rc.LoadCapacity) : query.OrderBy(rc => rc.LoadCapacity),
            "length" => sort.Descending ? query.OrderByDescending(rc => rc.Length) : query.OrderBy(rc => rc.Length),
            "axlecount" => sort.Descending ? query.OrderByDescending(rc => rc.AxleCount) : query.OrderBy(rc => rc.AxleCount),
            "volume" => sort.Descending ? query.OrderByDescending(rc => rc.Volume) : query.OrderBy(rc => rc.Volume),
            "fillingvolume" => sort.Descending ? query.OrderByDescending(rc => rc.FillingVolume) : query.OrderBy(rc => rc.FillingVolume),
            "initialtareweight" => sort.Descending ? query.OrderByDescending(rc => rc.InitialTareWeight) : query.OrderBy(rc => rc.InitialTareWeight),
            "typename" => sort.Descending ? query.OrderByDescending(rc => rc.Type.Name) : query.OrderBy(rc => rc.Type.Name),
            "modelname" => sort.Descending ? query.OrderByDescending(rc => rc.Model.Name) : query.OrderBy(rc => rc.Model.Name),
            "commissioningdate" => sort.Descending ? query.OrderByDescending(rc => rc.CommissioningDate) : query.OrderBy(rc => rc.CommissioningDate),
            "serialnumber" => sort.Descending ? query.OrderByDescending(rc => rc.SerialNumber) : query.OrderBy(rc => rc.SerialNumber),
            "registrationnumber" => sort.Descending ? query.OrderByDescending(rc => rc.RegistrationNumber) : query.OrderBy(rc => rc.RegistrationNumber),
            "registrationdate" => sort.Descending ? query.OrderByDescending(rc => rc.RegistrationDate) : query.OrderBy(rc => rc.RegistrationDate),
            "registrarname" => sort.Descending ? query.OrderByDescending(rc => rc.Registrar.Name) : query.OrderBy(rc => rc.Registrar.Name),
            "notes" => sort.Descending ? query.OrderByDescending(rc => rc.Notes) : query.OrderBy(rc => rc.Notes),
            "ownername" => sort.Descending ? query.OrderByDescending(rc => rc.Owner.Name) : query.OrderBy(rc => rc.Owner.Name),
            "techconditions" => sort.Descending ? query.OrderByDescending(rc => rc.TechConditions) : query.OrderBy(rc => rc.TechConditions),
            "pripiska" => sort.Descending ? query.OrderByDescending(rc => rc.Pripiska) : query.OrderBy(rc => rc.Pripiska),
            "reregistrationdate" => sort.Descending ? query.OrderByDescending(rc => rc.ReRegistrationDate) : query.OrderBy(rc => rc.ReRegistrationDate),
            "pressure" => sort.Descending ? query.OrderByDescending(rc => rc.Pressure) : query.OrderBy(rc => rc.Pressure),
            "testpressure" => sort.Descending ? query.OrderByDescending(rc => rc.TestPressure) : query.OrderBy(rc => rc.TestPressure),
            "rent" => sort.Descending ? query.OrderByDescending(rc => rc.Rent) : query.OrderBy(rc => rc.Rent),
            "affiliationvalue" => sort.Descending ? query.OrderByDescending(rc => rc.Affiliation.Value) : query.OrderBy(rc => rc.Affiliation.Value),
            "servicelifeyears" => sort.Descending ? query.OrderByDescending(rc => rc.ServiceLifeYears) : query.OrderBy(rc => rc.ServiceLifeYears),
            "periodmajorrepair" => sort.Descending ? query.OrderByDescending(rc => rc.PeriodMajorRepair) : query.OrderBy(rc => rc.PeriodMajorRepair),
            "periodperiodictest" => sort.Descending ? query.OrderByDescending(rc => rc.PeriodPeriodicTest) : query.OrderBy(rc => rc.PeriodPeriodicTest),
            "periodintermediatetest" => sort.Descending ? query.OrderByDescending(rc => rc.PeriodIntermediateTest) : query.OrderBy(rc => rc.PeriodIntermediateTest),
            "perioddepotrepair" => sort.Descending ? query.OrderByDescending(rc => rc.PeriodDepotRepair) : query.OrderBy(rc => rc.PeriodDepotRepair),
            "dangerclass" => sort.Descending ? query.OrderByDescending(rc => rc.DangerClass) : query.OrderBy(rc => rc.DangerClass),
            "substance" => sort.Descending ? query.OrderByDescending(rc => rc.Substance) : query.OrderBy(rc => rc.Substance),
            "tareweight2" => sort.Descending ? query.OrderByDescending(rc => rc.TareWeight2) : query.OrderBy(rc => rc.TareWeight2),
            "tareweight3" => sort.Descending ? query.OrderByDescending(rc => rc.TareWeight3) : query.OrderBy(rc => rc.TareWeight3),
            "createdat" => sort.Descending ? query.OrderByDescending(rc => rc.CreatedAt) : query.OrderBy(rc => rc.CreatedAt),
            "updatedat" => sort.Descending ? query.OrderByDescending(rc => rc.UpdatedAt) : query.OrderBy(rc => rc.UpdatedAt),
            _ => query.OrderByDescending(rc => rc.UpdatedAt) // default sorting
        };
    }

    private static IOrderedQueryable<RailwayCistern> ApplyThenBy(IOrderedQueryable<RailwayCistern> query, SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "number" => sort.Descending ? query.ThenByDescending(rc => rc.Number) : query.ThenBy(rc => rc.Number),
            "manufacturername" => sort.Descending ? query.ThenByDescending(rc => rc.Manufacturer.Name) : query.ThenBy(rc => rc.Manufacturer.Name),
            "builddate" => sort.Descending ? query.ThenByDescending(rc => rc.BuildDate) : query.ThenBy(rc => rc.BuildDate),
            "tareweight" => sort.Descending ? query.ThenByDescending(rc => rc.TareWeight) : query.ThenBy(rc => rc.TareWeight),
            "loadcapacity" => sort.Descending ? query.ThenByDescending(rc => rc.LoadCapacity) : query.ThenBy(rc => rc.LoadCapacity),
            "length" => sort.Descending ? query.ThenByDescending(rc => rc.Length) : query.ThenBy(rc => rc.Length),
            "axlecount" => sort.Descending ? query.ThenByDescending(rc => rc.AxleCount) : query.ThenBy(rc => rc.AxleCount),
            "volume" => sort.Descending ? query.ThenByDescending(rc => rc.Volume) : query.ThenBy(rc => rc.Volume),
            "fillingvolume" => sort.Descending ? query.ThenByDescending(rc => rc.FillingVolume) : query.ThenBy(rc => rc.FillingVolume),
            "initialtareweight" => sort.Descending ? query.ThenByDescending(rc => rc.InitialTareWeight) : query.ThenBy(rc => rc.InitialTareWeight),
            "typename" => sort.Descending ? query.ThenByDescending(rc => rc.Type.Name) : query.ThenBy(rc => rc.Type.Name),
            "modelname" => sort.Descending ? query.ThenByDescending(rc => rc.Model.Name) : query.ThenBy(rc => rc.Model.Name),
            "commissioningdate" => sort.Descending ? query.ThenByDescending(rc => rc.CommissioningDate) : query.ThenBy(rc => rc.CommissioningDate),
            "serialnumber" => sort.Descending ? query.ThenByDescending(rc => rc.SerialNumber) : query.ThenBy(rc => rc.SerialNumber),
            "registrationnumber" => sort.Descending ? query.ThenByDescending(rc => rc.RegistrationNumber) : query.ThenBy(rc => rc.RegistrationNumber),
            "registrationdate" => sort.Descending ? query.ThenByDescending(rc => rc.RegistrationDate) : query.ThenBy(rc => rc.RegistrationDate),
            "registrarname" => sort.Descending ? query.ThenByDescending(rc => rc.Registrar.Name) : query.ThenBy(rc => rc.Registrar.Name),
            "notes" => sort.Descending ? query.ThenByDescending(rc => rc.Notes) : query.ThenBy(rc => rc.Notes),
            "ownername" => sort.Descending ? query.ThenByDescending(rc => rc.Owner.Name) : query.ThenBy(rc => rc.Owner.Name),
            "techconditions" => sort.Descending ? query.ThenByDescending(rc => rc.TechConditions) : query.ThenBy(rc => rc.TechConditions),
            "pripiska" => sort.Descending ? query.ThenByDescending(rc => rc.Pripiska) : query.ThenBy(rc => rc.Pripiska),
            "reregistrationdate" => sort.Descending ? query.ThenByDescending(rc => rc.ReRegistrationDate) : query.ThenBy(rc => rc.ReRegistrationDate),
            "pressure" => sort.Descending ? query.ThenByDescending(rc => rc.Pressure) : query.ThenBy(rc => rc.Pressure),
            "testpressure" => sort.Descending ? query.ThenByDescending(rc => rc.TestPressure) : query.ThenBy(rc => rc.TestPressure),
            "rent" => sort.Descending ? query.ThenByDescending(rc => rc.Rent) : query.ThenBy(rc => rc.Rent),
            "affiliationvalue" => sort.Descending ? query.ThenByDescending(rc => rc.Affiliation.Value) : query.ThenBy(rc => rc.Affiliation.Value),
            "servicelifeyears" => sort.Descending ? query.ThenByDescending(rc => rc.ServiceLifeYears) : query.ThenBy(rc => rc.ServiceLifeYears),
            "periodmajorrepair" => sort.Descending ? query.ThenByDescending(rc => rc.PeriodMajorRepair) : query.ThenBy(rc => rc.PeriodMajorRepair),
            "periodperiodictest" => sort.Descending ? query.ThenByDescending(rc => rc.PeriodPeriodicTest) : query.ThenBy(rc => rc.PeriodPeriodicTest),
            "periodintermediatetest" => sort.Descending ? query.ThenByDescending(rc => rc.PeriodIntermediateTest) : query.ThenBy(rc => rc.PeriodIntermediateTest),
            "perioddepotrepair" => sort.Descending ? query.ThenByDescending(rc => rc.PeriodDepotRepair) : query.ThenBy(rc => rc.PeriodDepotRepair),
            "dangerclass" => sort.Descending ? query.ThenByDescending(rc => rc.DangerClass) : query.ThenBy(rc => rc.DangerClass),
            "substance" => sort.Descending ? query.ThenByDescending(rc => rc.Substance) : query.ThenBy(rc => rc.Substance),
            "tareweight2" => sort.Descending ? query.ThenByDescending(rc => rc.TareWeight2) : query.ThenBy(rc => rc.TareWeight2),
            "tareweight3" => sort.Descending ? query.ThenByDescending(rc => rc.TareWeight3) : query.ThenBy(rc => rc.TareWeight3),
            "createdat" => sort.Descending ? query.ThenByDescending(rc => rc.CreatedAt) : query.ThenBy(rc => rc.CreatedAt),
            "updatedat" => sort.Descending ? query.ThenByDescending(rc => rc.UpdatedAt) : query.ThenBy(rc => rc.UpdatedAt),
            _ => query // если поле неизвестно, оставляем текущую сортировку
        };
    }
}
