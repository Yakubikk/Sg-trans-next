using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.DTO.Common;
using WebApp.Extensions;
using WebApp.Services;

namespace WebApp.Endpoints.RailwayCisterns;

public static class ManufacturerEndpoints
{
    public static void MapManufacturerEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/manufacturers")
            .RequireAuthorization()
            .WithTags("manufacturers");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var manufacturers = await context.Manufacturers
                .AsNoTracking()
                .ToListAsync();
                
            return Results.Ok(manufacturers.Select(MapToResponse));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var manufacturer = await context.Manufacturers
                .Include(m => m.RailwayCisterns)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);

            if (manufacturer == null)
                return Results.NotFound();

            return Results.Ok(MapToDetailResponse(manufacturer));
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context,
            [FromServices] ICurrentUserService currentUserService,
            [FromBody] ManufacturerRequest request) =>
        {
            var manufacturer = new Manufacturer
            {
                Name = request.Name,
                Country = request.Country,
                CreatorId = currentUserService.GetCurrentUserId()
            };

            context.Manufacturers.Add(manufacturer);
            await context.SaveChangesAsync();

            return Results.Created($"/api/manufacturers/{manufacturer.Id}", 
                MapToResponse(manufacturer));
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context,
            [FromServices] ICurrentUserService currentUserService,
            [FromRoute] Guid id, [FromBody] ManufacturerRequest request) =>
        {
            var manufacturer = await context.Manufacturers.FindAsync(id);

            if (manufacturer == null)
                return Results.NotFound();

            // Проверяем уникальность имени
            if (await context.Manufacturers.AnyAsync(m => m.Id != id && m.Name == request.Name))
                return Results.BadRequest($"Manufacturer with name '{request.Name}' already exists");

            manufacturer.Name = request.Name;
            manufacturer.Country = request.Country;
            await context.SaveChangesAsync();

            return Results.Ok(MapToResponse(manufacturer));
        }).RequirePermissions(Permission.Update);
    }
    
    private static ManufacturerResponse MapToResponse(Manufacturer manufacturer)
    {
        if (manufacturer == null) return null!;
        
        return new ManufacturerResponse
        {
            Id = manufacturer.Id,
            Name = manufacturer.Name,
            Country = manufacturer.GetCountryInfo(),
            CreatedAt = manufacturer.CreatedAt,
            UpdatedAt = manufacturer.UpdatedAt,
            CreatorId = manufacturer.CreatorId
        };
    }
    
    private static ManufacturerDetailResponse MapToDetailResponse(Manufacturer manufacturer)
    {
        if (manufacturer == null) return null!;
        
        var response = new ManufacturerDetailResponse
        {
            Id = manufacturer.Id,
            Name = manufacturer.Name,
            Country = manufacturer.GetCountryInfo(),
            CreatedAt = manufacturer.CreatedAt,
            UpdatedAt = manufacturer.UpdatedAt,
            CreatorId = manufacturer.CreatorId,
            Wagons = manufacturer.RailwayCisterns?
                .Select(w => new RailwayCisternSummaryResponse
                {
                    Id = w.Id,
                    Number = w.Number
                })
                .ToList()
        };
        
        return response;
    }
}
