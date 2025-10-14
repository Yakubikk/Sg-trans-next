using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.Common;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class StationEndpoints
{
    public static void MapStationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/stations")
            .RequireAuthorization()
            .WithTags("stations");

        // Получение списка станций с пагинацией
        group.MapGet("/", async (
            [FromServices] ApplicationDbContext context,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10) =>
        {
            var parameters = new PaginationParameters
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var query = context.Stations.AsQueryable();

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)parameters.PageSize);

            var stations = await query
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(s => new StationDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Code = s.Code,
                    OsmId = s.OsmId,
                    UicRef = s.UicRef,
                    Lat = s.Lat,
                    Lon = s.Lon,
                    Iso3166 = s.Iso3166,
                    Type = s.Type,
                    Operator = s.Operator,
                    Country = s.Country,
                    Region = s.Region,
                    Division = s.Division,
                    Railway = s.Railway
                })
                .ToListAsync();

            var result = new PaginatedList<StationDTO>
            {
                Items = stations,
                PageNumber = parameters.PageNumber,
                TotalPages = totalPages,
                TotalCount = totalCount,
                PageSize = parameters.PageSize
            };

            return Results.Ok(result);
        })
        .RequirePermissions(Permission.Read);

        // Получение станции по ID
        group.MapGet("/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id) =>
        {
            var station = await context.Stations
                .Where(s => s.Id == id)
                .Select(s => new StationDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Code = s.Code,
                    OsmId = s.OsmId,
                    UicRef = s.UicRef,
                    Lat = s.Lat,
                    Lon = s.Lon,
                    Iso3166 = s.Iso3166,
                    Type = s.Type,
                    Operator = s.Operator,
                    Country = s.Country,
                    Region = s.Region,
                    Division = s.Division,
                    Railway = s.Railway
                })
                .FirstOrDefaultAsync();

            return station is null ? Results.NotFound() : Results.Ok(station);
        })
        .RequirePermissions(Permission.Read);

        // Создание станции
        group.MapPost("/", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateStationDTO dto) =>
        {
            var station = new Station
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Code = dto.Code,
                OsmId = dto.OsmId,
                UicRef = dto.UicRef,
                Lat = dto.Lat,
                Lon = dto.Lon,
                Iso3166 = dto.Iso3166,
                Type = dto.Type,
                Operator = dto.Operator,
                Country = dto.Country,
                Region = dto.Region,
                Division = dto.Division,
                Railway = dto.Railway
            };

            context.Stations.Add(station);
            await context.SaveChangesAsync();

            return Results.Created($"/api/stations/{station.Id}", station.Id);
        })
        .RequirePermissions(Permission.Create);

        // Обновление станции
        group.MapPut("/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateStationDTO dto) =>
        {
            var station = await context.Stations.FindAsync(id);
            if (station is null)
                return Results.NotFound();

            station.Name = dto.Name;
            station.Code = dto.Code;
            station.OsmId = dto.OsmId;
            station.UicRef = dto.UicRef;
            station.Lat = dto.Lat;
            station.Lon = dto.Lon;
            station.Iso3166 = dto.Iso3166;
            station.Type = dto.Type;
            station.Operator = dto.Operator;
            station.Country = dto.Country;
            station.Region = dto.Region;
            station.Division = dto.Division;
            station.Railway = dto.Railway;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Удаление станции
        group.MapDelete("/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id) =>
        {
            var station = await context.Stations.FindAsync(id);
            if (station is null)
                return Results.NotFound();

            context.Stations.Remove(station);
            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
