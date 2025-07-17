using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class DefectEndpoints
{
    public static void MapDefectEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/defects")
            .WithTags("спрнеисправности");

        group.MapGet("/", async ([FromServices] DefectService service) =>
            Results.Ok(await service.GetAllDefectsAsync()));

        group.MapGet("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id) =>
        {
            var defect = await service.GetDefectByIdAsync(id);
            return defect is null ? Results.NotFound() : Results.Ok(defect);
        });

        group.MapPost("/", async ([FromServices] DefectService service, [FromBody] Defect defect) =>
        {
            var created = await service.CreateDefectAsync(defect);
            return Results.Created($"/api/defects/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id, [FromBody] Defect defect) =>
        {
            if (id != defect.Id)
                return Results.BadRequest();
            
            await service.UpdateDefectAsync(defect);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id) =>
        {
            await service.DeleteDefectAsync(id);
            return Results.NoContent();
        });
    }
}
