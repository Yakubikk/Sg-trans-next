using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class AbsorberDevice1Endpoints
{
    public static void MapAbsorberDevice1Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-device1s")
            .WithTags("справочник_поглащаппарат1");

        group.MapGet("/", async ([FromServices] AbsorberDevice1Service service) =>
            Results.Ok(await service.GetAllAbsorberDevices1Async()));

        group.MapGet("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id) =>
        {
            var absorberDevice1 = await service.GetAbsorberDevice1ByIdAsync(id);
            return absorberDevice1 is null ? Results.NotFound() : Results.Ok(absorberDevice1);
        });

        group.MapPost("/", async ([FromServices] AbsorberDevice1Service service, [FromBody] AbsorberDevice1 absorberDevice1) =>
        {
            var created = await service.CreateAbsorberDevice1Async(absorberDevice1);
            return Results.Created($"/api/absorber-device1s/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id, [FromBody] AbsorberDevice1 absorberDevice1) =>
        {
            if (id != absorberDevice1.Id)
                return Results.BadRequest();
            
            await service.UpdateAbsorberDevice1Async(absorberDevice1);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id) =>
        {
            await service.DeleteAbsorberDevice1Async(id);
            return Results.NoContent();
        });
    }
}
