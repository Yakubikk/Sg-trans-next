using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ReferenceStationEndpoints
{
    public static void MapReferenceStationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reference-stations")
            .RequireAuthorization()
            .WithTags("спрстанции");

        group.MapGet("/", async ([FromServices] ReferenceStationService service) =>
            Results.Ok(await service.GetAllReferenceStationsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id) =>
        {
            var referenceStation = await service.GetReferenceStationByIdAsync(id);
            return referenceStation is null ? Results.NotFound() : Results.Ok(referenceStation);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ReferenceStationService service, [FromBody] ReferenceStation referenceStation) =>
        {
            var created = await service.CreateReferenceStationAsync(referenceStation);
            return Results.Created($"/api/reference-stations/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id, [FromBody] ReferenceStation referenceStation) =>
        {
            if (id != referenceStation.Id)
                return Results.BadRequest();
            
            await service.UpdateReferenceStationAsync(referenceStation);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id) =>
        {
            await service.DeleteReferenceStationAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
