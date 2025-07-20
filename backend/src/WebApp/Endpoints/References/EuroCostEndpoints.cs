using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class EuroCostEndpoints
{
    public static void MapEuroCostEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/euro-costs")
            .WithTags("справочник_стоимостьевро")
            .RequireAuthorization();

        group.MapGet("/", async ([FromServices] EuroCostService service) =>
            Results.Ok(await service.GetAllEuroCostsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] EuroCostService service, [FromRoute] Guid id) =>
        {
            var euroCost = await service.GetEuroCostByIdAsync(id);
            return euroCost is null ? Results.NotFound() : Results.Ok(euroCost);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] EuroCostService service, [FromBody] EuroCost euroCost) =>
        {
            var created = await service.CreateEuroCostAsync(euroCost);
            return Results.Created($"/api/euro-costs/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] EuroCostService service, [FromRoute] Guid id, [FromBody] EuroCost euroCost) =>
        {
            if (id != euroCost.Id)
                return Results.BadRequest();
            
            await service.UpdateEuroCostAsync(euroCost);
            return Results.NoContent();
        }).RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] EuroCostService service, [FromRoute] Guid id) =>
        {
            await service.DeleteEuroCostAsync(id);
            return Results.NoContent();
        }).RequirePermissions(Permission.Delete);
    }
}
