using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.Common;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class PartEquipmentEndpoints
{
    public static void MapPartEquipmentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/part-equipments")
            .RequireAuthorization()
            .WithTags("part-equipments");

        // Получение всех записей с пагинацией
        group.MapGet("/", async (
            [FromServices] ApplicationDbContext context,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] Guid? cisternId = null) =>
        {
            var parameters = new PaginationParameters 
            { 
                PageNumber = pageNumber, 
                PageSize = pageSize 
            };

            var query = context.PartEquipments
                .Include(pe => pe.EquipmentType)
                .Include(pe => pe.JobDepot)
                .Include(pe => pe.Depot)
                .Include(pe => pe.RepairType)
                .AsQueryable();

            if (cisternId.HasValue)
            {
                query = query.Where(pe => pe.RailwayCisternsId == cisternId);
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)parameters.PageSize);

            var equipments = await query
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(pe => new PartEquipmentDTO
                {
                    Id = pe.Id,
                    RailwayCisternsId = pe.RailwayCisternsId,
                    Operation = pe.Operation,
                    EquipmentTypeId = pe.EquipmentTypeId,
                    DefectsId = pe.DefectsId,
                    AdminOwnerId = pe.AdminOwnerId,
                    PartsId = pe.PartsId,
                    JobDepotsId = pe.JobDepotsId,
                    JobDate = pe.JobDate,
                    JobTypeId = pe.JobTypeId,
                    ThicknessLeft = pe.ThicknessLeft,
                    ThicknessRight = pe.ThicknessRight,
                    TruckType = pe.TruckType,
                    Notes = pe.Notes,
                    DocumetnsId = pe.DocumetnsId,
                    DocumetnDate = pe.DocumetnDate,
                    DepotsId = pe.DepotsId,
                    RepairTypesId = pe.RepairTypesId,
                    EquipmentTypeName = pe.EquipmentType != null ? pe.EquipmentType.Name : null,
                    JobDepotName = pe.JobDepot.Name,
                    DepotName = pe.Depot != null ? pe.Depot.Name : null,
                    RepairTypeName = pe.RepairType.Name
                })
                .ToListAsync();

            var result = new PaginatedList<PartEquipmentDTO>
            {
                Items = equipments,
                PageNumber = parameters.PageNumber,
                TotalPages = totalPages,
                TotalCount = totalCount,
                PageSize = parameters.PageSize
            };

            return Results.Ok(result);
        })
        .WithName("GetPartEquipments")
        .Produces<PaginatedList<PartEquipmentDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);

        // Получение записи по ID
        group.MapGet("/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id) =>
        {
            var equipment = await context.PartEquipments
                .Include(pe => pe.EquipmentType)
                .Include(pe => pe.JobDepot)
                .Include(pe => pe.Depot)
                .Include(pe => pe.RepairType)
                .Where(pe => pe.Id == id)
                .Select(pe => new PartEquipmentDTO
                {
                    Id = pe.Id,
                    RailwayCisternsId = pe.RailwayCisternsId,
                    Operation = pe.Operation,
                    EquipmentTypeId = pe.EquipmentTypeId,
                    DefectsId = pe.DefectsId,
                    AdminOwnerId = pe.AdminOwnerId,
                    PartsId = pe.PartsId,
                    JobDepotsId = pe.JobDepotsId,
                    JobDate = pe.JobDate,
                    JobTypeId = pe.JobTypeId,
                    ThicknessLeft = pe.ThicknessLeft,
                    ThicknessRight = pe.ThicknessRight,
                    TruckType = pe.TruckType,
                    Notes = pe.Notes,
                    DocumetnsId = pe.DocumetnsId,
                    DocumetnDate = pe.DocumetnDate,
                    DepotsId = pe.DepotsId,
                    RepairTypesId = pe.RepairTypesId,
                    EquipmentTypeName = pe.EquipmentType != null ? pe.EquipmentType.Name : null,
                    JobDepotName = pe.JobDepot.Name,
                    DepotName = pe.Depot != null ? pe.Depot.Name : null,
                    RepairTypeName = pe.RepairType.Name
                })
                .FirstOrDefaultAsync();

            return equipment is null ? Results.NotFound() : Results.Ok(equipment);
        })
        .WithName("GetPartEquipmentById")
        .Produces<PartEquipmentDTO>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .RequirePermissions(Permission.Read);

        // Получение записей по цистерне
        group.MapGet("/by-cistern/{cisternId}", async (
            [FromServices] ApplicationDbContext context,
            Guid cisternId) =>
        {
            var equipments = await context.PartEquipments
                .Include(pe => pe.EquipmentType)
                .Include(pe => pe.JobDepot)
                .Include(pe => pe.Depot)
                .Include(pe => pe.RepairType)
                .Where(pe => pe.RailwayCisternsId == cisternId)
                .Select(pe => new PartEquipmentDTO
                {
                    Id = pe.Id,
                    RailwayCisternsId = pe.RailwayCisternsId,
                    Operation = pe.Operation,
                    EquipmentTypeId = pe.EquipmentTypeId,
                    DefectsId = pe.DefectsId,
                    AdminOwnerId = pe.AdminOwnerId,
                    PartsId = pe.PartsId,
                    JobDepotsId = pe.JobDepotsId,
                    JobDate = pe.JobDate,
                    JobTypeId = pe.JobTypeId,
                    ThicknessLeft = pe.ThicknessLeft,
                    ThicknessRight = pe.ThicknessRight,
                    TruckType = pe.TruckType,
                    Notes = pe.Notes,
                    DocumetnsId = pe.DocumetnsId,
                    DocumetnDate = pe.DocumetnDate,
                    DepotsId = pe.DepotsId,
                    RepairTypesId = pe.RepairTypesId,
                    EquipmentTypeName = pe.EquipmentType != null ? pe.EquipmentType.Name : null,
                    JobDepotName = pe.JobDepot.Name,
                    DepotName = pe.Depot != null ? pe.Depot.Name : null,
                    RepairTypeName = pe.RepairType.Name
                })
                .ToListAsync();

            return Results.Ok(equipments);
        })
        .WithName("GetPartEquipmentsByCistern")
        .Produces<List<PartEquipmentDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);

        // Получение последних значений оборудования по типам для цистерны
        group.MapGet("/last-by-cistern/{cisternId}", async (
            [FromServices] ApplicationDbContext context,
            Guid cisternId) =>
        {
            var lastEquipments = await context.PartEquipments
                .Include(pe => pe.EquipmentType)
                .Include(pe => pe.JobDepot)
                .Include(pe => pe.Depot)
                .Include(pe => pe.RepairType)
                .Where(pe => pe.RailwayCisternsId == cisternId && 
                           pe.Operation == 2 && 
                           pe.EquipmentType != null)
                .GroupBy(pe => new { pe.EquipmentTypeId, pe.EquipmentType.Name })
                .Select(group => new LastEquipmentDTO
                {
                    EquipmentTypeId = group.Key.EquipmentTypeId!.Value,
                    EquipmentTypeName = group.Key.Name,
                    LastEquipment = group
                        .OrderByDescending(pe => pe.DocumetnDate)
                        .Select(pe => new PartEquipmentDTO
                        {
                            Id = pe.Id,
                            RailwayCisternsId = pe.RailwayCisternsId,
                            Operation = pe.Operation,
                            EquipmentTypeId = pe.EquipmentTypeId,
                            DefectsId = pe.DefectsId,
                            AdminOwnerId = pe.AdminOwnerId,
                            PartsId = pe.PartsId,
                            JobDepotsId = pe.JobDepotsId,
                            JobDate = pe.JobDate,
                            JobTypeId = pe.JobTypeId,
                            ThicknessLeft = pe.ThicknessLeft,
                            ThicknessRight = pe.ThicknessRight,
                            TruckType = pe.TruckType,
                            Notes = pe.Notes,
                            DocumetnsId = pe.DocumetnsId,
                            DocumetnDate = pe.DocumetnDate,
                            DepotsId = pe.DepotsId,
                            RepairTypesId = pe.RepairTypesId,
                            EquipmentTypeName = pe.EquipmentType.Name,
                            JobDepotName = pe.JobDepot.Name,
                            DepotName = pe.Depot != null ? pe.Depot.Name : null,
                            RepairTypeName = pe.RepairType.Name
                        })
                        .First()
                })
                .ToListAsync();

            return Results.Ok(lastEquipments);
        })
        .WithName("GetLastPartEquipmentsByCistern")
        .Produces<List<LastEquipmentDTO>>(StatusCodes.Status200OK)
        .RequirePermissions(Permission.Read);
    }
}
