using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Enums;
using WebApp.DTO.RailwayCisterns;
using WebApp.Extensions;

namespace WebApp.Endpoints.RailwayCisterns;

public static class PartsEndpoints
{
    public static void MapPartsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/parts")
            .RequireAuthorization()
            .WithTags("parts");

        // Получение всех деталей
        group.MapGet("/", async ([FromServices] ApplicationDbContext context) =>
        {
            var parts = await context.Parts
                .Include(p => p.PartType)
                .Include(p => p.Status)
                .Include(p => p.StampNumber)
                .Include(p => p.WheelPair)
                .Include(p => p.SideFrame)
                .Include(p => p.Bolster)
                .Include(p => p.Coupler)
                .Include(p => p.ShockAbsorber)
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
        .RequirePermissions(Permission.Read);

        // Получение детали по ID
        group.MapGet("/{id}", async ([FromServices] ApplicationDbContext context, Guid id) =>
        {
            var part = await context.Parts
                .Include(p => p.PartType)
                .Include(p => p.Status)
                .Include(p => p.StampNumber)
                .Include(p => p.WheelPair)
                .Include(p => p.SideFrame)
                .Include(p => p.Bolster)
                .Include(p => p.Coupler)
                .Include(p => p.ShockAbsorber)
                .Where(p => p.Id == id)
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
                .FirstOrDefaultAsync();

            return part == null ? Results.NotFound() : Results.Ok(part);
        })
        .RequirePermissions(Permission.Read);

        // Создание колесной пары
        group.MapPost("/wheel-pairs", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateWheelPairDTO dto,
            HttpContext httpContext) =>
        {
            var part = new Part
            {
                PartTypeId = dto.PartTypeId,
                DepotId = dto.DepotId,
                StampNumberId = dto.StampNumberId,
                SerialNumber = dto.SerialNumber,
                ManufactureYear = dto.ManufactureYear,
                CurrentLocation = dto.CurrentLocation,
                StatusId = dto.StatusId,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(httpContext.User.FindFirstValue("userId"))
            };

            var wheelPair = new WheelPair
            {
                Part = part,
                ThicknessLeft = dto.ThicknessLeft,
                ThicknessRight = dto.ThicknessRight,
                WheelType = dto.WheelType
            };

            context.Add(part);
            context.Add(wheelPair);
            await context.SaveChangesAsync();

            return Results.Created($"/api/parts/{part.Id}", part.Id);
        })
        .RequirePermissions(Permission.Create);

        // Создание боковой рамы
        group.MapPost("/side-frames", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateSideFrameDTO dto,
            HttpContext httpContext) =>
        {
            var part = new Part
            {
                PartTypeId = dto.PartTypeId,
                DepotId = dto.DepotId,
                StampNumberId = dto.StampNumberId,
                SerialNumber = dto.SerialNumber,
                ManufactureYear = dto.ManufactureYear,
                CurrentLocation = dto.CurrentLocation,
                StatusId = dto.StatusId,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(httpContext.User.FindFirstValue("userId"))
            };

            var sideFrame = new SideFrame
            {
                Part = part,
                ServiceLifeYears = dto.ServiceLifeYears,
                ExtendedUntil = dto.ExtendedUntil
            };

            context.Add(part);
            context.Add(sideFrame);
            await context.SaveChangesAsync();

            return Results.Created($"/api/parts/{part.Id}", part.Id);
        })
        .RequirePermissions(Permission.Create);

