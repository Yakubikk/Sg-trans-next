using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class DefectEndpoints
{
    public static void MapDefectEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/defects")
            .RequireAuthorization()
            .WithTags("спрнеисправности");

        group.MapGet("/", async ([FromServices] DefectService service) =>
            Results.Ok(await service.GetAllDefectsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id) =>
        {
            var defect = await service.GetDefectByIdAsync(id);
            return defect is null ? Results.NotFound() : Results.Ok(defect);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] DefectService service, [FromBody] Defect defect) =>
        {
            var created = await service.CreateDefectAsync(defect);
            return Results.Created($"/api/defects/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id, [FromBody] Defect defect) =>
        {
            if (id != defect.Id)
                return Results.BadRequest();
            
            await service.UpdateDefectAsync(defect);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] DefectService service, [FromRoute] Guid id) =>
        {
            await service.DeleteDefectAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
