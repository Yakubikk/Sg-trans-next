using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.Common;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class RailwayCisternFilterEndpoints
{
    public static void MapRailwayCisternFilterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/railway-cisterns/filter")
            .RequireAuthorization()
            .WithTags("railway-cisterns-filter");

        // Advanced search with filtering and sorting
        group.MapPost("/", async (
                [FromServices] ApplicationDbContext context,
                [FromBody] RailwayCisternFilterSortDTO request) =>
            {
                var query = context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .AsQueryable();

                query = ApplyFilters(query, request.Filters);

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
                    query = query.OrderByDescending(rc => rc.UpdatedAt);
                }

                var totalCount = await query.CountAsync();
                var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

                var cisterns = await query
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(rc => SelectColumns(rc, request.SelectedColumns))
                    .ToListAsync();

                var response = new PaginatedList<object>
                {
                    Items = cisterns,
                    PageNumber = request.Page,
                    TotalPages = totalPages,
                    TotalCount = totalCount,
                    PageSize = request.PageSize
                };

                return Results.Ok(response);
            })
            .WithName("SearchRailwayCisternsWithFilters")
            .Produces<PaginatedList<object>>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Simple search with filtering and sorting
        group.MapPost("/simple", async (
                [FromServices] ApplicationDbContext context,
                [FromBody] RailwayCisternFilterSortWithoutPaginationDTO request) =>
            {
                var query = context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .AsQueryable();

                query = ApplyFilters(query, request.Filters);

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
                    query = query.OrderByDescending(rc => rc.UpdatedAt);
                }

                var cisterns = await query
                    .Select(rc => SelectColumns(rc, request.SelectedColumns))
                    .ToListAsync();

                return Results.Ok(cisterns);
            })
            .WithName("SearchRailwayCisternsSimple")
            .Produces<List<object>>(StatusCodes.Status200OK)
            .RequirePermissions(Permission.Read);

        // Search by saved filter with pagination
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

                var filterCriteria = JsonSerializer.Deserialize<FilterCriteria>(savedFilter.FilterJson);
                var sortFields = JsonSerializer.Deserialize<List<SortCriteria>>(savedFilter.SortFieldsJson);
                var selectedColumns = savedFilter.SelectedColumnsJson != null
                    ? JsonSerializer.Deserialize<List<string>>(savedFilter.SelectedColumnsJson)
                    : null;

                var query = context.Set<RailwayCistern>()
                    .Include(rc => rc.Manufacturer)
                    .Include(rc => rc.Type)
                    .Include(rc => rc.Model)
                    .Include(rc => rc.Owner)
                    .Include(rc => rc.Registrar)
                    .Include(rc => rc.Affiliation)
                    .Include(rc => rc.MilageCisterns)
                    .AsQueryable();

                query = ApplyFilters(query, filterCriteria);

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
                    query = query.OrderByDescending(rc => rc.UpdatedAt);
                }

                var cisterns = await query
                    .Select(rc => SelectColumns(rc, selectedColumns))
                    .ToListAsync();

                return Results.Ok(cisterns);
            })
            .WithName("SearchBySavedFilter")
            .Produces<List<object>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .RequirePermissions(Permission.Read);
    }

    private static IOrderedQueryable<RailwayCistern> ApplySort(IQueryable<RailwayCistern> query, SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "number" => sort.Descending ? query.OrderByDescending(rc => rc.Number) : query.OrderBy(rc => rc.Number),
            "manufacturername" => sort.Descending
                ? query.OrderByDescending(rc => rc.Manufacturer.Name)
                : query.OrderBy(rc => rc.Manufacturer.Name),
            "builddate" => sort.Descending
                ? query.OrderByDescending(rc => rc.BuildDate)
                : query.OrderBy(rc => rc.BuildDate),
            "tareweight" => sort.Descending
                ? query.OrderByDescending(rc => rc.TareWeight)
                : query.OrderBy(rc => rc.TareWeight),
            "loadcapacity" => sort.Descending
                ? query.OrderByDescending(rc => rc.LoadCapacity)
                : query.OrderBy(rc => rc.LoadCapacity),
            "length" => sort.Descending ? query.OrderByDescending(rc => rc.Length) : query.OrderBy(rc => rc.Length),
            "axlecount" => sort.Descending
                ? query.OrderByDescending(rc => rc.AxleCount)
                : query.OrderBy(rc => rc.AxleCount),
            "volume" => sort.Descending ? query.OrderByDescending(rc => rc.Volume) : query.OrderBy(rc => rc.Volume),
            "fillingvolume" => sort.Descending
                ? query.OrderByDescending(rc => rc.FillingVolume)
                : query.OrderBy(rc => rc.FillingVolume),
            "initialtareweight" => sort.Descending
                ? query.OrderByDescending(rc => rc.InitialTareWeight)
                : query.OrderBy(rc => rc.InitialTareWeight),
            "typename" => sort.Descending
                ? query.OrderByDescending(rc => rc.Type.Name)
                : query.OrderBy(rc => rc.Type.Name),
            "modelname" => sort.Descending
                ? query.OrderByDescending(rc => rc.Model.Name)
                : query.OrderBy(rc => rc.Model.Name),
            "commissioningdate" => sort.Descending
                ? query.OrderByDescending(rc => rc.CommissioningDate)
                : query.OrderBy(rc => rc.CommissioningDate),
            "serialnumber" => sort.Descending
                ? query.OrderByDescending(rc => rc.SerialNumber)
                : query.OrderBy(rc => rc.SerialNumber),
            "registrationnumber" => sort.Descending
                ? query.OrderByDescending(rc => rc.RegistrationNumber)
                : query.OrderBy(rc => rc.RegistrationNumber),
            "registrationdate" => sort.Descending
                ? query.OrderByDescending(rc => rc.RegistrationDate)
                : query.OrderBy(rc => rc.RegistrationDate),
            "registrarname" => sort.Descending
                ? query.OrderByDescending(rc => rc.Registrar.Name)
                : query.OrderBy(rc => rc.Registrar.Name),
            "notes" => sort.Descending ? query.OrderByDescending(rc => rc.Notes) : query.OrderBy(rc => rc.Notes),
            "ownername" => sort.Descending
                ? query.OrderByDescending(rc => rc.Owner.Name)
                : query.OrderBy(rc => rc.Owner.Name),
            "techconditions" => sort.Descending
                ? query.OrderByDescending(rc => rc.TechConditions)
                : query.OrderBy(rc => rc.TechConditions),
            "pripiska" => sort.Descending
                ? query.OrderByDescending(rc => rc.Pripiska)
                : query.OrderBy(rc => rc.Pripiska),
            "reregistrationdate" => sort.Descending
                ? query.OrderByDescending(rc => rc.ReRegistrationDate)
                : query.OrderBy(rc => rc.ReRegistrationDate),
            "pressure" => sort.Descending
                ? query.OrderByDescending(rc => rc.Pressure)
                : query.OrderBy(rc => rc.Pressure),
            "testpressure" => sort.Descending
                ? query.OrderByDescending(rc => rc.TestPressure)
                : query.OrderBy(rc => rc.TestPressure),
            "rent" => sort.Descending ? query.OrderByDescending(rc => rc.Rent) : query.OrderBy(rc => rc.Rent),
            "affiliationvalue" => sort.Descending
                ? query.OrderByDescending(rc => rc.Affiliation.Value)
                : query.OrderBy(rc => rc.Affiliation.Value),
            "servicelifeyears" => sort.Descending
                ? query.OrderByDescending(rc => rc.ServiceLifeYears)
                : query.OrderBy(rc => rc.ServiceLifeYears),
            "periodmajorrepair" => sort.Descending
                ? query.OrderByDescending(rc => rc.PeriodMajorRepair)
                : query.OrderBy(rc => rc.PeriodMajorRepair),
            "periodperiodictest" => sort.Descending
                ? query.OrderByDescending(rc => rc.PeriodPeriodicTest)
                : query.OrderBy(rc => rc.PeriodPeriodicTest),
            "periodintermediatetest" => sort.Descending
                ? query.OrderByDescending(rc => rc.PeriodIntermediateTest)
                : query.OrderBy(rc => rc.PeriodIntermediateTest),
            "perioddepotrepair" => sort.Descending
                ? query.OrderByDescending(rc => rc.PeriodDepotRepair)
                : query.OrderBy(rc => rc.PeriodDepotRepair),
            "dangerclass" => sort.Descending
                ? query.OrderByDescending(rc => rc.DangerClass)
                : query.OrderBy(rc => rc.DangerClass),
            "substance" => sort.Descending
                ? query.OrderByDescending(rc => rc.Substance)
                : query.OrderBy(rc => rc.Substance),
            "tareweight2" => sort.Descending
                ? query.OrderByDescending(rc => rc.TareWeight2)
                : query.OrderBy(rc => rc.TareWeight2),
            "tareweight3" => sort.Descending
                ? query.OrderByDescending(rc => rc.TareWeight3)
                : query.OrderBy(rc => rc.TareWeight3),
            "createdat" => sort.Descending
                ? query.OrderByDescending(rc => rc.CreatedAt)
                : query.OrderBy(rc => rc.CreatedAt),
            "updatedat" => sort.Descending
                ? query.OrderByDescending(rc => rc.UpdatedAt)
                : query.OrderBy(rc => rc.UpdatedAt),
            _ => query.OrderByDescending(rc => rc.UpdatedAt) // default sorting
        };
    }

    private static IOrderedQueryable<RailwayCistern> ApplyThenBy(IOrderedQueryable<RailwayCistern> query,
        SortCriteria sort)
    {
        return sort.FieldName.ToLower() switch
        {
            "number" => sort.Descending ? query.ThenByDescending(rc => rc.Number) : query.ThenBy(rc => rc.Number),
            "manufacturername" => sort.Descending
                ? query.ThenByDescending(rc => rc.Manufacturer.Name)
                : query.ThenBy(rc => rc.Manufacturer.Name),
            "builddate" => sort.Descending
                ? query.ThenByDescending(rc => rc.BuildDate)
                : query.ThenBy(rc => rc.BuildDate),
            "tareweight" => sort.Descending
                ? query.ThenByDescending(rc => rc.TareWeight)
                : query.ThenBy(rc => rc.TareWeight),
            "loadcapacity" => sort.Descending
                ? query.ThenByDescending(rc => rc.LoadCapacity)
                : query.ThenBy(rc => rc.LoadCapacity),
            "length" => sort.Descending ? query.ThenByDescending(rc => rc.Length) : query.ThenBy(rc => rc.Length),
            "axlecount" => sort.Descending
                ? query.ThenByDescending(rc => rc.AxleCount)
                : query.ThenBy(rc => rc.AxleCount),
            "volume" => sort.Descending ? query.ThenByDescending(rc => rc.Volume) : query.ThenBy(rc => rc.Volume),
            "fillingvolume" => sort.Descending
                ? query.ThenByDescending(rc => rc.FillingVolume)
                : query.ThenBy(rc => rc.FillingVolume),
            "initialtareweight" => sort.Descending
                ? query.ThenByDescending(rc => rc.InitialTareWeight)
                : query.ThenBy(rc => rc.InitialTareWeight),
            "typename" => sort.Descending
                ? query.ThenByDescending(rc => rc.Type.Name)
                : query.ThenBy(rc => rc.Type.Name),
            "modelname" => sort.Descending
                ? query.ThenByDescending(rc => rc.Model.Name)
                : query.ThenBy(rc => rc.Model.Name),
            "commissioningdate" => sort.Descending
                ? query.ThenByDescending(rc => rc.CommissioningDate)
                : query.ThenBy(rc => rc.CommissioningDate),
            "serialnumber" => sort.Descending
                ? query.ThenByDescending(rc => rc.SerialNumber)
                : query.ThenBy(rc => rc.SerialNumber),
            "registrationnumber" => sort.Descending
                ? query.ThenByDescending(rc => rc.RegistrationNumber)
                : query.ThenBy(rc => rc.RegistrationNumber),
            "registrationdate" => sort.Descending
                ? query.ThenByDescending(rc => rc.RegistrationDate)
                : query.ThenBy(rc => rc.RegistrationDate),
            "registrarname" => sort.Descending
                ? query.ThenByDescending(rc => rc.Registrar.Name)
                : query.ThenBy(rc => rc.Registrar.Name),
            "notes" => sort.Descending ? query.ThenByDescending(rc => rc.Notes) : query.ThenBy(rc => rc.Notes),
            "ownername" => sort.Descending
                ? query.ThenByDescending(rc => rc.Owner.Name)
                : query.ThenBy(rc => rc.Owner.Name),
            "techconditions" => sort.Descending
                ? query.ThenByDescending(rc => rc.TechConditions)
                : query.ThenBy(rc => rc.TechConditions),
            "pripiska" => sort.Descending ? query.ThenByDescending(rc => rc.Pripiska) : query.ThenBy(rc => rc.Pripiska),
            "reregistrationdate" => sort.Descending
                ? query.ThenByDescending(rc => rc.ReRegistrationDate)
                : query.ThenBy(rc => rc.ReRegistrationDate),
            "pressure" => sort.Descending ? query.ThenByDescending(rc => rc.Pressure) : query.ThenBy(rc => rc.Pressure),
            "testpressure" => sort.Descending
                ? query.ThenByDescending(rc => rc.TestPressure)
                : query.ThenBy(rc => rc.TestPressure),
            "rent" => sort.Descending ? query.ThenByDescending(rc => rc.Rent) : query.ThenBy(rc => rc.Rent),
            "affiliationvalue" => sort.Descending
                ? query.ThenByDescending(rc => rc.Affiliation.Value)
                : query.ThenBy(rc => rc.Affiliation.Value),
            "servicelifeyears" => sort.Descending
                ? query.ThenByDescending(rc => rc.ServiceLifeYears)
                : query.ThenBy(rc => rc.ServiceLifeYears),
            "periodmajorrepair" => sort.Descending
                ? query.ThenByDescending(rc => rc.PeriodMajorRepair)
                : query.ThenBy(rc => rc.PeriodMajorRepair),
            "periodperiodictest" => sort.Descending
                ? query.ThenByDescending(rc => rc.PeriodPeriodicTest)
                : query.ThenBy(rc => rc.PeriodPeriodicTest),
            "periodintermediatetest" => sort.Descending
                ? query.ThenByDescending(rc => rc.PeriodIntermediateTest)
                : query.ThenBy(rc => rc.PeriodIntermediateTest),
            "perioddepotrepair" => sort.Descending
                ? query.ThenByDescending(rc => rc.PeriodDepotRepair)
                : query.ThenBy(rc => rc.PeriodDepotRepair),
            "dangerclass" => sort.Descending
                ? query.ThenByDescending(rc => rc.DangerClass)
                : query.ThenBy(rc => rc.DangerClass),
            "substance" => sort.Descending
                ? query.ThenByDescending(rc => rc.Substance)
                : query.ThenBy(rc => rc.Substance),
            "tareweight2" => sort.Descending
                ? query.ThenByDescending(rc => rc.TareWeight2)
                : query.ThenBy(rc => rc.TareWeight2),
            "tareweight3" => sort.Descending
                ? query.ThenByDescending(rc => rc.TareWeight3)
                : query.ThenBy(rc => rc.TareWeight3),
            "createdat" => sort.Descending
                ? query.ThenByDescending(rc => rc.CreatedAt)
                : query.ThenBy(rc => rc.CreatedAt),
            "updatedat" => sort.Descending
                ? query.ThenByDescending(rc => rc.UpdatedAt)
                : query.ThenBy(rc => rc.UpdatedAt),
            _ => query // если поле неизвестно, оставляем текущую сортировку
        };
    }

    private static IQueryable<RailwayCistern> ApplyFilters(IQueryable<RailwayCistern> query, FilterCriteria? filters)
    {
        if (filters == null)
            return query;

        if (filters.Numbers != null && filters.Numbers.Any())
            query = query.Where(rc => filters.Numbers.Contains(rc.Number));

        if (filters.ManufacturerIds != null && filters.ManufacturerIds.Any())
            query = query.Where(rc => filters.ManufacturerIds.Contains(rc.ManufacturerId));

        if (filters.BuildDate != null)
        {
            if (filters.BuildDate.From.HasValue)
                query = query.Where(rc => rc.BuildDate >= filters.BuildDate.From);
            if (filters.BuildDate.To.HasValue)
                query = query.Where(rc => rc.BuildDate <= filters.BuildDate.To);
        }

        if (filters.TareWeight != null)
        {
            if (filters.TareWeight.From.HasValue)
                query = query.Where(rc => rc.TareWeight >= filters.TareWeight.From);
            if (filters.TareWeight.To.HasValue)
                query = query.Where(rc => rc.TareWeight <= filters.TareWeight.To);
        }

        // Аналогично для остальных фильтров с диапазонами...

        return query;
    }

    private static dynamic SelectColumns(RailwayCistern rc, List<string>? selectedColumns)
    {
        if (selectedColumns == null || !selectedColumns.Any())
        {
            // Default selection remains the same
            return new
            {
                rc.Id,
                rc.Number,
                ManufacturerName = rc.Manufacturer.Name,
                rc.BuildDate,
                rc.TareWeight,
                rc.LoadCapacity,
                rc.Length,
                rc.AxleCount,
                rc.Volume,
                rc.FillingVolume,
                rc.InitialTareWeight,
                TypeName = rc.Type.Name,
                ModelName = rc.Model != null ? rc.Model.Name : null,
                rc.CommissioningDate,
                rc.SerialNumber,
                rc.RegistrationNumber,
                rc.RegistrationDate,
                RegistrarName = rc.Registrar != null ? rc.Registrar.Name : null,
                OwnerName = rc.Owner != null ? rc.Owner.Name : null,
                rc.TechConditions,
                rc.Pripiska,
                rc.ReRegistrationDate,
                rc.Pressure,
                rc.TestPressure,
                rc.Rent,
                AffiliationValue = rc.Affiliation.Value,
                rc.ServiceLifeYears,
                rc.PeriodMajorRepair,
                rc.PeriodPeriodicTest,
                rc.PeriodIntermediateTest,
                rc.PeriodDepotRepair,
                rc.DangerClass,
                rc.Substance,
                rc.TareWeight2,
                rc.TareWeight3,
                rc.CreatedAt,
                rc.UpdatedAt,
                ManufacturerId = rc.ManufacturerId,
                ModelId = rc.ModelId,
                TypeId = rc.TypeId,
                OwnerId = rc.OwnerId,
                RegistrarId = rc.RegistrarId,
                AffiliationId = rc.AffiliationId
            };
        }

        var selectedProperties = new System.Dynamic.ExpandoObject() as IDictionary<string, object>;
        foreach (var column in selectedColumns)
        {
            var normalizedColumn = column.ToLower();
            switch (normalizedColumn)
            {
                // Основные поля
                case "id":
                    selectedProperties["id"] = rc.Id;
                    break;
                case "number":
                    selectedProperties["number"] = rc.Number;
                    break;

                // Manufacturer
                case "manufacturer.id":
                    selectedProperties["manufacturerId"] = rc.ManufacturerId;
                    break;
                case "manufacturer.name":
                    selectedProperties["manufacturerName"] = rc.Manufacturer.Name;
                    break;
                case "manufacturer.country":
                    selectedProperties["manufacturerCountry"] = rc.Manufacturer.Country;
                    break;
                case "manufacturer.shortname":
                    selectedProperties["manufacturerShortName"] = rc.Manufacturer.ShortName;
                    break;
                case "manufacturer.code":
                    selectedProperties["manufacturerCode"] = rc.Manufacturer.Code;
                    break;

                // Type
                case "type.id":
                    selectedProperties["typeId"] = rc.TypeId;
                    break;
                case "type.name":
                    selectedProperties["typeName"] = rc.Type.Name;
                    break;
                case "type.type":
                    selectedProperties["typeType"] = rc.Type.Type;
                    break;

                // Model
                case "model.id":
                    selectedProperties["modelId"] = rc.ModelId;
                    break;
                case "model.name":
                    selectedProperties["modelName"] = rc.Model?.Name;
                    break;

                // Owner
                case "owner.id":
                    selectedProperties["ownerId"] = rc.OwnerId;
                    break;
                case "owner.name":
                    selectedProperties["ownerName"] = rc.Owner?.Name;
                    break;
                case "owner.unp":
                    selectedProperties["ownerUnp"] = rc.Owner?.UNP;
                    break;
                case "owner.shortname":
                    selectedProperties["ownerShortName"] = rc.Owner?.ShortName;
                    break;
                case "owner.address":
                    selectedProperties["ownerAddress"] = rc.Owner?.Address;
                    break;
                case "owner.treatrepairs":
                    selectedProperties["ownerTreatRepairs"] = rc.Owner?.TreatRepairs;
                    break;

                // Registrar
                case "registrar.id":
                    selectedProperties["registrarId"] = rc.RegistrarId;
                    break;
                case "registrar.name":
                    selectedProperties["registrarName"] = rc.Registrar?.Name;
                    break;

                // Affiliation
                case "affiliation.id":
                    selectedProperties["affiliationId"] = rc.AffiliationId;
                    break;
                case "affiliation.value":
                    selectedProperties["affiliationValue"] = rc.Affiliation.Value;
                    break;

                // Базовые поля
                case "builddate":
                    selectedProperties["buildDate"] = rc.BuildDate;
                    break;
                case "tareweight":
                    selectedProperties["tareWeight"] = rc.TareWeight;
                    break;
                case "loadcapacity":
                    selectedProperties["loadCapacity"] = rc.LoadCapacity;
                    break;
                case "length":
                    selectedProperties["length"] = rc.Length;
                    break;
                case "axlecount":
                    selectedProperties["axleCount"] = rc.AxleCount;
                    break;
                case "volume":
                    selectedProperties["volume"] = rc.Volume;
                    break;
                case "fillingvolume":
                    selectedProperties["fillingVolume"] = rc.FillingVolume;
                    break;
                case "initialtareweight":
                    selectedProperties["initialTareWeight"] = rc.InitialTareWeight;
                    break;
                case "commissioningdate":
                    selectedProperties["commissioningDate"] = rc.CommissioningDate;
                    break;
                case "serialnumber":
                    selectedProperties["serialNumber"] = rc.SerialNumber;
                    break;
                case "registrationnumber":
                    selectedProperties["registrationNumber"] = rc.RegistrationNumber;
                    break;
                case "registrationdate":
                    selectedProperties["registrationDate"] = rc.RegistrationDate;
                    break;
                case "techconditions":
                    selectedProperties["techConditions"] = rc.TechConditions;
                    break;
                case "pripiska":
                    selectedProperties["pripiska"] = rc.Pripiska;
                    break;
                case "reregistrationdate":
                    selectedProperties["reRegistrationDate"] = rc.ReRegistrationDate;
                    break;
                case "pressure":
                    selectedProperties["pressure"] = rc.Pressure;
                    break;
                case "testpressure":
                    selectedProperties["testPressure"] = rc.TestPressure;
                    break;
                case "rent":
                    selectedProperties["rent"] = rc.Rent;
                    break;
                case "servicelifeyears":
                    selectedProperties["serviceLifeYears"] = rc.ServiceLifeYears;
                    break;
                case "periodmajorrepair":
                    selectedProperties["periodMajorRepair"] = rc.PeriodMajorRepair;
                    break;
                case "periodperiodictest":
                    selectedProperties["periodPeriodicTest"] = rc.PeriodPeriodicTest;
                    break;
                case "periodintermediatetest":
                    selectedProperties["periodIntermediateTest"] = rc.PeriodIntermediateTest;
                    break;
                case "perioddepotrepair":
                    selectedProperties["periodDepotRepair"] = rc.PeriodDepotRepair;
                    break;
                case "dangerclass":
                    selectedProperties["dangerClass"] = rc.DangerClass;
                    break;
                case "substance":
                    selectedProperties["substance"] = rc.Substance;
                    break;
                case "tareweight2":
                    selectedProperties["tareWeight2"] = rc.TareWeight2;
                    break;
                case "tareweight3":
                    selectedProperties["tareWeight3"] = rc.TareWeight3;
                    break;
                case "createdat":
                    selectedProperties["createdAt"] = rc.CreatedAt;
                    break;
                case "updatedat":
                    selectedProperties["updatedAt"] = rc.UpdatedAt;
                    break;
            }
        }

        return selectedProperties;
    }
}