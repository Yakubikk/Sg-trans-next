using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class DepotService
{
    private readonly IBaseRepository<Depot> _depotRepository;

    public DepotService(IDepotRepository depotRepository)
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
