using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class PartEndpoints
{
    public static void MapPartEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/parts")
            .WithTags("справочник_детали");

        group.MapGet("/", async ([FromServices] PartService service) =>
            Results.Ok(await service.GetAllPartsAsync()));

        group.MapGet("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id) =>
        {
            var part = await service.GetPartByIdAsync(id);
            return part is null ? Results.NotFound() : Results.Ok(part);
        });

        group.MapPost("/", async ([FromServices] PartService service, [FromBody] Part part) =>
        {
            var created = await service.CreatePartAsync(part);
            return Results.Created($"/api/parts/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id, [FromBody] Part part) =>
        {
            if (id != part.Id)
                return Results.BadRequest();
            
            await service.UpdatePartAsync(part);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id) =>
        {
            await service.DeletePartAsync(id);
            return Results.NoContent();
        });
    }
}
