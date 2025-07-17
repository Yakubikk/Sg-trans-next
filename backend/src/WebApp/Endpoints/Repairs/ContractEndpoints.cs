using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class ContractEndpoints
{
    public static void MapContractEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contracts")
            .WithTags("справочник_договоры");

        group.MapGet("/", async ([FromServices] ContractService service) =>
            Results.Ok(await service.GetAllContractsAsync()));

        group.MapGet("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id) =>
        {
            var contract = await service.GetContractByIdAsync(id);
            return contract is null ? Results.NotFound() : Results.Ok(contract);
        });

        group.MapPost("/", async ([FromServices] ContractService service, [FromBody] Contract contract) =>
        {
            var created = await service.CreateContractAsync(contract);
            return Results.Created($"/api/contracts/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id, [FromBody] Contract contract) =>
        {
            if (id != contract.Id)
                return Results.BadRequest();
            
            await service.UpdateContractAsync(contract);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id) =>
        {
            await service.DeleteContractAsync(id);
            return Results.NoContent();
        });
    }
}