        // Создание надрессорной балки
        group.MapPost("/bolsters", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateBolsterDTO dto,
            HttpContext httpContext) =>
        {
            var part = new Part
            {
                PartTypeId = dto.PartTypeId,
                DepotId = dto.DepotId,
                StampNumberId = dto.StampNumberId,
                SerialNumber = dto.SerialNumber,
                ManufactureYear = dto.ManufactureYear,
                CurrentLocation = dto.CurrentLocation,
                StatusId = dto.StatusId,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(httpContext.User.FindFirstValue("userId"))
            };

            var bolster = new Bolster
            {
                Part = part,
                ServiceLifeYears = dto.ServiceLifeYears,
                ExtendedUntil = dto.ExtendedUntil
            };

            context.Add(part);
            context.Add(bolster);
            await context.SaveChangesAsync();

            return Results.Created($"/api/parts/{part.Id}", part.Id);
        })
        .RequirePermissions(Permission.Create);

        // Создание автосцепки
        group.MapPost("/couplers", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateCouplerDTO dto,
            HttpContext httpContext) =>
        {
            var part = new Part
            {
                PartTypeId = dto.PartTypeId,
                DepotId = dto.DepotId,
                StampNumberId = dto.StampNumberId,
                SerialNumber = dto.SerialNumber,
                ManufactureYear = dto.ManufactureYear,
                CurrentLocation = dto.CurrentLocation,
                StatusId = dto.StatusId,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(httpContext.User.FindFirstValue("userId"))
            };

            var coupler = new Coupler
            {
                Part = part
            };

            context.Add(part);
            context.Add(coupler);
            await context.SaveChangesAsync();

            return Results.Created($"/api/parts/{part.Id}", part.Id);
        })
        .RequirePermissions(Permission.Create);

        // Создание поглощающего аппарата
        group.MapPost("/shock-absorbers", async (
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateShockAbsorberDTO dto,
            HttpContext httpContext) =>
        {
            var part = new Part
            {
                PartTypeId = dto.PartTypeId,
                DepotId = dto.DepotId,
                StampNumberId = dto.StampNumberId,
                SerialNumber = dto.SerialNumber,
                ManufactureYear = dto.ManufactureYear,
                CurrentLocation = dto.CurrentLocation,
                StatusId = dto.StatusId,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(httpContext.User.FindFirstValue("userId"))
            };

            var shockAbsorber = new ShockAbsorber
            {
                Part = part,
                Model = dto.Model,
                ManufacturerCode = dto.ManufacturerCode,
                NextRepairDate = dto.NextRepairDate,
                ServiceLifeYears = dto.ServiceLifeYears
            };

            context.Add(part);
            context.Add(shockAbsorber);
            await context.SaveChangesAsync();

            return Results.Created($"/api/parts/{part.Id}", part.Id);
        })
        .RequirePermissions(Permission.Create);

        // Обновление колесной пары
        group.MapPut("/wheel-pairs/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateWheelPairDTO dto) =>
        {
            var part = await context.Parts
                .Include(p => p.WheelPair)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null || part.WheelPair == null)
                return Results.NotFound();

            // Обновляем основную часть
            part.DepotId = dto.DepotId;
            part.StampNumberId = dto.StampNumberId;
            part.SerialNumber = dto.SerialNumber;
            part.ManufactureYear = dto.ManufactureYear;
            part.CurrentLocation = dto.CurrentLocation;
            part.StatusId = dto.StatusId;
            part.Notes = dto.Notes;
            part.UpdatedAt = DateTime.UtcNow;

            // Обновляем специфичные поля
            part.WheelPair.ThicknessLeft = dto.ThicknessLeft;
            part.WheelPair.ThicknessRight = dto.ThicknessRight;
            part.WheelPair.WheelType = dto.WheelType;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Обновление боковой рамы
        group.MapPut("/side-frames/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateSideFrameDTO dto) =>
        {
            var part = await context.Parts
                .Include(p => p.SideFrame)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null || part.SideFrame == null)
                return Results.NotFound();

            part.DepotId = dto.DepotId;
            part.StampNumberId = dto.StampNumberId;
            part.SerialNumber = dto.SerialNumber;
            part.ManufactureYear = dto.ManufactureYear;
            part.CurrentLocation = dto.CurrentLocation;
            part.StatusId = dto.StatusId;
            part.Notes = dto.Notes;
            part.UpdatedAt = DateTime.UtcNow;

            part.SideFrame.ServiceLifeYears = dto.ServiceLifeYears;
            part.SideFrame.ExtendedUntil = dto.ExtendedUntil;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Обновление надрессорной балки
        group.MapPut("/bolsters/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateBolsterDTO dto) =>
        {
            var part = await context.Parts
                .Include(p => p.Bolster)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null || part.Bolster == null)
                return Results.NotFound();

            part.DepotId = dto.DepotId;
            part.StampNumberId = dto.StampNumberId;
            part.SerialNumber = dto.SerialNumber;
            part.ManufactureYear = dto.ManufactureYear;
            part.CurrentLocation = dto.CurrentLocation;
            part.StatusId = dto.StatusId;
            part.Notes = dto.Notes;
            part.UpdatedAt = DateTime.UtcNow;

            part.Bolster.ServiceLifeYears = dto.ServiceLifeYears;
            part.Bolster.ExtendedUntil = dto.ExtendedUntil;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Обновление автосцепки
        group.MapPut("/couplers/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateCouplerDTO dto) =>
        {
            var part = await context.Parts
                .Include(p => p.Coupler)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null || part.Coupler == null)
                return Results.NotFound();

            part.DepotId = dto.DepotId;
            part.StampNumberId = dto.StampNumberId;
            part.SerialNumber = dto.SerialNumber;
            part.ManufactureYear = dto.ManufactureYear;
            part.CurrentLocation = dto.CurrentLocation;
            part.StatusId = dto.StatusId;
            part.Notes = dto.Notes;
            part.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Обновление поглощающего аппарата
        group.MapPut("/shock-absorbers/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id,
            [FromBody] UpdateShockAbsorberDTO dto) =>
        {
            var part = await context.Parts
                .Include(p => p.ShockAbsorber)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (part == null || part.ShockAbsorber == null)
                return Results.NotFound();

            part.DepotId = dto.DepotId;
            part.StampNumberId = dto.StampNumberId;
            part.SerialNumber = dto.SerialNumber;
            part.ManufactureYear = dto.ManufactureYear;
            part.CurrentLocation = dto.CurrentLocation;
            part.StatusId = dto.StatusId;
            part.Notes = dto.Notes;
            part.UpdatedAt = DateTime.UtcNow;

            part.ShockAbsorber.Model = dto.Model;
            part.ShockAbsorber.ManufacturerCode = dto.ManufacturerCode;
            part.ShockAbsorber.NextRepairDate = dto.NextRepairDate;
            part.ShockAbsorber.ServiceLifeYears = dto.ServiceLifeYears;

            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        // Удаление детали
        group.MapDelete("/{id}", async (
            [FromServices] ApplicationDbContext context,
            Guid id) =>
        {
            var part = await context.Parts.FindAsync(id);
            if (part == null)
                return Results.NotFound();

            context.Parts.Remove(part);
            await context.SaveChangesAsync();
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
