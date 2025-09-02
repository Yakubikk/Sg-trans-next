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
                    .ThenInclude(et => et.PartType)
                    .Include(pe => pe.JobDepot)
                    .Include(pe => pe.Depot)
                    .Include(pe => pe.RepairType)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Manufacturer)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Type)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Model)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Owner)
                    .Include(pe => pe.Part)
                    .ThenInclude(p => p.StampNumber)
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
                        Operation = pe.Operation,
                        DefectsId = pe.DefectsId,
                        AdminOwnerId = pe.AdminOwnerId,
                        JobDate = pe.JobDate,
                        JobTypeId = pe.JobTypeId,
                        ThicknessLeft = pe.ThicknessLeft,
                        ThicknessRight = pe.ThicknessRight,
                        TruckType = pe.TruckType,
                        Notes = pe.Notes,
                        DocumetnsId = pe.DocumetnsId,
                        DocumetnDate = pe.DocumetnDate,
                        RailwayCistern = pe.RailwayCistern != null
                            ? new RailwayCisternDTO
                            {
                                Id = pe.RailwayCistern.Id,
                                Number = pe.RailwayCistern.Number,
                                Model = pe.RailwayCistern.Model.Name,
                                Owner = pe.RailwayCistern.Owner.UNP,
                            }
                            : null,
                        EquipmentType = pe.EquipmentType != null
                            ? new EquipmentTypeDTO
                            {
                                Id = pe.EquipmentType.Id,
                                Name = pe.EquipmentType.Name,
                                Code = pe.EquipmentType.Code,
                                PartTypeId = pe.EquipmentType.PartTypeId,
                                PartTypeName = pe.EquipmentType.PartType.Name
                            }
                            : null,
                        JobDepot = pe.JobDepot != null
                            ? new DepotDTO
                            {
                                Id = pe.JobDepot.Id,
                                Name = pe.JobDepot.Name,
                                Code = pe.JobDepot.Code,
                                Location = pe.JobDepot.Location,
                                ShortName = pe.JobDepot.ShortName
                            }
                            : null,
                        Depot = pe.Depot != null
                            ? new DepotDTO
                            {
                                Id = pe.Depot.Id,
                                Name = pe.Depot.Name,
                                Code = pe.Depot.Code,
                                Location = pe.Depot.Location,
                                ShortName = pe.Depot.ShortName
                            }
                            : null,
                        RepairType = pe.RepairType != null
                            ? new RepairTypeDTO
                            {
                                Id = pe.RepairType.Id,
                                Name = pe.RepairType.Name,
                                Code = pe.RepairType.Code,
                                Description = pe.RepairType.Description
                            }
                            : null,
                        Part = pe.Part != null
                            ? new PartInfoDTO
                            {
                                PartId = pe.Part.Id,
                                SerialNumber = pe.Part.SerialNumber,
                                ManufactureYear = pe.Part.ManufactureYear,
                                StampInfo = pe.Part.StampNumber != null
                                    ? new StampInfoDTO
                                    {
                                        Value = pe.Part.StampNumber.Value
                                    }
                                    : null
                            }
                            : null
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
                    .ThenInclude(et => et.PartType)
                    .Include(pe => pe.JobDepot)
                    .Include(pe => pe.Depot)
                    .Include(pe => pe.RepairType)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Manufacturer)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Type)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Model)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Owner)
                    .Include(pe => pe.Part)
                    .ThenInclude(p => p.StampNumber)
                    .Where(pe => pe.Id == id)
                    .Select(pe => new PartEquipmentDTO
                    {
                        Id = pe.Id,
                        Operation = pe.Operation,
                        DefectsId = pe.DefectsId,
                        AdminOwnerId = pe.AdminOwnerId,
                        JobDate = pe.JobDate,
                        JobTypeId = pe.JobTypeId,
                        ThicknessLeft = pe.ThicknessLeft,
                        ThicknessRight = pe.ThicknessRight,
                        TruckType = pe.TruckType,
                        Notes = pe.Notes,
                        DocumetnsId = pe.DocumetnsId,
                        DocumetnDate = pe.DocumetnDate,
                        RailwayCistern = pe.RailwayCistern != null
                            ? new RailwayCisternDTO
                            {
                                Id = pe.RailwayCistern.Id,
                                Number = pe.RailwayCistern.Number,
                                Model = pe.RailwayCistern.Model.Name,
                                Owner = pe.RailwayCistern.Owner.UNP,
                            }
                            : null,
                        EquipmentType = pe.EquipmentType != null
                            ? new EquipmentTypeDTO
                            {
                                Id = pe.EquipmentType.Id,
                                Name = pe.EquipmentType.Name,
                                Code = pe.EquipmentType.Code,
                                PartTypeId = pe.EquipmentType.PartTypeId,
                                PartTypeName = pe.EquipmentType.PartType.Name
                            }
                            : null,
                        JobDepot = pe.JobDepot != null
                            ? new DepotDTO
                            {
                                Id = pe.JobDepot.Id,
                                Name = pe.JobDepot.Name,
                                Code = pe.JobDepot.Code,
                                Location = pe.JobDepot.Location,
                                ShortName = pe.JobDepot.ShortName
                            }
                            : null,
                        Depot = pe.Depot != null
                            ? new DepotDTO
                            {
                                Id = pe.Depot.Id,
                                Name = pe.Depot.Name,
                                Code = pe.Depot.Code,
                                Location = pe.Depot.Location,
                                ShortName = pe.Depot.ShortName
                            }
                            : null,
                        RepairType = pe.RepairType != null
                            ? new RepairTypeDTO
                            {
                                Id = pe.RepairType.Id,
                                Name = pe.RepairType.Name,
                                Code = pe.RepairType.Code,
                                Description = pe.RepairType.Description
                            }
                            : null,
                        Part = pe.Part != null
                            ? new PartInfoDTO
                            {
                                PartId = pe.Part.Id,
                                SerialNumber = pe.Part.SerialNumber,
                                ManufactureYear = pe.Part.ManufactureYear,
                                StampInfo = pe.Part.StampNumber != null
                                    ? new StampInfoDTO
                                    {
                                        Value = pe.Part.StampNumber.Value
                                    }
                                    : null
                            }
                            : null
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
                    .ThenInclude(et => et.PartType)
                    .Include(pe => pe.JobDepot)
                    .Include(pe => pe.Depot)
                    .Include(pe => pe.RepairType)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Manufacturer)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Type)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Model)
                    .Include(pe => pe.RailwayCistern)
                    .ThenInclude(rc => rc.Owner)
                    .Include(pe => pe.Part)
                    .ThenInclude(p => p.StampNumber)
                    .Where(pe => pe.RailwayCisternsId == cisternId)
                    .Select(pe => new PartEquipmentDTO
                    {
                        Id = pe.Id,
                        Operation = pe.Operation,
                        DefectsId = pe.DefectsId,
                        AdminOwnerId = pe.AdminOwnerId,
                        JobDate = pe.JobDate,
                        JobTypeId = pe.JobTypeId,
                        ThicknessLeft = pe.ThicknessLeft,
                        ThicknessRight = pe.ThicknessRight,
                        TruckType = pe.TruckType,
                        Notes = pe.Notes,
                        DocumetnsId = pe.DocumetnsId,
                        DocumetnDate = pe.DocumetnDate,
                        RailwayCistern = pe.RailwayCistern != null
                            ? new RailwayCisternDTO
                            {
                                Id = pe.RailwayCistern.Id,
                                Number = pe.RailwayCistern.Number,
                                Model = pe.RailwayCistern.Model.Name,
                                Owner = pe.RailwayCistern.Owner.UNP,
                            }
                            : null,
                        EquipmentType = pe.EquipmentType != null
                            ? new EquipmentTypeDTO
                            {
                                Id = pe.EquipmentType.Id,
                                Name = pe.EquipmentType.Name,
                                Code = pe.EquipmentType.Code,
                                PartTypeId = pe.EquipmentType.PartTypeId,
                                PartTypeName = pe.EquipmentType.PartType.Name
                            }
                            : null,
                        JobDepot = pe.JobDepot != null
                            ? new DepotDTO
                            {
                                Id = pe.JobDepot.Id,
                                Name = pe.JobDepot.Name,
                                Code = pe.JobDepot.Code,
                                Location = pe.JobDepot.Location,
                                ShortName = pe.JobDepot.ShortName
                            }
                            : null,
                        Depot = pe.Depot != null
                            ? new DepotDTO
                            {
                                Id = pe.Depot.Id,
                                Name = pe.Depot.Name,
                                Code = pe.Depot.Code,
                                Location = pe.Depot.Location,
                                ShortName = pe.Depot.ShortName
                            }
                            : null,
                        RepairType = pe.RepairType != null
                            ? new RepairTypeDTO
                            {
                                Id = pe.RepairType.Id,
                                Name = pe.RepairType.Name,
                                Code = pe.RepairType.Code,
                                Description = pe.RepairType.Description
                            }
                            : null,
                        Part = pe.Part != null
                            ? new PartInfoDTO
                            {
                                PartId = pe.Part.Id,
                                SerialNumber = pe.Part.SerialNumber,
                                ManufactureYear = pe.Part.ManufactureYear,
                                StampInfo = pe.Part.StampNumber != null
                                    ? new StampInfoDTO
                                    {
                                        Value = pe.Part.StampNumber.Value
                                    }
                                    : null
                            }
                            : null
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
                    .Include(pe => pe.Part)
                    .ThenInclude(p => p.StampNumber)
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
                                Operation = pe.Operation,
                                DefectsId = pe.DefectsId,
                                AdminOwnerId = pe.AdminOwnerId,
                                JobDate = pe.JobDate,
                                JobTypeId = pe.JobTypeId,
                                ThicknessLeft = pe.ThicknessLeft,
                                ThicknessRight = pe.ThicknessRight,
                                TruckType = pe.TruckType,
                                Notes = pe.Notes,
                                DocumetnsId = pe.DocumetnsId,
                                DocumetnDate = pe.DocumetnDate,
                                RailwayCistern = pe.RailwayCistern != null
                                    ? new RailwayCisternDTO
                                    {
                                        Id = pe.RailwayCistern.Id,
                                        Number = pe.RailwayCistern.Number,
                                        Model = pe.RailwayCistern.Model.Name,
                                        Owner = pe.RailwayCistern.Owner.UNP,
                                    }
                                    : null,
                                EquipmentType = pe.EquipmentType != null
                                    ? new EquipmentTypeDTO
                                    {
                                        Id = pe.EquipmentType.Id,
                                        Name = pe.EquipmentType.Name,
                                        Code = pe.EquipmentType.Code,
                                        PartTypeId = pe.EquipmentType.PartTypeId,
                                        PartTypeName = pe.EquipmentType.PartType.Name
                                    }
                                    : null,
                                JobDepot = pe.JobDepot != null
                                    ? new DepotDTO
                                    {
                                        Id = pe.JobDepot.Id,
                                        Name = pe.JobDepot.Name,
                                        Code = pe.JobDepot.Code,
                                        Location = pe.JobDepot.Location,
                                        ShortName = pe.JobDepot.ShortName
                                    }
                                    : null,
                                Depot = pe.Depot != null
                                    ? new DepotDTO
                                    {
                                        Id = pe.Depot.Id,
                                        Name = pe.Depot.Name,
                                        Code = pe.Depot.Code,
                                        Location = pe.Depot.Location,
                                        ShortName = pe.Depot.ShortName
                                    }
                                    : null,
                                RepairType = pe.RepairType != null
                                    ? new RepairTypeDTO
                                    {
                                        Id = pe.RepairType.Id,
                                        Name = pe.RepairType.Name,
                                        Code = pe.RepairType.Code,
                                        Description = pe.RepairType.Description
                                    }
                                    : null,
                                Part = pe.Part != null
                                    ? new PartInfoDTO
                                    {
                                        PartId = pe.Part.Id,
                                        SerialNumber = pe.Part.SerialNumber,
                                        ManufactureYear = pe.Part.ManufactureYear,
                                        StampInfo = pe.Part.StampNumber != null
                                            ? new StampInfoDTO
                                            {
                                                Value = pe.Part.StampNumber.Value
                                            }
                                            : null
                                    }
                                    : null
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