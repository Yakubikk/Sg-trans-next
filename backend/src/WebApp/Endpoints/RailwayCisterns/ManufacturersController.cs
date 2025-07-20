// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using WebApp.Data;
// using WebApp.DTO;
//
// namespace WebApp.Endpoints.RailwayCisterns;
//
// [Route("api/[controller]")]
// [ApiController]
// [Authorize]
// public class ManufacturersController(ApplicationDbContext context) : ControllerBase
// {
//
//     // GET: api/Manufacturers
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<ManufacturerResponse>>> GetManufacturers()
//     {
//         var manufacturers = await context.Manufacturers.ToListAsync();
//         return manufacturers.Select(m => new ManufacturerResponse
//         {
//             Id = m.Id,
//             Name = m.Name,
//             Country = m.GetCountryInfo(),
//             CreatedAt = m.CreatedAt,
//             UpdatedAt = m.UpdatedAt,
//             CreatorId = m.CreatorId
//         }).ToList();
//     }
//
//     [HttpGet("{id:guid}")]
//     public async Task<ActionResult<ManufacturerDetailResponse>> GetManufacturer(Guid id)
//     {
//         var manufacturer = await context.Manufacturers
//             .Include(m => m.RailwayCisterns)
//             .FirstOrDefaultAsync(m => m.Id == id);
//
//         if (manufacturer == null)
//         {
//             return NotFound();
//         }
//
//         return new ManufacturerDetailResponse
//         {
//             Id = manufacturer.Id,
//             Name = manufacturer.Name,
//             Country = manufacturer.GetCountryInfo(),
//             CreatedAt = manufacturer.CreatedAt,
//             UpdatedAt = manufacturer.UpdatedAt,
//             CreatorId = manufacturer.CreatorId,
//             Wagons = manufacturer.RailwayCisterns
//                 .Select(w => new RailwayCisternSummaryResponse
//                 {
//                     Id = w.Id,
//                     Number = w.Number
//                 }).ToList()
//         };
//     }
// }