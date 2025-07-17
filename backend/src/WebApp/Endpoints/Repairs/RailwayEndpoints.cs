using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class RailwayEndpoints
{
    public static void MapRailwayEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/railways")
            .WithTags("спрдороги");

        group.MapGet("/", async ([FromServices] RailwayService service) =>
            Results.Ok(await service.GetAllRailwaysAsync()));

        group.MapGet("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id) =>
        {
            var railway = await service.GetRailwayByIdAsync(id);
            return railway is null ? Results.NotFound() : Results.Ok(railway);
        });

        group.MapPost("/", async ([FromServices] RailwayService service, [FromBody] Railway railway) =>
        {
            var created = await service.CreateRailwayAsync(railway);
            return Results.Created($"/api/railways/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id, [FromBody] Railway railway) =>
        {
            if (id != railway.Id)
                return Results.BadRequest();
            
            await service.UpdateRailwayAsync(railway);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] RailwayService service, [FromRoute] Guid id) =>
        {
            await service.DeleteRailwayAsync(id);
            return Results.NoContent();
        });
    }
}
