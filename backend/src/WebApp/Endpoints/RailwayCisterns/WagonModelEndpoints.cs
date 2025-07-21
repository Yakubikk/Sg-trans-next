using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO;
using WebApp.DTO.Common;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class WagonModelEndpoints
{
    public static void MapWagonModelEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/wagon-models")
            .RequireAuthorization()
            .WithTags("wagon_models");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var models = await context.WagonModels
                .AsNoTracking()
                .ToListAsync();
            
            return Results.Ok(models.Select(MapToResponse));
        }).RequirePermissions(Permission.Read);

        group.MapGet("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var model = await context.WagonModels
                .Include(m => m.RailwayCisterns)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);

            if (model == null)
                return Results.NotFound();

            return Results.Ok(MapToDetailResponse(model));
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context,
            [FromBody] WagonModelRequest request) =>
        {
            // Проверяем уникальность имени
            var existingModel = await context.WagonModels
                .FirstOrDefaultAsync(m => m.Name == request.Name);
                
            if (existingModel != null)
                return Results.BadRequest($"WagonModel with name '{request.Name}' already exists");

            var model = new WagonModel
            {
                Name = request.Name
            };

            context.WagonModels.Add(model);
            await context.SaveChangesAsync();

            return Results.Created($"/api/wagon-models/{model.Id}", MapToResponse(model));
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id:guid}", async ([FromServices] ApplicationDbContext context,
            [FromRoute] Guid id, [FromBody] WagonModelRequest request) =>
        {
            var model = await context.WagonModels.FindAsync(id);

            if (model == null)
                return Results.NotFound();

            // Проверяем уникальность имени
            if (await context.WagonModels.AnyAsync(m => m.Id != id && m.Name == request.Name))
                return Results.BadRequest($"WagonModel with name '{request.Name}' already exists");

            model.Name = request.Name;
            await context.SaveChangesAsync();

            return Results.Ok(MapToResponse(model));
        }).RequirePermissions(Permission.Update);
        //
        // group.MapDelete("/{id:guid}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        // {
        //     var model = await context.WagonModels.FindAsync(id);
        //
        //     if (model == null)
        //         return Results.NotFound();
        //
        //     context.WagonModels.Remove(model);
        //     await context.SaveChangesAsync();
        //
        //     return Results.NoContent();
        // }).RequirePermissions(Permission.Delete);
    }

    private static WagonModelResponse MapToResponse(WagonModel model)
    {
        if (model == null) return null!;
        
        return new WagonModelResponse
        {
            Id = model.Id,
            Name = model.Name
        };
    }

    private static WagonModelDetailResponse MapToDetailResponse(WagonModel model)
    {
        if (model == null) return null!;
        
        return new WagonModelDetailResponse
        {
            Id = model.Id,
            Name = model.Name,
            RailwayCisterns = model.RailwayCisterns?
                .Select(w => new RailwayCisternSummaryResponse
                {
                    Id = w.Id,
                    Number = w.Number
                })
                .ToList()
        };
    }
}
