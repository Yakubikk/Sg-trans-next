using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class RailwayEndpoints
{
    public static void MapRailwayEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/railways")
            .RequireAuthorization()
            .WithTags("спрдороги");

        group.MapGet("/", async ([FromServices] RailwayService service) =>
            Results.Ok(await service.GetAllRailwaysAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id) =>
        {
            var railway = await service.GetRailwayByIdAsync(id);
            return railway is null ? Results.NotFound() : Results.Ok(railway);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] RailwayService service, [FromBody] Railway railway) =>
        {
            var created = await service.CreateRailwayAsync(railway);
            return Results.Created($"/api/railways/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id, [FromBody] Railway railway) =>
        {
            if (id != railway.Id)
                return Results.BadRequest();
            
            await service.UpdateRailwayAsync(railway);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id) =>
        {
            await service.DeleteRailwayAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
