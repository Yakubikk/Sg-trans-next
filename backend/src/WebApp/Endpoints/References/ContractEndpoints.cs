using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ContractEndpoints
{
    public static void MapContractEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contracts")
            .RequireAuthorization()
            .WithTags("справочник_договоры");

        group.MapGet("/", async ([FromServices] ContractService service) =>
            Results.Ok(await service.GetAllContractsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id) =>
        {
            var contract = await service.GetContractByIdAsync(id);
            return contract is null ? Results.NotFound() : Results.Ok(contract);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ContractService service, [FromBody] Contract contract) =>
        {
            var created = await service.CreateContractAsync(contract);
            return Results.Created($"/api/contracts/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id, [FromBody] Contract contract) =>
        {
            if (id != contract.Id)
                return Results.BadRequest();
            
            await service.UpdateContractAsync(contract);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ContractService service, [FromRoute] Guid id) =>
        {
            await service.DeleteContractAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
