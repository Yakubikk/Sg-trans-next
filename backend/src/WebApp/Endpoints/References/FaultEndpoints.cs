using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class FaultEndpoints
{
    public static void MapFaultEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/faults")
            .RequireAuthorization()
            .WithTags("справочник_неисправности");

        group.MapGet("/", async ([FromServices] FaultService service) =>
            Results.Ok(await service.GetAllFaultsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] FaultService service, [FromRoute] Guid id) =>
        {
            var fault = await service.GetFaultByIdAsync(id);
            return fault is null ? Results.NotFound() : Results.Ok(fault);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] FaultService service, [FromBody] Fault fault) =>
        {
            var created = await service.CreateFaultAsync(fault);
            return Results.Created($"/api/faults/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] FaultService service, [FromRoute] Guid id, [FromBody] Fault fault) =>
        {
            if (id != fault.Id)
                return Results.BadRequest();
            
            await service.UpdateFaultAsync(fault);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] FaultService service, [FromRoute] Guid id) =>
        {
            await service.DeleteFaultAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
