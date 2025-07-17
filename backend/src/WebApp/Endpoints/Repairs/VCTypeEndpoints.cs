using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class VcTypeEndpoints
{
    public static void MapVcTypeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/vc-types")
            .WithTags("справочник_типвц");

        group.MapGet("/", async ([FromServices] VCTypeService service) =>
            Results.Ok(await service.GetAllVCTypesAsync()));

        group.MapGet("/{id}", async ([FromServices] VCTypeService service, [FromRoute] Guid id) =>
        {
            var vcType = await service.GetVCTypeByIdAsync(id);
            return vcType is null ? Results.NotFound() : Results.Ok(vcType);
        });

        group.MapPost("/", async ([FromServices] VCTypeService service, [FromBody] VCType vcType) =>
        {
            var created = await service.CreateVCTypeAsync(vcType);
            return Results.Created($"/api/vc-types/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] VCTypeService service, [FromRoute] Guid id, [FromBody] VCType vcType) =>
        {
            if (id != vcType.Id)
                return Results.BadRequest();
            
            await service.UpdateVCTypeAsync(vcType);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] VCTypeService service, [FromRoute] Guid id) =>
        {
            await service.DeleteVCTypeAsync(id);
            return Results.NoContent();
        });
    }
}
