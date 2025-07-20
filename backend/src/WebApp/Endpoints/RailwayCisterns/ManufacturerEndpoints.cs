using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.Extensions;

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
            var manufacturers = await context.Manufacturers.ToListAsync();
            return Results.Ok(manufacturers.Select(m => new ManufacturerResponse
            {
                Id = m.Id,
                Name = m.Name,
                Country = m.GetCountryInfo(),
                CreatedAt = m.CreatedAt,
                UpdatedAt = m.UpdatedAt,
                CreatorId = m.CreatorId
            }).ToList());
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var manufacturer = await context.Manufacturers
                .Include(m => m.RailwayCisterns)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (manufacturer == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(new ManufacturerDetailResponse
            {
                Id = manufacturer.Id,
                Name = manufacturer.Name,
                Country = manufacturer.GetCountryInfo(),
                CreatedAt = manufacturer.CreatedAt,
                UpdatedAt = manufacturer.UpdatedAt,
                CreatorId = manufacturer.CreatorId,
                Wagons = manufacturer.RailwayCisterns
                    .Select(w => new RailwayCisternSummaryResponse
                    {
                        Id = w.Id,
                        Number = w.Number
                    }).ToList()
            });
        }).RequirePermissions(Permission.Read);

        // group.MapPost("/", async ([FromServices] ApplicationDbContext context, [FromBody] ManufacturerCreateRequest request) =>
        // {
        //     var manufacturer = new Manufacturer
        //     {
        //         Name = request.Name,
        //         Country = request.Country,
        //         CreatedAt = DateTime.UtcNow,
        //         UpdatedAt = DateTime.UtcNow,
        //         CreatorId = request.CreatorId
        //     };
        //
        //     context.Manufacturers.Add(manufacturer);
        //     await context.SaveChangesAsync();
        //
        //     return Results.Created($"/api/manufacturers/{manufacturer.Id}", new ManufacturerResponse
        //     {
        //         Id = manufacturer.Id,
        //         Name = manufacturer.Name,
        //         Country = manufacturer.GetCountryInfo(),
        //         CreatedAt = manufacturer.CreatedAt,
        //         UpdatedAt = manufacturer.UpdatedAt,
        //         CreatorId = manufacturer.CreatorId
        //     });
        // }).RequirePermissions(Permission.Create);

    //     group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id, [FromBody] ManufacturerUpdateRequest request) =>
    //     {
    //         var manufacturer = await context.Manufacturers.FindAsync(id);
    //         if (manufacturer == null)
    //         {
    //             return Results.NotFound();
    //         }
    //
    //         manufacturer.Name = request.Name;
    //         manufacturer.Country = request.Country;
    //         manufacturer.UpdatedAt = DateTime.UtcNow;
    //
    //         await context.SaveChangesAsync();
    //
    //         return Results.Ok(new ManufacturerResponse
    //         {
    //             Id = manufacturer.Id,
    //             Name = manufacturer.Name,
    //             Country = manufacturer.GetCountryInfo(),
    //             CreatedAt = manufacturer.CreatedAt,
    //             UpdatedAt = manufacturer.UpdatedAt,
    //             CreatorId = manufacturer.CreatorId
    //         });
    //     }).RequirePermissions(Permission.Update);
    //
    //     group.MapDelete("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
    //     {
    //         var manufacturer = await context.Manufacturers.FindAsync(id);
    //         if (manufacturer == null)
    //         {
    //             return Results.NotFound();
    //         }
    //
    //         context.Manufacturers.Remove(manufacturer);
    //         await context.SaveChangesAsync();
    //         return Results.NoContent();
    //     }).RequirePermissions(Permission.Delete);
    }
}
