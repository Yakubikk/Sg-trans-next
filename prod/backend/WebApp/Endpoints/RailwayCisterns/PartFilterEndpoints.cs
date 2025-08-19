using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.Common;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class PartFilterEndpoints
{
    public static void MapPartFilterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/parts/filter")
            .RequireAuthorization()
            .WithTags("parts-filter");

        // Фильтрация с пагинацией
        group.MapPost("/", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] PartFilterSortDTO request) =>
        {
            var query = BuildFilterQuery(context, request.Filters);

            // Применяем сортировку
            if (request.SortFields != null && request.SortFields.Any())
            {
                var firstSort = request.SortFields.First();
                var orderedQuery = ApplySort(query, firstSort);

                foreach (var sortField in request.SortFields.Skip(1))
                {
                    orderedQuery = ApplyThenBy(orderedQuery, sortField);
                }

                query = orderedQuery;
            }
            else
            {
                // Сортировка по умолчанию по UpdatedAt по убыванию
                query = query.OrderByDescending(p => p.UpdatedAt);
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

            var parts = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new PartDTO
                {
                    Id = p.Id,
                    PartType = new PartTypeDTO
                    {
                        Id = p.PartType.Id,
                        Name = p.PartType.Name,
                        Code = p.PartType.Code
                    },
                    DepotId = p.DepotId,
                    StampNumber = new StampNumberDTO
                    {
                        Id = p.StampNumber.Id,
                        Value = p.StampNumber.Value
                    },
                    SerialNumber = p.SerialNumber,
                    ManufactureYear = p.ManufactureYear,
                    CurrentLocation = p.CurrentLocation,
                    Status = new PartStatusDTO
                    {
                        Id = p.Status.Id,
                        Name = p.Status.Name,
                        Code = p.Status.Code
                    },
                    Notes = p.Notes,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    WheelPair = p.WheelPair != null ? new WheelPairDTO
                    {
                        ThicknessLeft = p.WheelPair.ThicknessLeft,
                        ThicknessRight = p.WheelPair.ThicknessRight,
                        WheelType = p.WheelPair.WheelType
                    } : null,
                    SideFrame = p.SideFrame != null ? new SideFrameDTO
                    {
                        ServiceLifeYears = p.SideFrame.ServiceLifeYears,
                        ExtendedUntil = p.SideFrame.ExtendedUntil
                    } : null,
                    Bolster = p.Bolster != null ? new BolsterDTO
                    {
                        ServiceLifeYears = p.Bolster.ServiceLifeYears,
                        ExtendedUntil = p.Bolster.ExtendedUntil
                    } : null,
                    Coupler = p.Coupler != null ? new CouplerDTO() : null,
                    ShockAbsorber = p.ShockAbsorber != null ? new ShockAbsorberDTO
                    {
                        Model = p.ShockAbsorber.Model,
                        ManufacturerCode = p.ShockAbsorber.ManufacturerCode,
                        NextRepairDate = p.ShockAbsorber.NextRepairDate,
                        ServiceLifeYears = p.ShockAbsorber.ServiceLifeYears
                    } : null
                })
                .ToListAsync();

            var result = new PaginatedList<PartDTO>
            {
                Items = parts,
                PageNumber = request.Page,
                TotalPages = totalPages,
                TotalCount = totalCount
            };

            return Results.Ok(result);
        })
        .WithName("FilterParts")
        .Produces<PaginatedList<PartDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);

        // Фильтрация без пагинации
        group.MapPost("/all", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] PartFilterSortWithoutPaginationDTO request) =>
        {
            var query = BuildFilterQuery(context, request.Filters);

            // Применяем сортировку
            if (request.SortFields != null && request.SortFields.Any())
            {
                var firstSort = request.SortFields.First();
                var orderedQuery = ApplySort(query, firstSort);

                foreach (var sortField in request.SortFields.Skip(1))
                {
                    orderedQuery = ApplyThenBy(orderedQuery, sortField);
                }

                query = orderedQuery;
            }
            else
            {
                // Сортировка по умолчанию по UpdatedAt по убыванию
                query = query.OrderByDescending(p => p.UpdatedAt);
            }

            var parts = await query
                .Select(p => new PartDTO
                {
                    Id = p.Id,
                    PartType = new PartTypeDTO
                    {
                        Id = p.PartType.Id,
                        Name = p.PartType.Name,
                        Code = p.PartType.Code
                    },
                    DepotId = p.DepotId,
                    StampNumber = new StampNumberDTO
                    {
                        Id = p.StampNumber.Id,
                        Value = p.StampNumber.Value
                    },
                    SerialNumber = p.SerialNumber,
                    ManufactureYear = p.ManufactureYear,
                    CurrentLocation = p.CurrentLocation,
                    Status = new PartStatusDTO
                    {
                        Id = p.Status.Id,
                        Name = p.Status.Name,
                        Code = p.Status.Code
                    },
                    Notes = p.Notes,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    WheelPair = p.WheelPair != null ? new WheelPairDTO
                    {
                        ThicknessLeft = p.WheelPair.ThicknessLeft,
                        ThicknessRight = p.WheelPair.ThicknessRight,
                        WheelType = p.WheelPair.WheelType
                    } : null,
                    SideFrame = p.SideFrame != null ? new SideFrameDTO
                    {
                        ServiceLifeYears = p.SideFrame.ServiceLifeYears,
                        ExtendedUntil = p.SideFrame.ExtendedUntil
                    } : null,
                    Bolster = p.Bolster != null ? new BolsterDTO
                    {
                        ServiceLifeYears = p.Bolster.ServiceLifeYears,
                        ExtendedUntil = p.Bolster.ExtendedUntil
                    } : null,
                    Coupler = p.Coupler != null ? new CouplerDTO() : null,
                    ShockAbsorber = p.ShockAbsorber != null ? new ShockAbsorberDTO
                    {
                        Model = p.ShockAbsorber.Model,
                        ManufacturerCode = p.ShockAbsorber.ManufacturerCode,
                        NextRepairDate = p.ShockAbsorber.NextRepairDate,
                        ServiceLifeYears = p.ShockAbsorber.ServiceLifeYears
                    } : null
                })
                .ToListAsync();

            return Results.Ok(parts);
        })
        .WithName("FilterAllParts")
        .Produces<List<PartDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);

        // Поиск по сохраненному фильтру
        group.MapGet("/saved/{filterId}", async (
            [FromRoute] Guid filterId,
            [FromServices] ApplicationDbContext context,
            HttpContext httpContext) =>
        {
            var userId = Guid.Parse(httpContext.User.FindFirstValue("userId")!);
            var savedFilter = await context.Set<SavedFilter>()
                .FirstOrDefaultAsync(f => f.Id == filterId && f.UserId == userId);

            if (savedFilter == null)
                return Results.NotFound("Сохраненный фильтр не найден");

            var filterCriteria = System.Text.Json.JsonSerializer.Deserialize<PartFilterCriteria>(savedFilter.FilterJson);
            var sortFields = System.Text.Json.JsonSerializer.Deserialize<List<SortCriteria>>(savedFilter.SortFieldsJson);

            var query = BuildFilterQuery(context, filterCriteria);

            // Применяем сортировку
            if (sortFields != null && sortFields.Any())
            {
                var firstSort = sortFields.First();
                var orderedQuery = ApplySort(query, firstSort);

                foreach (var sortField in sortFields.Skip(1))
                {
                    orderedQuery = ApplyThenBy(orderedQuery, sortField);
                }

                query = orderedQuery;
            }
            else
            {
                query = query.OrderByDescending(p => p.UpdatedAt);
            }

            var parts = await query
                .Select(p => new PartDTO
                {
                    Id = p.Id,
                    PartType = new PartTypeDTO
                    {
                        Id = p.PartType.Id,
                        Name = p.PartType.Name,
                        Code = p.PartType.Code
                    },
                    DepotId = p.DepotId,
                    StampNumber = new StampNumberDTO
                    {
                        Id = p.StampNumber.Id,
                        Value = p.StampNumber.Value
                    },
                    SerialNumber = p.SerialNumber,
                    ManufactureYear = p.ManufactureYear,
                    CurrentLocation = p.CurrentLocation,
                    Status = new PartStatusDTO
                    {
                        Id = p.Status.Id,
                        Name = p.Status.Name,
                        Code = p.Status.Code
                    },
                    Notes = p.Notes,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    WheelPair = p.WheelPair != null ? new WheelPairDTO
                    {
                        ThicknessLeft = p.WheelPair.ThicknessLeft,
                        ThicknessRight = p.WheelPair.ThicknessRight,
                        WheelType = p.WheelPair.WheelType
                    } : null,
                    SideFrame = p.SideFrame != null ? new SideFrameDTO
                    {
                        ServiceLifeYears = p.SideFrame.ServiceLifeYears,
                        ExtendedUntil = p.SideFrame.ExtendedUntil
                    } : null,
                    Bolster = p.Bolster != null ? new BolsterDTO
                    {
                        ServiceLifeYears = p.Bolster.ServiceLifeYears,
                        ExtendedUntil = p.Bolster.ExtendedUntil
                    } : null,
                    Coupler = p.Coupler != null ? new CouplerDTO() : null,
                    ShockAbsorber = p.ShockAbsorber != null ? new ShockAbsorberDTO
                    {
                        Model = p.ShockAbsorber.Model,
                        ManufacturerCode = p.ShockAbsorber.ManufacturerCode,
                        NextRepairDate = p.ShockAbsorber.NextRepairDate,
                        ServiceLifeYears = p.ShockAbsorber.ServiceLifeYears
                    } : null
                })
                .ToListAsync();

            return Results.Ok(parts);
        })
        .WithName("GetPartsBySavedFilter")
        .Produces<List<PartDTO>>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .RequirePermissions(Permission.Read);
    }

    private static IQueryable<Part> BuildFilterQuery(ApplicationDbContext context, PartFilterCriteria? filters)
    {
        var query = context.Parts
            .Include(p => p.PartType)
            .Include(p => p.Status)
            .Include(p => p.StampNumber)
            .Include(p => p.WheelPair)
            .Include(p => p.SideFrame)
            .Include(p => p.Bolster)
            .Include(p => p.Coupler)
            .Include(p => p.ShockAbsorber)
            .AsQueryable();

        if (filters == null)
            return query;

        if (filters.PartTypeIds != null && filters.PartTypeIds.Any())
            query = query.Where(p => filters.PartTypeIds.Contains(p.PartTypeId));

        if (filters.DepotIds != null && filters.DepotIds.Any())
            query = query.Where(p => p.DepotId.HasValue && filters.DepotIds.Contains(p.DepotId.Value));

        if (filters.StampNumbers != null && filters.StampNumbers.Any())
            query = query.Where(p => filters.StampNumbers.Contains(p.StampNumber.Value));

        if (filters.SerialNumbers != null && filters.SerialNumbers.Any())
            query = query.Where(p => p.SerialNumber != null && filters.SerialNumbers.Contains(p.SerialNumber));

        if (filters.ManufactureYearFrom.HasValue)
            query = query.Where(p => p.ManufactureYear >= filters.ManufactureYearFrom);
        if (filters.ManufactureYearTo.HasValue)
            query = query.Where(p => p.ManufactureYear <= filters.ManufactureYearTo);

        if (filters.Locations != null && filters.Locations.Any())
            query = query.Where(p => p.CurrentLocation != null && filters.Locations.Contains(p.CurrentLocation));

        if (filters.StatusIds != null && filters.StatusIds.Any())
            query = query.Where(p => filters.StatusIds.Contains(p.StatusId));

        if (filters.CreatedAtFrom.HasValue)
            query = query.Where(p => p.CreatedAt >= filters.CreatedAtFrom.Value.DateTime);
        if (filters.CreatedAtTo.HasValue)
            query = query.Where(p => p.CreatedAt <= filters.CreatedAtTo.Value.DateTime);

        if (filters.UpdatedAtFrom.HasValue)
            query = query.Where(p => p.UpdatedAt >= filters.UpdatedAtFrom.Value.DateTime);
        if (filters.UpdatedAtTo.HasValue)
            query = query.Where(p => p.UpdatedAt <= filters.UpdatedAtTo.Value.DateTime);

        // Специфичные фильтры для колесных пар
        if (filters.ThicknessLeftFrom.HasValue)
            query = query.Where(p => p.WheelPair != null && p.WheelPair.ThicknessLeft >= filters.ThicknessLeftFrom);
        if (filters.ThicknessLeftTo.HasValue)
            query = query.Where(p => p.WheelPair != null && p.WheelPair.ThicknessLeft <= filters.ThicknessLeftTo);
        if (filters.ThicknessRightFrom.HasValue)
            query = query.Where(p => p.WheelPair != null && p.WheelPair.ThicknessRight >= filters.ThicknessRightFrom);
        if (filters.ThicknessRightTo.HasValue)
            query = query.Where(p => p.WheelPair != null && p.WheelPair.ThicknessRight <= filters.ThicknessRightTo);
        if (filters.WheelTypes != null && filters.WheelTypes.Any())
            query = query.Where(p => p.WheelPair != null && p.WheelPair.WheelType != null && 
                                   filters.WheelTypes.Contains(p.WheelPair.WheelType));

        // Специфичные фильтры для боковых рам и надрессорных балок
        if (filters.ServiceLifeYearsFrom.HasValue)
            query = query.Where(p => 
                (p.SideFrame != null && p.SideFrame.ServiceLifeYears >= filters.ServiceLifeYearsFrom) ||
                (p.Bolster != null && p.Bolster.ServiceLifeYears >= filters.ServiceLifeYearsFrom));
        if (filters.ServiceLifeYearsTo.HasValue)
            query = query.Where(p => 
                (p.SideFrame != null && p.SideFrame.ServiceLifeYears <= filters.ServiceLifeYearsTo) ||
                (p.Bolster != null && p.Bolster.ServiceLifeYears <= filters.ServiceLifeYearsTo));
        if (filters.ExtendedUntilFrom.HasValue)
            query = query.Where(p => 
                (p.SideFrame != null && p.SideFrame.ExtendedUntil >= filters.ExtendedUntilFrom) ||
                (p.Bolster != null && p.Bolster.ExtendedUntil >= filters.ExtendedUntilFrom));
        if (filters.ExtendedUntilTo.HasValue)
            query = query.Where(p => 
                (p.SideFrame != null && p.SideFrame.ExtendedUntil <= filters.ExtendedUntilTo) ||
                (p.Bolster != null && p.Bolster.ExtendedUntil <= filters.ExtendedUntilTo));

        // Специфичные фильтры для поглощающих аппаратов
        if (filters.Models != null && filters.Models.Any())
            query = query.Where(p => p.ShockAbsorber != null && p.ShockAbsorber.Model != null && 
                                   filters.Models.Contains(p.ShockAbsorber.Model));
        if (filters.ManufacturerCodes != null && filters.ManufacturerCodes.Any())
            query = query.Where(p => p.ShockAbsorber != null && p.ShockAbsorber.ManufacturerCode != null && 
                                   filters.ManufacturerCodes.Contains(p.ShockAbsorber.ManufacturerCode));
        if (filters.NextRepairDateFrom.HasValue)
            query = query.Where(p => p.ShockAbsorber != null && p.ShockAbsorber.NextRepairDate >= filters.NextRepairDateFrom);
        if (filters.NextRepairDateTo.HasValue)
            query = query.Where(p => p.ShockAbsorber != null && p.ShockAbsorber.NextRepairDate <= filters.NextRepairDateTo);

        return query;
    }

    private static IOrderedQueryable<Part> ApplySort(IQueryable<Part> query, SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "parttypename" => sort.Descending ? query.OrderByDescending(p => p.PartType.Name) : query.OrderBy(p => p.PartType.Name),
            "stampnumber" => sort.Descending ? query.OrderByDescending(p => p.StampNumber.Value) : query.OrderBy(p => p.StampNumber.Value),
            "serialnumber" => sort.Descending ? query.OrderByDescending(p => p.SerialNumber) : query.OrderBy(p => p.SerialNumber),
            "manufactureyear" => sort.Descending ? query.OrderByDescending(p => p.ManufactureYear) : query.OrderBy(p => p.ManufactureYear),
            "currentlocation" => sort.Descending ? query.OrderByDescending(p => p.CurrentLocation) : query.OrderBy(p => p.CurrentLocation),
            "statusname" => sort.Descending ? query.OrderByDescending(p => p.Status.Name) : query.OrderBy(p => p.Status.Name),
            "notes" => sort.Descending ? query.OrderByDescending(p => p.Notes) : query.OrderBy(p => p.Notes),
            "createdat" => sort.Descending ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
            "updatedat" => sort.Descending ? query.OrderByDescending(p => p.UpdatedAt) : query.OrderBy(p => p.UpdatedAt),
            
            // Специфичные поля для колесных пар
            "thicknessleft" => sort.Descending ? query.OrderByDescending(p => p.WheelPair.ThicknessLeft) : query.OrderBy(p => p.WheelPair.ThicknessLeft),
            "thicknessright" => sort.Descending ? query.OrderByDescending(p => p.WheelPair.ThicknessRight) : query.OrderBy(p => p.WheelPair.ThicknessRight),
            "wheeltype" => sort.Descending ? query.OrderByDescending(p => p.WheelPair.WheelType) : query.OrderBy(p => p.WheelPair.WheelType),
            
            // Специфичные поля для боковых рам и надрессорных балок
            "servicelifeyears" => sort.Descending ? 
                query.OrderByDescending(p => p.SideFrame != null ? p.SideFrame.ServiceLifeYears : 
                    p.Bolster != null ? p.Bolster.ServiceLifeYears : null) : 
                query.OrderBy(p => p.SideFrame != null ? p.SideFrame.ServiceLifeYears : 
                    p.Bolster != null ? p.Bolster.ServiceLifeYears : null),
            "extendeduntil" => sort.Descending ? 
                query.OrderByDescending(p => p.SideFrame != null ? p.SideFrame.ExtendedUntil : 
                    p.Bolster != null ? p.Bolster.ExtendedUntil : null) : 
                query.OrderBy(p => p.SideFrame != null ? p.SideFrame.ExtendedUntil : 
                    p.Bolster != null ? p.Bolster.ExtendedUntil : null),
            
            // Специфичные поля для поглощающих аппаратов
            "model" => sort.Descending ? query.OrderByDescending(p => p.ShockAbsorber.Model) : query.OrderBy(p => p.ShockAbsorber.Model),
            "manufacturercode" => sort.Descending ? query.OrderByDescending(p => p.ShockAbsorber.ManufacturerCode) : query.OrderBy(p => p.ShockAbsorber.ManufacturerCode),
            "nextrepairdate" => sort.Descending ? query.OrderByDescending(p => p.ShockAbsorber.NextRepairDate) : query.OrderBy(p => p.ShockAbsorber.NextRepairDate),
            
            _ => query.OrderByDescending(p => p.UpdatedAt) // сортировка по умолчанию
        };
    }

    private static IOrderedQueryable<Part> ApplyThenBy(IOrderedQueryable<Part> query, SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "parttypename" => sort.Descending ? query.ThenByDescending(p => p.PartType.Name) : query.ThenBy(p => p.PartType.Name),
            "stampnumber" => sort.Descending ? query.ThenByDescending(p => p.StampNumber.Value) : query.ThenBy(p => p.StampNumber.Value),
            "serialnumber" => sort.Descending ? query.ThenByDescending(p => p.SerialNumber) : query.ThenBy(p => p.SerialNumber),
            "manufactureyear" => sort.Descending ? query.ThenByDescending(p => p.ManufactureYear) : query.ThenBy(p => p.ManufactureYear),
            "currentlocation" => sort.Descending ? query.ThenByDescending(p => p.CurrentLocation) : query.ThenBy(p => p.CurrentLocation),
            "statusname" => sort.Descending ? query.ThenByDescending(p => p.Status.Name) : query.ThenBy(p => p.Status.Name),
            "notes" => sort.Descending ? query.ThenByDescending(p => p.Notes) : query.ThenBy(p => p.Notes),
            "createdat" => sort.Descending ? query.ThenByDescending(p => p.CreatedAt) : query.ThenBy(p => p.CreatedAt),
            "updatedat" => sort.Descending ? query.ThenByDescending(p => p.UpdatedAt) : query.ThenBy(p => p.UpdatedAt),
            
            // Специфичные поля для колесных пар
            "thicknessleft" => sort.Descending ? query.ThenByDescending(p => p.WheelPair.ThicknessLeft) : query.ThenBy(p => p.WheelPair.ThicknessLeft),
            "thicknessright" => sort.Descending ? query.ThenByDescending(p => p.WheelPair.ThicknessRight) : query.ThenBy(p => p.WheelPair.ThicknessRight),
            "wheeltype" => sort.Descending ? query.ThenByDescending(p => p.WheelPair.WheelType) : query.ThenBy(p => p.WheelPair.WheelType),
            
            // Специфичные поля для боковых рам и надрессорных балок
            "servicelifeyears" => sort.Descending ? 
                query.ThenByDescending(p => p.SideFrame != null ? p.SideFrame.ServiceLifeYears : 
                    p.Bolster != null ? p.Bolster.ServiceLifeYears : null) : 
                query.ThenBy(p => p.SideFrame != null ? p.SideFrame.ServiceLifeYears : 
                    p.Bolster != null ? p.Bolster.ServiceLifeYears : null),
            "extendeduntil" => sort.Descending ? 
                query.ThenByDescending(p => p.SideFrame != null ? p.SideFrame.ExtendedUntil : 
                    p.Bolster != null ? p.Bolster.ExtendedUntil : null) : 
                query.ThenBy(p => p.SideFrame != null ? p.SideFrame.ExtendedUntil : 
                    p.Bolster != null ? p.Bolster.ExtendedUntil : null),
            
            // Специфичные поля для поглощающих аппаратов
            "model" => sort.Descending ? query.ThenByDescending(p => p.ShockAbsorber.Model) : query.ThenBy(p => p.ShockAbsorber.Model),
            "manufacturercode" => sort.Descending ? query.ThenByDescending(p => p.ShockAbsorber.ManufacturerCode) : query.ThenBy(p => p.ShockAbsorber.ManufacturerCode),
            "nextrepairdate" => sort.Descending ? query.ThenByDescending(p => p.ShockAbsorber.NextRepairDate) : query.ThenBy(p => p.ShockAbsorber.NextRepairDate),
            
            _ => query // если поле неизвестно, оставляем текущую сортировку
        };
    }
}
