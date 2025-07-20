using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class AirDistributorEndpoints
{
    public static void MapAirDistributorEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/air-distributors")
            .RequireAuthorization()
            .WithTags("справочник_воздухораспределители");

        group.MapGet("/", async ([FromServices] AirDistributorService service) =>
            Results.Ok(await service.GetAllAirDistributorsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id) =>
        {
            var airDistributor = await service.GetAirDistributorByIdAsync(id);
            return airDistributor is null ? Results.NotFound() : Results.Ok(airDistributor);
        }).RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] AirDistributorService service, [FromBody] AirDistributor airDistributor) =>
        {
            var created = await service.CreateAirDistributorAsync(airDistributor);
            return Results.Created($"/api/air-distributors/{created.Id}", created);
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id, [FromBody] AirDistributor airDistributor) =>
        {
            if (id != airDistributor.Id)
                return Results.BadRequest();
            
            await service.UpdateAirDistributorAsync(airDistributor);
            return Results.NoContent();
        }).RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] AirDistributorService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAirDistributorAsync(id);
            return Results.NoContent();
        }).RequirePermissions(Permission.Delete);
    }
}
