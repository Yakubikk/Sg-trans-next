using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class RailwayService
{
    private readonly BaseRepository<Railway> _railwayRepository;

    public RailwayService(BaseRepository<Railway> railwayRepository)
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
