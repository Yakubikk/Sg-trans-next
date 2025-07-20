using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ReasonEndpoints
{
    public static void MapReasonEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reasons")
            .RequireAuthorization()
            .WithTags("спрпричины");

        group.MapGet("/", async ([FromServices] ReasonService service) =>
            Results.Ok(await service.GetAllReasonsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id) =>
        {
            var reason = await service.GetReasonByIdAsync(id);
            return reason is null ? Results.NotFound() : Results.Ok(reason);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ReasonService service, [FromBody] Reason reason) =>
        {
            var created = await service.CreateReasonAsync(reason);
            return Results.Created($"/api/reasons/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id, [FromBody] Reason reason) =>
        {
            if (id != reason.Id)
                return Results.BadRequest();
            
            await service.UpdateReasonAsync(reason);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id) =>
        {
            await service.DeleteReasonAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
