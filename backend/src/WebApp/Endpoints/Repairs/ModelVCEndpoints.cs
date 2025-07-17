using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class ModelVCEndpoints
{
    public static void MapModelVCEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/model-vcs")
            .WithTags("справочник_модельвц");

        group.MapGet("/", async ([FromServices] ModelVCService service) =>
            Results.Ok(await service.GetAllModelVCsAsync()));

        group.MapGet("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id) =>
        {
            var modelVC = await service.GetModelVCByIdAsync(id);
            return modelVC is null ? Results.NotFound() : Results.Ok(modelVC);
        });

        group.MapPost("/", async ([FromServices] ModelVCService service, [FromBody] ModelVC modelVC) =>
        {
            var created = await service.CreateModelVCAsync(modelVC);
            return Results.Created($"/api/model-vcs/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id, [FromBody] ModelVC modelVC) =>
        {
            if (id != modelVC.Id)
                return Results.BadRequest();
            
            await service.UpdateModelVCAsync(modelVC);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] ModelVCService service, [FromRoute] Guid id) =>
        {
            await service.DeleteModelVCAsync(id);
            return Results.NoContent();
        });
    }
}
