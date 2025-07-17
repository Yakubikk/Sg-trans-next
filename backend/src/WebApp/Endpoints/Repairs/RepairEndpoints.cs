using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class RepairEndpoints
{
    public static void MapRepairEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/repairs")
            .WithTags("спрремонты");

        group.MapGet("/", async ([FromServices] RepairService service) =>
            Results.Ok(await service.GetAllRepairsAsync()));

        group.MapGet("/{id}", async ([FromServices] RepairService service, [FromRoute] Guid id) =>
        {
            var repair = await service.GetRepairByIdAsync(id);
            return repair is null ? Results.NotFound() : Results.Ok(repair);
        });

        group.MapPost("/", async ([FromServices] RepairService service, [FromBody] Repair repair) =>
        {
            var created = await service.CreateRepairAsync(repair);
            return Results.Created($"/api/repairs/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] RepairService service, [FromRoute] Guid id, [FromBody] Repair repair) =>
        {
            if (id != repair.Id)
                return Results.BadRequest();
            
            await service.UpdateRepairAsync(repair);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] RepairService service, [FromRoute] Guid id) =>
        {
            await service.DeleteRepairAsync(id);
            return Results.NoContent();
        });
    }
}
