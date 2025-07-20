using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ModelVCEndpoints
{
    public static void MapModelVCEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/model-vcs")
            .RequireAuthorization()
            .WithTags("справочник_модельвц");

        group.MapGet("/", async ([FromServices] ModelVCService service) =>
            Results.Ok(await service.GetAllModelVCsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id) =>
        {
            var modelVC = await service.GetModelVCByIdAsync(id);
            return modelVC is null ? Results.NotFound() : Results.Ok(modelVC);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ModelVCService service, [FromBody] ModelVC modelVC) =>
        {
            var created = await service.CreateModelVCAsync(modelVC);
            return Results.Created($"/api/model-vcs/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id, [FromBody] ModelVC modelVC) =>
        {
            if (id != modelVC.Id)
                return Results.BadRequest();
            
            await service.UpdateModelVCAsync(modelVC);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id) =>
        {
            await service.DeleteModelVCAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
