using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class AbsorberDeviceEndpoints
{
    public static void MapAbsorberDeviceEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-devices")
            .RequireAuthorization()
            .WithTags("справочник_поглащаппарат");

        group.MapGet("/", async ([FromServices] AbsorberDeviceService service) =>
            Results.Ok(await service.GetAllAbsorberDevicesAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id) =>
        {
            var absorberDevice = await service.GetAbsorberDeviceByIdAsync(id);
            return absorberDevice is null ? Results.NotFound() : Results.Ok(absorberDevice);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] AbsorberDeviceService service, [FromBody] AbsorberDevice absorberDevice) =>
        {
            var created = await service.CreateAbsorberDeviceAsync(absorberDevice);
            return Results.Created($"/api/absorber-devices/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id, [FromBody] AbsorberDevice absorberDevice) =>
        {
            if (id != absorberDevice.Id)
                return Results.BadRequest();
            
            await service.UpdateAbsorberDeviceAsync(absorberDevice);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAbsorberDeviceAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
