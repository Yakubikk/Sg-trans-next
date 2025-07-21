using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.Extensions;
using WebApp.Services;

namespace WebApp.Endpoints.RailwayCisterns;

public static class RailwayCisternEndpoints
{
    public static void MapRailwayCisternEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/railway-cisterns")
            .RequireAuthorization()
            .WithTags("railway_cisterns");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var railwayCisterns = await context.RailwayCisterns
                .Include(r => r.Manufacturer)
                .Include(r => r.Type)
                .Include(r => r.Model)
                .Include(r => r.Registrar)
                .Include(r => r.Vessel)
                .ToListAsync();

            return Results.Ok(railwayCisterns.Select(MapToResponse).ToList());
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var railwayCistern = await context.RailwayCisterns
                .Include(r => r.Manufacturer)
                .Include(r => r.Type)
                .Include(r => r.Model)
                .Include(r => r.Registrar)
                .Include(r => r.Vessel)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.Part)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.FromLocation)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.ToLocation)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (railwayCistern == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(MapToDetailResponse(railwayCistern));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/by-number/{number}", async ([FromServices] ApplicationDbContext context, [FromRoute] string number) =>
        {
            var railwayCistern = await context.RailwayCisterns
                .Include(r => r.Manufacturer)
                .Include(r => r.Type)
                .Include(r => r.Model)
                .Include(r => r.Registrar)
                .Include(r => r.Vessel)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.Part)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.FromLocation)
                .Include(r => r.PartInstallations)
                .ThenInclude(pi => pi.ToLocation)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (railwayCistern == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(MapToDetailResponse(railwayCistern));
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context, 
            [FromServices] ICurrentUserService currentUserService,
            [FromBody] RailwayCisternRequest request) =>
        {
            var railwayCistern = new RailwayCistern
            {
                Number = request.Number,
                ManufacturerId = request.ManufacturerId,
                BuildDate = request.BuildDate,
                TareWeight = request.TareWeight,
                LoadCapacity = request.LoadCapacity,
                Length = request.Length,
                AxleCount = request.AxleCount,
                Volume = request.Volume,
                FillingVolume = request.FillingVolume,
                InitialTareWeight = request.InitialTareWeight,
                TypeId = request.TypeId,
                ModelId = request.ModelId,
                CommissioningDate = request.CommissioningDate,
                SerialNumber = request.SerialNumber,
                RegistrationNumber = request.RegistrationNumber,
                RegistrationDate = request.RegistrationDate,
                RegistrarId = request.RegistrarId,
                Notes = request.Notes,
                CreatorId = currentUserService.GetCurrentUserId()
            };

            // Если предоставлены данные о котле, создаем его
            if (!string.IsNullOrEmpty(request.VesselSerialNumber) || request.VesselBuildDate.HasValue)
            {
                railwayCistern.Vessel = new Vessel
                {
                    VesselSerialNumber = request.VesselSerialNumber,
                    VesselBuildDate = request.VesselBuildDate
                };
            }

            // Проверяем существование связанных сущностей
            var manufacturer = await context.Manufacturers.FindAsync(request.ManufacturerId);
            if (manufacturer == null)
                return Results.NotFound($"Manufacturer with ID {request.ManufacturerId} not found");

            var type = await context.WagonTypes.FindAsync(request.TypeId);
            if (type == null)
                return Results.NotFound($"WagonType with ID {request.TypeId} not found");

            if (request.ModelId.HasValue)
            {
                var model = await context.WagonModels.FindAsync(request.ModelId.Value);
                if (model == null)
                    return Results.NotFound($"WagonModel with ID {request.ModelId} not found");
            }

            if (request.RegistrarId.HasValue)
            {
                var registrar = await context.Registrars.FindAsync(request.RegistrarId.Value);
                if (registrar == null)
                    return Results.NotFound($"Registrar with ID {request.RegistrarId} not found");
            }

            // Проверяем уникальность номера вагона
            var existingWagon = await context.RailwayCisterns.FirstOrDefaultAsync(r => r.Number == request.Number);
            if (existingWagon != null)
                return Results.BadRequest($"Railway cistern with number {request.Number} already exists");

            context.RailwayCisterns.Add(railwayCistern);
            await context.SaveChangesAsync();

            return Results.Created($"/api/railway-cisterns/{railwayCistern.Id}", new RailwayCisternResponse
            {
                Id = railwayCistern.Id,
                Number = railwayCistern.Number,
                ManufacturerId = railwayCistern.ManufacturerId,
                ManufacturerName = railwayCistern.Manufacturer.Name,
                ManufacturerCountry = railwayCistern.Manufacturer.Country,
                BuildDate = railwayCistern.BuildDate,
                TareWeight = railwayCistern.TareWeight,
                LoadCapacity = railwayCistern.LoadCapacity,
                Length = railwayCistern.Length,
                AxleCount = railwayCistern.AxleCount,
                Volume = railwayCistern.Volume,
                FillingVolume = railwayCistern.FillingVolume,
                InitialTareWeight = railwayCistern.InitialTareWeight,
                TypeId = railwayCistern.TypeId,
                TypeName = railwayCistern.Type?.Name ?? string.Empty,
                ModelId = railwayCistern.ModelId,
                ModelName = railwayCistern.Model?.Name,
                CommissioningDate = railwayCistern.CommissioningDate,
                SerialNumber = railwayCistern.SerialNumber,
                RegistrationNumber = railwayCistern.RegistrationNumber,
                RegistrationDate = railwayCistern.RegistrationDate,
                RegistrarId = railwayCistern.RegistrarId,
                RegistrarName = railwayCistern.Registrar?.Name,
                Notes = railwayCistern.Notes,
                CreatedAt = railwayCistern.CreatedAt,
                UpdatedAt = railwayCistern.UpdatedAt,
                CreatorId = railwayCistern.CreatorId,
                Vessel = railwayCistern.Vessel != null ? new VesselResponse
                {
                    Id = railwayCistern.Vessel.Id,
                    VesselSerialNumber = railwayCistern.Vessel.VesselSerialNumber,
                    VesselBuildDate = railwayCistern.Vessel.VesselBuildDate
                } : null
            });
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context, 
            [FromRoute] Guid id,
            [FromBody] RailwayCisternRequest request) =>
        {
            var railwayCistern = await context.RailwayCisterns
                .Include(r => r.Vessel)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (railwayCistern == null)
                return Results.NotFound();

            // Проверяем уникальность номера вагона
            var existingWagon = await context.RailwayCisterns.FirstOrDefaultAsync(r => r.Id != id && r.Number == request.Number);
            if (existingWagon != null)
                return Results.BadRequest($"Railway cistern with number {request.Number} already exists");

            // Проверяем существование связанных сущностей
            var manufacturer = await context.Manufacturers.FindAsync(request.ManufacturerId);
            if (manufacturer == null)
                return Results.NotFound($"Manufacturer with ID {request.ManufacturerId} not found");

            var type = await context.WagonTypes.FindAsync(request.TypeId);
            if (type == null)
                return Results.NotFound($"WagonType with ID {request.TypeId} not found");

            if (request.ModelId.HasValue)
            {
                var model = await context.WagonModels.FindAsync(request.ModelId.Value);
                if (model == null)
                    return Results.NotFound($"WagonModel with ID {request.ModelId} not found");
            }

            if (request.RegistrarId.HasValue)
            {
                var registrar = await context.Registrars.FindAsync(request.RegistrarId.Value);
                if (registrar == null)
                    return Results.NotFound($"Registrar with ID {request.RegistrarId} not found");
            }

            // Обновляем основные данные
            railwayCistern.Number = request.Number;
            railwayCistern.ManufacturerId = request.ManufacturerId;
            railwayCistern.BuildDate = request.BuildDate;
            railwayCistern.TareWeight = request.TareWeight;
            railwayCistern.LoadCapacity = request.LoadCapacity;
            railwayCistern.Length = request.Length;
            railwayCistern.AxleCount = request.AxleCount;
            railwayCistern.Volume = request.Volume;
            railwayCistern.FillingVolume = request.FillingVolume;
            railwayCistern.InitialTareWeight = request.InitialTareWeight;
            railwayCistern.TypeId = request.TypeId;
            railwayCistern.ModelId = request.ModelId;
            railwayCistern.CommissioningDate = request.CommissioningDate;
            railwayCistern.SerialNumber = request.SerialNumber;
            railwayCistern.RegistrationNumber = request.RegistrationNumber;
            railwayCistern.RegistrationDate = request.RegistrationDate;
            railwayCistern.RegistrarId = request.RegistrarId;
            railwayCistern.Notes = request.Notes;

            // Обновляем или создаем котел
            if (!string.IsNullOrEmpty(request.VesselSerialNumber) || request.VesselBuildDate.HasValue)
            {
                if (railwayCistern.Vessel == null)
                {
                    railwayCistern.Vessel = new Vessel();
                }
                railwayCistern.Vessel.VesselSerialNumber = request.VesselSerialNumber;
                railwayCistern.Vessel.VesselBuildDate = request.VesselBuildDate;
            }
            else if (railwayCistern.Vessel != null)
            {
                context.Vessels.Remove(railwayCistern.Vessel);
            }

            await context.SaveChangesAsync();

            // Получаем обновленные данные со связанными сущностями
            var updatedCistern = await context.RailwayCisterns
                .Include(r => r.Manufacturer)
                .Include(r => r.Type)
                .Include(r => r.Model)
                .Include(r => r.Registrar)
                .Include(r => r.Vessel)
                .FirstOrDefaultAsync(r => r.Id == id);

            return Results.Ok(MapToResponse(updatedCistern));
        }).RequirePermissions(Permission.Update);
    }

    private static RailwayCisternResponse MapToResponse(RailwayCistern railwayCistern)
    {
        if (railwayCistern == null) return null!;
        
        return new RailwayCisternResponse
        {
            Id = railwayCistern.Id,
            Number = railwayCistern.Number,
            ManufacturerId = railwayCistern.ManufacturerId,
            ManufacturerName = railwayCistern.Manufacturer?.Name ?? string.Empty,
            ManufacturerCountry = railwayCistern.Manufacturer?.Country ?? string.Empty,
            BuildDate = railwayCistern.BuildDate,
            TareWeight = railwayCistern.TareWeight,
            LoadCapacity = railwayCistern.LoadCapacity,
            Length = railwayCistern.Length,
            AxleCount = railwayCistern.AxleCount,
            Volume = railwayCistern.Volume,
            FillingVolume = railwayCistern.FillingVolume,
            InitialTareWeight = railwayCistern.InitialTareWeight,
            TypeId = railwayCistern.TypeId,
            TypeName = railwayCistern.Type?.Name ?? string.Empty,
            ModelId = railwayCistern.ModelId,
            ModelName = railwayCistern.Model?.Name,
            CommissioningDate = railwayCistern.CommissioningDate,
            SerialNumber = railwayCistern.SerialNumber,
            RegistrationNumber = railwayCistern.RegistrationNumber,
            RegistrationDate = railwayCistern.RegistrationDate,
            RegistrarId = railwayCistern.RegistrarId,
            RegistrarName = railwayCistern.Registrar?.Name,
            Notes = railwayCistern.Notes,
            CreatedAt = railwayCistern.CreatedAt,
            UpdatedAt = railwayCistern.UpdatedAt,
            CreatorId = railwayCistern.CreatorId,
            Vessel = railwayCistern.Vessel != null ? new VesselResponse
            {
                Id = railwayCistern.Vessel.Id,
                VesselSerialNumber = railwayCistern.Vessel.VesselSerialNumber,
                VesselBuildDate = railwayCistern.Vessel.VesselBuildDate
            } : null
        };
    }

    private static RailwayCisternDetailResponse MapToDetailResponse(RailwayCistern railwayCistern)
    {
        // Создаем детальный ответ, наследуя все свойства из базового ответа
        var detailResponse = new RailwayCisternDetailResponse();
        
        // Копируем все свойства из базового ответа
        var baseResponse = MapToResponse(railwayCistern);
        typeof(RailwayCisternResponse).GetProperties().ToList()
            .ForEach(prop => prop.SetValue(detailResponse, prop.GetValue(baseResponse)));
        
        // Добавляем информацию об установленных деталях
        detailResponse.PartInstallations = railwayCistern.PartInstallations.Select(pi => 
            new PartInstallationResponse
            {
                InstallationId = pi.Id,
                PartId = pi.PartId,
                PartName = pi.Part?.StampNumber ?? string.Empty,
                PartType = pi.Part?.PartType ?? PartType.WheelPair,
                InstalledAt = pi.InstalledAt,
                InstalledBy = pi.InstalledBy,
                RemovedAt = pi.RemovedAt,
                RemovedBy = pi.RemovedBy,
                LocationFrom = pi.FromLocation?.Name ?? string.Empty,
                LocationTo = pi.ToLocation.Name,
                Notes = pi.Notes
            }).ToList();
            
        return detailResponse;
    }
}
