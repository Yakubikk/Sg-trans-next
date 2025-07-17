using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class WagonEndpoints
{
    public static void MapWagonEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/wagons")
            .WithTags("справочник_вагоны");

        group.MapGet("/", async ([FromServices] WagonService service) =>
            Results.Ok(await service.GetAllWagonsAsync()));

        group.MapGet("/{id}", async ([FromServices] WagonService service, [FromRoute] Guid id) =>
        {
            var wagon = await service.GetWagonByIdAsync(id);
            return wagon is null ? Results.NotFound() : Results.Ok(wagon);
        });

        group.MapPost("/", async ([FromServices] WagonService service, [FromBody] Wagon wagon) =>
        {
            var created = await service.CreateWagonAsync(wagon);
            return Results.Created($"/api/wagons/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] WagonService service, [FromRoute] Guid id, [FromBody] Wagon wagon) =>
        {
            if (id != wagon.Id)
                return Results.BadRequest();
            
            await service.UpdateWagonAsync(wagon);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] WagonService service, [FromRoute] Guid id) =>
        {
            await service.DeleteWagonAsync(id);
            return Results.NoContent();
        });
    }
}
