using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class BrakeEndpoints
{
    public static void MapBrakeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/brakes")
            .WithTags("справочник_тормоз");

        group.MapGet("/", async ([FromServices] BrakeService service) =>
            Results.Ok(await service.GetAllBrakesAsync()));

        group.MapGet("/{id}", async ([FromServices] BrakeService service, [FromRoute] Guid id) =>
        {
            var brake = await service.GetBrakeByIdAsync(id);
            return brake is null ? Results.NotFound() : Results.Ok(brake);
        });

        group.MapPost("/", async ([FromServices] BrakeService service, [FromBody] Brake brake) =>
        {
            var created = await service.CreateBrakeAsync(brake);
            return Results.Created($"/api/brakes/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] BrakeService service, [FromRoute] Guid id, [FromBody] Brake brake) =>
        {
            if (id != brake.Id)
                return Results.BadRequest();
            
            await service.UpdateBrakeAsync(brake);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] BrakeService service, [FromRoute] Guid id) =>
        {
            await service.DeleteBrakeAsync(id);
            return Results.NoContent();
        });
    }
}
