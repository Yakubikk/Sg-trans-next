using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.DTO.Common;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class WagonTypeEndpoints
{
    public static void MapWagonTypeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/wagon-types")
            .RequireAuthorization()
            .WithTags("wagon_types");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var types = await context.WagonTypes
                .AsNoTracking()
                .ToListAsync();
            
            return Results.Ok(types.Select(MapToResponse));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var type = await context.WagonTypes
                .Include(t => t.RailwayCisterns)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);

            if (type == null)
                return Results.NotFound();

            return Results.Ok(MapToDetailResponse(type));
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context, 
            [FromBody] WagonTypeRequest request) =>
        {
            // Проверяем уникальность имени
            var existingType = await context.WagonTypes
                .FirstOrDefaultAsync(t => t.Name == request.Name);
                
            if (existingType != null)
                return Results.BadRequest($"WagonType with name '{request.Name}' already exists");

            var type = new WagonType
            {
                Name = request.Name
            };

            context.WagonTypes.Add(type);
            await context.SaveChangesAsync();

            return Results.Created($"/api/wagon-types/{type.Id}", MapToResponse(type));
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context,
            [FromRoute] Guid id, [FromBody] WagonTypeRequest request) =>
        {
            var type = await context.WagonTypes.FindAsync(id);

            if (type == null)
                return Results.NotFound();

            // Проверяем уникальность имени
            if (await context.WagonTypes.AnyAsync(t => t.Id != id && t.Name == request.Name))
                return Results.BadRequest($"WagonType with name '{request.Name}' already exists");

            type.Name = request.Name;
            await context.SaveChangesAsync();

            return Results.Ok(MapToResponse(type));
        }).RequirePermissions(Permission.Update);
    }

    private static WagonTypeResponse MapToResponse(WagonType type)
    {
        if (type == null) return null!;
        
        return new WagonTypeResponse
        {
            Id = type.Id,
            Name = type.Name
        };
    }

    private static WagonTypeDetailResponse MapToDetailResponse(WagonType type)
    {
        if (type == null) return null!;
        
        return new WagonTypeDetailResponse
        {
            Id = type.Id,
            Name = type.Name,
            RailwayCisterns = type.RailwayCisterns?
                .Select(w => new RailwayCisternSummaryResponse
                {
                    Id = w.Id,
                    Number = w.Number
                })
                .ToList()
        };
    }
}
