using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class AbsorberDeviceAccountingEndpoints
{
    public static void MapAbsorberDeviceAccountingEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-device-accountings")
            .WithTags("справочник_поглащаппарат_учет");

        group.MapGet("/", async ([FromServices] AbsorberDeviceAccountingService service) =>
            Results.Ok(await service.GetAllAccountingsAsync()));

        group.MapGet("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id) =>
        {
            var accounting = await service.GetAccountingByIdAsync(id);
            return accounting is null ? Results.NotFound() : Results.Ok(accounting);
        });

        group.MapPost("/", async ([FromServices] AbsorberDeviceAccountingService service, [FromBody] AbsorberDeviceAccounting accounting) =>
        {
            var created = await service.CreateAccountingAsync(accounting);
            return Results.Created($"/api/absorber-device-accountings/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id, [FromBody] AbsorberDeviceAccounting accounting) =>
        {
            if (id != accounting.Id)
                return Results.BadRequest();
            
            await service.UpdateAccountingAsync(accounting);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAccountingAsync(id);
            return Results.NoContent();
        });
    }
}
