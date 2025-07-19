using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class StampEndpoints
{
    public static void MapStampEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stamps")
            .WithTags("справочник_клеймо");

        group.MapGet("/", async ([FromServices] StampService service) =>
            Results.Ok(await service.GetAllStampsAsync()));

        group.MapGet("/{id}", async ([FromServices] StampService service, [FromRoute] Guid id) =>
        {
            var stamp = await service.GetStampByIdAsync(id);
            return stamp is null ? Results.NotFound() : Results.Ok(stamp);
        });

        group.MapPost("/", async ([FromServices] StampService service, [FromBody] Stamp stamp) =>
        {
            var created = await service.CreateStampAsync(stamp);
            return Results.Created($"/api/stamps/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] StampService service, [FromRoute] Guid id, [FromBody] Stamp stamp) =>
        {
            if (id != stamp.Id)
                return Results.BadRequest();
            
            await service.UpdateStampAsync(stamp);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] StampService service, [FromRoute] Guid id) =>
        {
            await service.DeleteStampAsync(id);
            return Results.NoContent();
        });
    }
}
