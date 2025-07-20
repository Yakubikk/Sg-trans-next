using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class AbsorberDeviceAccountingEndpoints
{
    public static void MapAbsorberDeviceAccountingEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/absorber-device-accountings")
            .RequireAuthorization()
            .WithTags("справочник_поглащаппарат_учет");

        group.MapGet("/", async ([FromServices] AbsorberDeviceAccountingService service) =>
            Results.Ok(await service.GetAllAccountingsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id) =>
        {
            var accounting = await service.GetAccountingByIdAsync(id);
            return accounting is null ? Results.NotFound() : Results.Ok(accounting);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] AbsorberDeviceAccountingService service, [FromBody] AbsorberDeviceAccounting accounting) =>
        {
            var created = await service.CreateAccountingAsync(accounting);
            return Results.Created($"/api/absorber-device-accountings/{created.Id}", created);
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id, [FromBody] AbsorberDeviceAccounting accounting) =>
        {
            if (id != accounting.Id)
                return Results.BadRequest();
            
            await service.UpdateAccountingAsync(accounting);
            return Results.NoContent();
        }).RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] AbsorberDeviceAccountingService service, [FromRoute] Guid id) =>
        {
            await service.DeleteAccountingAsync(id);
            return Results.NoContent();
        }).RequirePermissions(Permission.Delete);
    }
}
