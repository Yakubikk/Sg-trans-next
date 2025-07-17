using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class ReferenceStationEndpoints
{
    public static void MapReferenceStationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reference-stations")
            .WithTags("спрстанции");

        group.MapGet("/", async ([FromServices] ReferenceStationService service) =>
            Results.Ok(await service.GetAllReferenceStationsAsync()));

        group.MapGet("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id) =>
        {
            var referenceStation = await service.GetReferenceStationByIdAsync(id);
            return referenceStation is null ? Results.NotFound() : Results.Ok(referenceStation);
        });

        group.MapPost("/", async ([FromServices] ReferenceStationService service, [FromBody] ReferenceStation referenceStation) =>
        {
            var created = await service.CreateReferenceStationAsync(referenceStation);
            return Results.Created($"/api/reference-stations/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id, [FromBody] ReferenceStation referenceStation) =>
        {
            if (id != referenceStation.Id)
                return Results.BadRequest();
            
            await service.UpdateReferenceStationAsync(referenceStation);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] ReferenceStationService service, [FromRoute] Guid id) =>
        {
            await service.DeleteReferenceStationAsync(id);
            return Results.NoContent();
        });
    }
}
