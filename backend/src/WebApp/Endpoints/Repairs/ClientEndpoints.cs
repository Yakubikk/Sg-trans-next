using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class ClientEndpoints
{
    public static void MapClientEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/clients")
            .WithTags("справочник_клиенты");

        group.MapGet("/", async ([FromServices] ClientService service) =>
            Results.Ok(await service.GetAllClientsAsync()));

        group.MapGet("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id) =>
        {
            var client = await service.GetClientByIdAsync(id);
            return client is null ? Results.NotFound() : Results.Ok(client);
        });

        group.MapPost("/", async ([FromServices] ClientService service, [FromBody] Client client) =>
        {
            var created = await service.CreateClientAsync(client);
            return Results.Created($"/api/clients/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id, [FromBody] Client client) =>
        {
            if (id != client.Id)
                return Results.BadRequest();
            
            await service.UpdateClientAsync(client);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] ClientService service, [FromRoute] Guid id) =>
        {
            await service.DeleteClientAsync(id);
            return Results.NoContent();
        });
    }
}
