using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class RailwayService
{
    private readonly IBaseRepository<Railway> _railwayRepository;

    public RailwayService(IRailwayRepository railwayRepository)
    {
        _railwayRepository = railwayRepository;
    }

    public async Task<IEnumerable<Railway>> GetAllRailwaysAsync()
    {
        return await _railwayRepository.GetAllAsync();
    }

    public async Task<Railway?> GetRailwayByIdAsync(Guid id)
    {
        return await _railwayRepository.GetByIdAsync(id);
    }

    public async Task<Railway> CreateRailwayAsync(Railway railway)
    {
        railway.Id = Guid.NewGuid();
        return await _railwayRepository.CreateAsync(railway);
    }

    public async Task UpdateRailwayAsync(Railway railway)
    {
        await _railwayRepository.UpdateAsync(railway);
    }

    public async Task DeleteRailwayAsync(Guid id)
    {
        var railway = await _railwayRepository.GetByIdAsync(id);
        if (railway != null)
        {
            await _railwayRepository.DeleteAsync(railway);
        }
    }
}
