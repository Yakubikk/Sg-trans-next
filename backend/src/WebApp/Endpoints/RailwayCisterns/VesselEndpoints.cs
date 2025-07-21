using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class VesselEndpoints
{
    public static void MapVesselEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/vessels")
            .RequireAuthorization()
            .WithTags("vessels");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var vessels = await context.Vessels.ToListAsync();
            return Results.Ok(vessels.Select(v => new VesselFullResponse
            {
                Id = v.Id,
                RailwayCisternId = v.RailwayCisternId,
                VesselSerialNumber = v.VesselSerialNumber,
                VesselBuildDate = v.VesselBuildDate
            }));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var vessel = await context.Vessels
                .Include(v => v.RailwayCistern)
                .ThenInclude(r => r.Manufacturer)
                .Include(v => v.RailwayCistern)
                .ThenInclude(r => r.Type)
                .Include(v => v.RailwayCistern)
                .ThenInclude(r => r.Model)
                .Include(v => v.RailwayCistern)
                .ThenInclude(r => r.Registrar)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vessel == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(new VesselDetailFullResponse
            {
                Id = vessel.Id,
                RailwayCisternId = vessel.RailwayCisternId,
                VesselSerialNumber = vessel.VesselSerialNumber,
                VesselBuildDate = vessel.VesselBuildDate,
                RailwayCistern = vessel.RailwayCistern != null ? MapToRailwayCisternResponse(vessel.RailwayCistern) : null
            });
        }).RequirePermissions(Permission.Read);

        group.MapPost("/{railwayCisternId:guid}", async ([FromServices] ApplicationDbContext context,
            [FromRoute] Guid railwayCisternId,
            [FromBody] VesselCreateRequest request) =>
        {
            var railwayCistern = await context.RailwayCisterns.FindAsync(railwayCisternId);
            if (railwayCistern == null)
            {
                return Results.NotFound("RailwayCistern not found");
            }

            if (railwayCistern.Vessel != null)
            {
                return Results.BadRequest("RailwayCistern already has a vessel");
            }

            var vessel = new Vessel
            {
                RailwayCisternId = railwayCisternId,
                VesselSerialNumber = request.VesselSerialNumber,
                VesselBuildDate = request.VesselBuildDate
            };

            context.Vessels.Add(vessel);
            await context.SaveChangesAsync();

            return Results.Created($"/api/vessels/{vessel.Id}", new VesselFullResponse
            {
                Id = vessel.Id,
                RailwayCisternId = vessel.RailwayCisternId,
                VesselSerialNumber = vessel.VesselSerialNumber,
                VesselBuildDate = vessel.VesselBuildDate
            });
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context,
            [FromRoute] Guid id, [FromBody] VesselCreateRequest request) =>
        {
            var vessel = await context.Vessels.FindAsync(id);

            if (vessel == null)
                return Results.NotFound();

            vessel.VesselSerialNumber = request.VesselSerialNumber;
            vessel.VesselBuildDate = request.VesselBuildDate;
            
            await context.SaveChangesAsync();

            return Results.Ok(new VesselFullResponse
            {
                Id = vessel.Id,
                RailwayCisternId = vessel.RailwayCisternId,
                VesselSerialNumber = vessel.VesselSerialNumber,
                VesselBuildDate = vessel.VesselBuildDate
            });
        }).RequirePermissions(Permission.Update);
    }

    private static RailwayCisternResponse MapToRailwayCisternResponse(RailwayCistern railwayCistern)
    {
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
            CreatorId = railwayCistern.CreatorId
        };
    }
}
