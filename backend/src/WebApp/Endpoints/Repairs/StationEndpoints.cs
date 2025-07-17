using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class StationEndpoints
{
    public static void MapStationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stations")
            .WithTags("справочник_станции");

        group.MapGet("/", async ([FromServices] StationService service) =>
            Results.Ok(await service.GetAllStationsAsync()));

        group.MapGet("/{id}", async ([FromServices] StationService service, [FromRoute] Guid id) =>
        {
            var station = await service.GetStationByIdAsync(id);
            return station is null ? Results.NotFound() : Results.Ok(station);
        });

        group.MapPost("/", async ([FromServices] StationService service, [FromBody] Station station) =>
        {
            var created = await service.CreateStationAsync(station);
            return Results.Created($"/api/stations/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] StationService service, [FromRoute] Guid id, [FromBody] Station station) =>
        {
            if (id != station.Id)
                return Results.BadRequest();
            
            await service.UpdateStationAsync(station);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] StationService service, [FromRoute] Guid id) =>
        {
            await service.DeleteStationAsync(id);
            return Results.NoContent();
        });
    }
}
