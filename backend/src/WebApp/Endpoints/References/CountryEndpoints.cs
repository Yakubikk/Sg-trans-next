using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class CountryEndpoints
{
    public static void MapCountryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/countries")
            .RequireAuthorization()
            .WithTags("справочник_страны");

        group.MapGet("/", async ([FromServices] CountryService service) =>
            Results.Ok(await service.GetAllCountriesAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] CountryService service, [FromRoute] Guid id) =>
        {
            var country = await service.GetCountryByIdAsync(id);
            return country is null ? Results.NotFound() : Results.Ok(country);
        })
            .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] CountryService service, [FromBody] Country country) =>
        {
            var created = await service.CreateCountryAsync(country);
            return Results.Created($"/api/countries/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] CountryService service, [FromRoute] Guid id, [FromBody] Country country) =>
        {
            if (id != country.Id)
                return Results.BadRequest();
            
            await service.UpdateCountryAsync(country);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] CountryService service, [FromRoute] Guid id) =>
        {
            await service.DeleteCountryAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
