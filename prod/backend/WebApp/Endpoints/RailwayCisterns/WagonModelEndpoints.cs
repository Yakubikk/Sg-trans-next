using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class WagonModelEndpoints
{
    public static void MapWagonModelEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/wagon-models")
            .RequireAuthorization()
            .WithTags("wagon-models");

        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var models = await context.Set<WagonModel>()
                .Select(m => new WagonModelDTO
                {
                    Id = m.Id,
                    Name = m.Name
                })
                .ToListAsync();
            return Results.Ok(models);
        })
        .WithName("GetWagonModels")
        .Produces<List<WagonModelDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var model = await context.Set<WagonModel>()
                .Where(m => m.Id == id)
                .Select(m => new WagonModelDTO
                {
                    Id = m.Id,
                    Name = m.Name
                })
                .FirstOrDefaultAsync();
            return model is null ? Results.NotFound() : Results.Ok(model);
        })
        .WithName("GetWagonModelById")
        .Produces<WagonModelDTO>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ApplicationDbContext context, [FromBody] CreateWagonModelDTO dto) =>
        {
            var model = new WagonModel
            {
                Name = dto.Name
            };

            context.Add(model);
            await context.SaveChangesAsync();

            return Results.Created($"/api/wagon-models/{model.Id}", new WagonModelDTO
            {
                Id = model.Id,
                Name = model.Name
            });
        })
        .WithName("CreateWagonModel")
        .Produces<WagonModelDTO>(StatusCodes.Status201Created)
        .ProducesValidationProblem()
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id, [FromBody] UpdateWagonModelDTO dto) =>
        {
            var model = await context.Set<WagonModel>().FindAsync(id);
            if (model == null)
                return Results.NotFound();

            model.Name = dto.Name;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("UpdateWagonModel")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound)
        .ProducesValidationProblem()
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ApplicationDbContext context, [FromRoute] Guid id) =>
        {
            var model = await context.Set<WagonModel>().FindAsync(id);
            if (model == null)
                return Results.NotFound();

            context.Remove(model);
            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("DeleteWagonModel")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound)
        .RequirePermissions(Permission.Delete);
    }
}
