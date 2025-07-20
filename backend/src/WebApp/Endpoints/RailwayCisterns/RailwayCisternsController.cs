// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using WebApp.Data;
// using WebApp.Data.Entities.RailwayCisterns;
// using WebApp.DTO;
//
// namespace WebApp.Endpoints.RailwayCisterns;
//
// [Route("api/[controller]")]
// [ApiController]
// [Authorize]
// public class RailwayCisternsController(ApplicationDbContext context) : ControllerBase
// {
//     
//     // GET: api/RailwayCisterns
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<RailwayCisternResponse>>> GetRailwayCisterns()
//     {
//         var railwayCisterns = await context.RailwayCisterns
//             .Include(r => r.Manufacturer)
//             .Include(r => r.Type)
//             .Include(r => r.Model)
//             .Include(r => r.Registrar)
//             .Include(r => r.Vessel)
//             .ToListAsync();
//             
//         return railwayCisterns.Select(MapToResponse).ToList();
//     }
//
//     // GET: api/RailwayCisterns/5
//     [HttpGet("{id:guid}")]
//     public async Task<ActionResult<RailwayCisternDetailResponse>> GetRailwayCistern(Guid id)
//     {
//         var railwayCistern = await context.RailwayCisterns
//             .Include(r => r.Manufacturer)
//             .Include(r => r.Type)
//             .Include(r => r.Model)
//             .Include(r => r.Registrar)
//             .Include(r => r.Vessel)
//             .Include(r => r.PartInstallations)
//                 .ThenInclude(pi => pi.Part)
//             .Include(r => r.PartInstallations)
//                 .ThenInclude(pi => pi.FromLocation)
//             .Include(r => r.PartInstallations)
//                 .ThenInclude(pi => pi.ToLocation)
//             .FirstOrDefaultAsync(r => r.Id == id);
//
//         if (railwayCistern == null)
//         {
//             return NotFound();
//         }
//
//         return MapToDetailResponse(railwayCistern);
//     }
//
//     private static RailwayCisternResponse MapToResponse(RailwayCistern railwayCistern)
//     {
//         return new RailwayCisternResponse
//         {
//             Id = railwayCistern.Id,
//             Number = railwayCistern.Number,
//             ManufacturerId = railwayCistern.ManufacturerId,
//             ManufacturerName = railwayCistern.Manufacturer.Name,
//             ManufacturerCountry = railwayCistern.Manufacturer.Country,
//             BuildDate = railwayCistern.BuildDate,
//             TareWeight = railwayCistern.TareWeight,
//             LoadCapacity = railwayCistern.LoadCapacity,
//             Length = railwayCistern.Length,
//             AxleCount = railwayCistern.AxleCount,
//             Volume = railwayCistern.Volume,
//             FillingVolume = railwayCistern.FillingVolume,
//             InitialTareWeight = railwayCistern.InitialTareWeight,
//             TypeId = railwayCistern.TypeId,
//             TypeName = railwayCistern.Type?.Name ?? string.Empty,
//             ModelId = railwayCistern.ModelId,
//             ModelName = railwayCistern.Model?.Name,
//             CommissioningDate = railwayCistern.CommissioningDate,
//             SerialNumber = railwayCistern.SerialNumber,
//             RegistrationNumber = railwayCistern.RegistrationNumber,
//             RegistrationDate = railwayCistern.RegistrationDate,
//             RegistrarId = railwayCistern.RegistrarId,
//             RegistrarName = railwayCistern.Registrar?.Name,
//             Notes = railwayCistern.Notes,
//             CreatedAt = railwayCistern.CreatedAt,
//             UpdatedAt = railwayCistern.UpdatedAt,
//             CreatorId = railwayCistern.CreatorId,
//             Vessel = railwayCistern.Vessel != null ? new VesselResponse
//             {
//                 Id = railwayCistern.Vessel.Id,
//                 VesselSerialNumber = railwayCistern.Vessel.VesselSerialNumber,
//                 VesselBuildDate = railwayCistern.Vessel.VesselBuildDate
//             } : null
//         };
//     }
//
//     private static RailwayCisternDetailResponse MapToDetailResponse(RailwayCistern railwayCistern)
//     {
//         // Создаем детальный ответ, наследуя все свойства из базового ответа
//         var detailResponse = new RailwayCisternDetailResponse();
//         
//         // Копируем все свойства из базового ответа
//         var baseResponse = MapToResponse(railwayCistern);
//         typeof(RailwayCisternResponse).GetProperties().ToList()
//             .ForEach(prop => prop.SetValue(detailResponse, prop.GetValue(baseResponse)));
//         
//         // Добавляем информацию об установленных деталях
//         detailResponse.PartInstallations = railwayCistern.PartInstallations.Select(pi => 
//             new PartInstallationResponse
//             {
//                 InstallationId = pi.Id,
//                 PartId = pi.PartId,
//                 PartName = pi.Part?.StampNumber ?? string.Empty,
//                 PartType = pi.Part?.PartType ?? PartType.WheelPair,
//                 InstalledAt = pi.InstalledAt,
//                 InstalledBy = pi.InstalledBy,
//                 RemovedAt = pi.RemovedAt,
//                 RemovedBy = pi.RemovedBy,
//                 LocationFrom = pi.FromLocation?.Name ?? string.Empty,
//                 LocationTo = pi.ToLocation.Name,
//                 Notes = pi.Notes
//             }).ToList();
//             
//         return detailResponse;
//     }
// }
