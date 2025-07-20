using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class DepotService
{
    private readonly BaseRepository<DepotReference> _depotRepository;

    public DepotService(BaseRepository<DepotReference> depotRepository)
    {
        _depotRepository = depotRepository;
    }

    public async Task<IEnumerable<DepotReference>> GetAllDepotsAsync()
    {
        return await _depotRepository.GetAllAsync();
    }

    public async Task<DepotReference?> GetDepotByIdAsync(Guid id)
    {
        return await _depotRepository.GetByIdAsync(id);
    }

    public async Task<DepotReference> CreateDepotAsync(DepotReference depot)
    {
        depot.Id = Guid.NewGuid();
        return await _depotRepository.CreateAsync(depot);
    }

    public async Task UpdateDepotAsync(DepotReference depot)
    {
        await _depotRepository.UpdateAsync(depot);
    }

    public async Task DeleteDepotAsync(Guid id)
    {
        var depot = await _depotRepository.GetByIdAsync(id);
        if (depot != null)
        {
            await _depotRepository.DeleteAsync(depot);
        }
    }
}
