using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class ReasonEndpoints
{
    public static void MapReasonEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reasons")
            .WithTags("спрпричины");

        group.MapGet("/", async ([FromServices] ReasonService service) =>
            Results.Ok(await service.GetAllReasonsAsync()));

        group.MapGet("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id) =>
        {
            var reason = await service.GetReasonByIdAsync(id);
            return reason is null ? Results.NotFound() : Results.Ok(reason);
        });

        group.MapPost("/", async ([FromServices] ReasonService service, [FromBody] Reason reason) =>
        {
            var created = await service.CreateReasonAsync(reason);
            return Results.Created($"/api/reasons/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id, [FromBody] Reason reason) =>
        {
            if (id != reason.Id)
                return Results.BadRequest();
            
            await service.UpdateReasonAsync(reason);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] ReasonService service, [FromRoute] Guid id) =>
        {
            await service.DeleteReasonAsync(id);
            return Results.NoContent();
        });
    }
}
