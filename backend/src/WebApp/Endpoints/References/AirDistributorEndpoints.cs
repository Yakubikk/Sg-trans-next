using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class AirDistributorEndpoints
{
    public static void MapAirDistributorEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/air-distributors")
            .WithTags("справочник_воздухораспределители");

        group.MapGet("/", async ([FromServices] AirDistributorService service) =>
            Results.Ok(await service.GetAllAirDistributorsAsync()));

        group.MapGet("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id) =>
        {
            var airDistributor = await service.GetAirDistributorByIdAsync(id);
            return airDistributor is null ? Results.NotFound() : Results.Ok(airDistributor);
        });

        group.MapPost("/", async ([FromServices] AirDistributorService service, [FromBody] AirDistributor airDistributor) =>
        {
            var created = await service.CreateAirDistributorAsync(airDistributor);
            return Results.Created($"/api/air-distributors/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id, [FromBody] AirDistributor airDistributor) =>
        {
            if (id != airDistributor.Id)
                return Results.BadRequest();
            
            await service.UpdateAirDistributorAsync(airDistributor);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAirDistributorAsync(id);
            return Results.NoContent();
        });
    }
}
