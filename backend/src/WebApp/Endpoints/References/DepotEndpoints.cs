using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class DepotEndpoints
{
    public static void MapDepotEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/depots")
            .RequireAuthorization()
            .WithTags("спрдепо");

        group.MapGet("/", async ([FromServices] DepotService service) =>
            Results.Ok(await service.GetAllDepotsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] DepotService service, [FromRoute] Guid id) =>
        {
            var depot = await service.GetDepotByIdAsync(id);
            return depot is null ? Results.NotFound() : Results.Ok(depot);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] DepotService service, [FromBody] DepotReference depot) =>
        {
            var created = await service.CreateDepotAsync(depot);
            return Results.Created($"/api/depots/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] DepotService service, [FromRoute] Guid id, [FromBody] DepotReference depot) =>
        {
            if (id != depot.Id)
                return Results.BadRequest();
            
            await service.UpdateDepotAsync(depot);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] DepotService service, [FromRoute] Guid id) =>
        {
            await service.DeleteDepotAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
