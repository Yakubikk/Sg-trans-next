using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class PartEndpoints
{
    public static void MapPartEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/parts")
            .RequireAuthorization()
            .WithTags("справочник_детали");

        group.MapGet("/", async ([FromServices] PartService service) =>
            Results.Ok(await service.GetAllPartsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id) =>
        {
            var part = await service.GetPartByIdAsync(id);
            return part is null ? Results.NotFound() : Results.Ok(part);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] PartService service, [FromBody] PartReference part) =>
        {
            var created = await service.CreatePartAsync(part);
            return Results.Created($"/api/parts/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id, [FromBody] PartReference part) =>
        {
            if (id != part.Id)
                return Results.BadRequest();
            
            await service.UpdatePartAsync(part);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] PartService service, [FromRoute] Guid id) =>
        {
            await service.DeletePartAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
