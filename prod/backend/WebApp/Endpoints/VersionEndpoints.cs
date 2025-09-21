using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebApp.DTO.Common;

namespace WebApp.Endpoints;

public static class VersionEndpoints
{
    public static void MapVersionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/version")
            .WithTags("version");

        group.MapGet("/", ([FromServices] IWebHostEnvironment env) =>
        {
            var path = Path.Combine(env.ContentRootPath, "versions.json");
            var jsonString = File.ReadAllText(path);
            var versions = JsonSerializer.Deserialize<VersionsDTO>(jsonString);
            return Results.Ok(versions);
        })
        .WithName("GetVersions")
        .Produces<VersionsDTO>(StatusCodes.Status200OK);
    }
}
