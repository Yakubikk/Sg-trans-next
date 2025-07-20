using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ModernizationEndpoints
{
    public static void MapModernizationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/modernizations")
            .RequireAuthorization()
            .WithTags("спрмодернизация");

        group.MapGet("/", async ([FromServices] ModernizationService service) =>
            Results.Ok(await service.GetAllModernizationsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ModernizationService service, [FromRoute] Guid id) =>
        {
            var modernization = await service.GetModernizationByIdAsync(id);
            return modernization is null ? Results.NotFound() : Results.Ok(modernization);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ModernizationService service, [FromBody] Modernization modernization) =>
        {
            var created = await service.CreateModernizationAsync(modernization);
            return Results.Created($"/api/modernizations/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ModernizationService service, [FromRoute] Guid id, [FromBody] Modernization modernization) =>
        {
            if (id != modernization.Id)
                return Results.BadRequest();
            
            await service.UpdateModernizationAsync(modernization);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ModernizationService service, [FromRoute] Guid id) =>
        {
            await service.DeleteModernizationAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
