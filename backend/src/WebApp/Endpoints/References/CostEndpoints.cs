using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class CostEndpoints
{
    public static void MapCostEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/costs")
            .RequireAuthorization()
            .WithTags("справочник_стоимость");

        group.MapGet("/", async ([FromServices] CostService service) =>
            Results.Ok(await service.GetAllCostsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] CostService service, [FromRoute] Guid id) =>
        {
            var cost = await service.GetCostByIdAsync(id);
            return cost is null ? Results.NotFound() : Results.Ok(cost);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] CostService service, [FromBody] Cost cost) =>
        {
            var created = await service.CreateCostAsync(cost);
            return Results.Created($"/api/costs/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] CostService service, [FromRoute] Guid id, [FromBody] Cost cost) =>
        {
            if (id != cost.Id)
                return Results.BadRequest();
            
            await service.UpdateCostAsync(cost);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] CostService service, [FromRoute] Guid id) =>
        {
            await service.DeleteCostAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
