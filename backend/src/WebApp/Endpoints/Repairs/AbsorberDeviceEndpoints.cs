using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class AbsorberDeviceEndpoints
{
    public static void MapAbsorberDeviceEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-devices")
            .WithTags("справочник_поглащаппарат");

        group.MapGet("/", async ([FromServices] AbsorberDeviceService service) =>
            Results.Ok(await service.GetAllAbsorberDevicesAsync()));

        group.MapGet("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id) =>
        {
            var absorberDevice = await service.GetAbsorberDeviceByIdAsync(id);
            return absorberDevice is null ? Results.NotFound() : Results.Ok(absorberDevice);
        });

        group.MapPost("/", async ([FromServices] AbsorberDeviceService service, [FromBody] AbsorberDevice absorberDevice) =>
        {
            var created = await service.CreateAbsorberDeviceAsync(absorberDevice);
            return Results.Created($"/api/absorber-devices/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id, [FromBody] AbsorberDevice absorberDevice) =>
        {
            if (id != absorberDevice.Id)
                return Results.BadRequest();
            
            await service.UpdateAbsorberDeviceAsync(absorberDevice);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] AbsorberDeviceService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAbsorberDeviceAsync(id);
            return Results.NoContent();
        });
    }
}
