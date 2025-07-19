using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class DepotService
{
    private readonly BaseRepository<Depot> _depotRepository;

    public DepotService(BaseRepository<Depot> depotRepository)
    {
        _depotRepository = depotRepository;
    }

    public async Task<IEnumerable<Depot>> GetAllDepotsAsync()
    {
        return await _depotRepository.GetAllAsync();
    }

    public async Task<Depot?> GetDepotByIdAsync(Guid id)
    {
        return await _depotRepository.GetByIdAsync(id);
    }

    public async Task<Depot> CreateDepotAsync(Depot depot)
    {
        depot.Id = Guid.NewGuid();
        return await _depotRepository.CreateAsync(depot);
    }

    public async Task UpdateDepotAsync(Depot depot)
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
