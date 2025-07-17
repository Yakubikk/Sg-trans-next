using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class CargoEndpoints
{
    public static void MapCargoEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cargos")
            .WithTags("справочник_груз");

        group.MapGet("/", async ([FromServices] CargoService service) =>
            Results.Ok(await service.GetAllCargosAsync()));

        group.MapGet("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id) =>
        {
            var cargo = await service.GetCargoByIdAsync(id);
            return cargo is null ? Results.NotFound() : Results.Ok(cargo);
        });

        group.MapPost("/", async ([FromServices] CargoService service, [FromBody] Cargo cargo) =>
        {
            var created = await service.CreateCargoAsync(cargo);
            return Results.Created($"/api/cargos/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id, [FromBody] Cargo cargo) =>
        {
            if (id != cargo.Id)
                return Results.BadRequest();
            
            await service.UpdateCargoAsync(cargo);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] CargoService service, [FromRoute] Guid id) =>
        {
            await service.DeleteCargoAsync(id);
            return Results.NoContent();
        });
    }
}
