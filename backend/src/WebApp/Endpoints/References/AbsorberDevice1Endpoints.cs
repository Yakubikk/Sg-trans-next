using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class AbsorberDevice1Endpoints
{
    public static void MapAbsorberDevice1Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-device1s")
            .RequireAuthorization()
            .WithTags("справочник_поглащаппарат1");

        group.MapGet("/", async ([FromServices] AbsorberDevice1Service service) =>
            Results.Ok(await service.GetAllAbsorberDevices1Async()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id) =>
        {
            var absorberDevice1 = await service.GetAbsorberDevice1ByIdAsync(id);
            return absorberDevice1 is null ? Results.NotFound() : Results.Ok(absorberDevice1);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] AbsorberDevice1Service service, [FromBody] AbsorberDevice1 absorberDevice1) =>
        {
            var created = await service.CreateAbsorberDevice1Async(absorberDevice1);
            return Results.Created($"/api/absorber-device1s/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id, [FromBody] AbsorberDevice1 absorberDevice1) =>
        {
            if (id != absorberDevice1.Id)
                return Results.BadRequest();
            
            await service.UpdateAbsorberDevice1Async(absorberDevice1);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] AbsorberDevice1Service service, [FromRoute] Guid id) =>
        {
            await service.DeleteAbsorberDevice1Async(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
