using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class GasContractEndpoints
{
    public static void MapGasContractEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/gas-contracts")
            .WithTags("справочник_договоры_газ");

        group.MapGet("/", async ([FromServices] GasContractService service) =>
            Results.Ok(await service.GetAllGasContractsAsync()));

        group.MapGet("/{id}", async ([FromServices] GasContractService service, [FromRoute] Guid id) =>
        {
            var gasContract = await service.GetGasContractByIdAsync(id);
            return gasContract is null ? Results.NotFound() : Results.Ok(gasContract);
        });

        group.MapPost("/", async ([FromServices] GasContractService service, [FromBody] GasContract gasContract) =>
        {
            var created = await service.CreateGasContractAsync(gasContract);
            return Results.Created($"/api/gas-contracts/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] GasContractService service, [FromRoute] Guid id, [FromBody] GasContract gasContract) =>
        {
            if (id != gasContract.Id)
                return Results.BadRequest();
            
            await service.UpdateGasContractAsync(gasContract);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] GasContractService service, [FromRoute] Guid id) =>
        {
            await service.DeleteGasContractAsync(id);
            return Results.NoContent();
        });
    }
}
