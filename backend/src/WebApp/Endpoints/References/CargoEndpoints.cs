using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class CargoEndpoints
{
    public static void MapCargoEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cargos")
            .RequireAuthorization()
            .WithTags("справочник_груз");

        group.MapGet("/", async ([FromServices] CargoService service) =>
            Results.Ok(await service.GetAllCargosAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id) =>
        {
            var cargo = await service.GetCargoByIdAsync(id);
            return cargo is null ? Results.NotFound() : Results.Ok(cargo);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] CargoService service, [FromBody] Cargo cargo) =>
        {
            var created = await service.CreateCargoAsync(cargo);
            return Results.Created($"/api/cargos/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id, [FromBody] Cargo cargo) =>
        {
            if (id != cargo.Id)
                return Results.BadRequest();
            
            await service.UpdateCargoAsync(cargo);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id) =>
        {
            await service.DeleteCargoAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
