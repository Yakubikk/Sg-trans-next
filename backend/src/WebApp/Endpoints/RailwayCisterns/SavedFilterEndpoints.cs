using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class SavedFilterEndpoints
{
    public static void MapSavedFilterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/saved-filters")
            .RequireAuthorization()
            .WithTags("saved-filters");

        // Get all filters for current user
        group.MapGet("/", async (
                [FromServices] ApplicationDbContext context,
                HttpContext httpContext) =>
            {
                var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
                var filters = await context.Set<SavedFilter>()
                    .Where(f => f.UserId == userId)
                    .Select(f => new 
                    {
                        f.Id,
                        f.Name,
                        f.FilterJson,
                        f.SortFieldsJson,
                        f.UserId,
                        f.CreatedAt,
                        f.UpdatedAt
                    })
                    .ToListAsync();

                var result = filters.Select(f => new SavedFilterDTO
                {
                    Id = f.Id,
                    Name = f.Name,
                    Filter = JsonSerializer.Deserialize<FilterCriteria>(f.FilterJson),
                    SortFields = JsonSerializer.Deserialize<List<SortCriteria>>(f.SortFieldsJson),
                    UserId = f.UserId,
                    CreatedAt = f.CreatedAt,
                    UpdatedAt = f.UpdatedAt
                }).ToList();

                return Results.Ok(result);
            })
            .WithName("GetSavedFilters")
            .Produces<List<SavedFilterDTO>>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Get filter by ID
        group.MapGet("/{id}", async (
                [FromServices] ApplicationDbContext context,
                [FromRoute] Guid id,
                HttpContext httpContext) =>
            {
                var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
                var filter = await context.Set<SavedFilter>()
                    .Where(f => f.Id == id && f.UserId == userId)
                    .Select(f => new
                    {
                        f.Id,
                        f.Name,
                        f.FilterJson,
                        f.SortFieldsJson,
                        f.UserId,
                        f.CreatedAt,
                        f.UpdatedAt
                    })
                    .FirstOrDefaultAsync();

                if (filter == null)
                    return Results.NotFound();

                var result = new SavedFilterDTO
                {
                    Id = filter.Id,
                    Name = filter.Name,
                    Filter = JsonSerializer.Deserialize<FilterCriteria>(filter.FilterJson),
                    SortFields = JsonSerializer.Deserialize<List<SortCriteria>>(filter.SortFieldsJson),
                    UserId = filter.UserId,
                    CreatedAt = filter.CreatedAt,
                    UpdatedAt = filter.UpdatedAt
                };

                return Results.Ok(result);
            })
            .WithName("GetSavedFilterById")
            .Produces<SavedFilterDTO>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .RequirePermissions(Permission.Read);

        // Create new filter
        group.MapPost("/", async (
                [FromServices] ApplicationDbContext context,
                [FromBody] CreateSavedFilterDTO dto,
                HttpContext httpContext) =>
            {
                var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
                var filter = new SavedFilter
                {
                    Id = Guid.NewGuid(),
                    Name = dto.Name,
                    FilterJson = JsonSerializer.Serialize(dto.Filter),
                    SortFieldsJson = JsonSerializer.Serialize(dto.SortFields),
                    UserId = userId,
                    CreatedAt = DateTimeOffset.UtcNow,
                    UpdatedAt = DateTimeOffset.UtcNow
                };

                context.Add(filter);
                await context.SaveChangesAsync();

                return Results.Created($"/api/saved-filters/{filter.Id}", new SavedFilterDTO
                {
                    Id = filter.Id,
                    Name = filter.Name,
                    Filter = dto.Filter,
                    SortFields = dto.SortFields,
                    UserId = filter.UserId,
                    CreatedAt = filter.CreatedAt,
                    UpdatedAt = filter.UpdatedAt
                });
            })
            .WithName("CreateSavedFilter")
            .Produces<SavedFilterDTO>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .RequirePermissions(Permission.Create);

        // Update filter
        group.MapPut("/{id}", async (
                [FromServices] ApplicationDbContext context,
                [FromRoute] Guid id,
                [FromBody] UpdateSavedFilterDTO dto,
                HttpContext httpContext) =>
            {
                var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
                var filter = await context.Set<SavedFilter>()
                    .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

                if (filter == null)
                    return Results.NotFound();

                filter.Name = dto.Name;
                filter.FilterJson = JsonSerializer.Serialize(dto.Filter);
                filter.SortFieldsJson = JsonSerializer.Serialize(dto.SortFields);
                filter.UpdatedAt = DateTimeOffset.UtcNow;

                await context.SaveChangesAsync();

                return Results.NoContent();
            })
            .WithName("UpdateSavedFilter")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem()
            .RequirePermissions(Permission.Update);

        // Delete filter
        group.MapDelete("/{id}", async (
                [FromServices] ApplicationDbContext context,
                [FromRoute] Guid id,
                HttpContext httpContext) =>
            {
                var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
                var filter = await context.Set<SavedFilter>()
                    .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

                if (filter == null)
                    return Results.NotFound();

                context.Remove(filter);
                await context.SaveChangesAsync();

                return Results.NoContent();
            })
            .WithName("DeleteSavedFilter")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .RequirePermissions(Permission.Delete);
    }
}
