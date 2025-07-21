using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.DTO.Common;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class RegistrarEndpoints
{
    public static void MapRegistrarEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrars")
            .RequireAuthorization()
            .WithTags("registrars");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var registrars = await context.Registrars
                .AsNoTracking()
                .ToListAsync();
            
            return Results.Ok(registrars.Select(MapToResponse));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var registrar = await context.Registrars
                .Include(r => r.RailwayCisterns)
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);

            if (registrar == null)
                return Results.NotFound();

            return Results.Ok(MapToDetailResponse(registrar));
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context,
            [FromBody] RegistrarRequest request) =>
        {
            // Проверяем уникальность имени
            var existingRegistrar = await context.Registrars
                .FirstOrDefaultAsync(r => r.Name == request.Name);
                
            if (existingRegistrar != null)
                return Results.BadRequest($"Registrar with name '{request.Name}' already exists");

            var registrar = new Registrar
            {
                Name = request.Name
            };

            context.Registrars.Add(registrar);
            await context.SaveChangesAsync();

            return Results.Created($"/api/registrars/{registrar.Id}", MapToResponse(registrar));
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context,
            [FromRoute] Guid id, [FromBody] RegistrarRequest request) =>
        {
            var registrar = await context.Registrars.FindAsync(id);

            if (registrar == null)
                return Results.NotFound();

            // Проверяем уникальность имени
            if (await context.Registrars.AnyAsync(r => r.Id != id && r.Name == request.Name))
                return Results.BadRequest($"Registrar with name '{request.Name}' already exists");

            registrar.Name = request.Name;
            await context.SaveChangesAsync();

            return Results.Ok(MapToResponse(registrar));
        }).RequirePermissions(Permission.Update);

        // group.MapDelete("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        // {
        //     var registrar = await context.Registrars.FindAsync(id);
        //
        //     if (registrar == null)
        //         return Results.NotFound();
        //
        //     // Проверяем, есть ли связанные вагоны
        //     var hasRelatedWagons = await context.RailwayCisterns
        //         .AnyAsync(r => r.RegistrarId == id);
        //
        //     if (hasRelatedWagons)
        //         return Results.BadRequest("Cannot delete registrar with related wagons");
        //
        //     context.Registrars.Remove(registrar);
        //     await context.SaveChangesAsync();
        //
        //     return Results.NoContent();
        // }).RequirePermissions(Permission.Delete);
    }

    private static RegistrarResponse MapToResponse(Registrar registrar)
    {
        if (registrar == null) return null!;
        
        return new RegistrarResponse
        {
            Id = registrar.Id,
            Name = registrar.Name
        };
    }

    private static RegistrarDetailResponse MapToDetailResponse(Registrar registrar)
    {
        if (registrar == null) return null!;
        
        return new RegistrarDetailResponse
        {
            Id = registrar.Id,
            Name = registrar.Name,
            RailwayCisterns = registrar.RailwayCisterns?
                .Select(w => new RailwayCisternSummaryResponse
                {
                    Id = w.Id,
                    Number = w.Number
                })
                .ToList()
        };
    }
}
