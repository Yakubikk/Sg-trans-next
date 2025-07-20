using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class ClientEndpoints
{
    public static void MapClientEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/clients")
            .RequireAuthorization()
            .WithTags("справочник_клиенты");

        group.MapGet("/", async ([FromServices] ClientService service) =>
            Results.Ok(await service.GetAllClientsAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id) =>
        {
            var client = await service.GetClientByIdAsync(id);
            return client is null ? Results.NotFound() : Results.Ok(client);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] ClientService service, [FromBody] Client client) =>
        {
            var created = await service.CreateClientAsync(client);
            return Results.Created($"/api/clients/{created.Id}", created);
        }).RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id, [FromBody] Client client) =>
        {
            if (id != client.Id)
                return Results.BadRequest();
            
            await service.UpdateClientAsync(client);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id) =>
        {
            await service.DeleteClientAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
