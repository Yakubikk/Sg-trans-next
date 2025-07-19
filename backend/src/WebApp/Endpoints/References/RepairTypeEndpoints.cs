using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class RepairTypeEndpoints
{
    public static void MapRepairTypeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/repair-types")
            .WithTags("справочник_видыремонта");

        group.MapGet("/", async ([FromServices] RepairTypeService service) =>
            Results.Ok(await service.GetAllRepairTypesAsync()));

        group.MapGet("/{id}", async ([FromServices] RepairTypeService service, [FromRoute] Guid id) =>
        {
            var repairType = await service.GetRepairTypeByIdAsync(id);
            return repairType is null ? Results.NotFound() : Results.Ok(repairType);
        });

        group.MapPost("/", async ([FromServices] RepairTypeService service, [FromBody] RepairType repairType) =>
        {
            var created = await service.CreateRepairTypeAsync(repairType);
            return Results.Created($"/api/repair-types/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] RepairTypeService service, [FromRoute] Guid id, [FromBody] RepairType repairType) =>
        {
            if (id != repairType.Id)
                return Results.BadRequest();
            
            await service.UpdateRepairTypeAsync(repairType);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] RepairTypeService service, [FromRoute] Guid id) =>
        {
            await service.DeleteRepairTypeAsync(id);
            return Results.NoContent();
        });
    }
}
