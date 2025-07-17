using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class CostService
{
    private readonly IBaseRepository<Cost> _costRepository;

    public CostService(ICostRepository costRepository)
    {
        _costRepository = costRepository;
    }

    public async Task<IEnumerable<Cost>> GetAllCostsAsync()
    {
        return await _costRepository.GetAllAsync();
    }

    public async Task<Cost?> GetCostByIdAsync(Guid id)
    {
        return await _costRepository.GetByIdAsync(id);
    }

    public async Task<Cost> CreateCostAsync(Cost cost)
    {
        cost.Id = Guid.NewGuid();
        return await _costRepository.CreateAsync(cost);
    }

    public async Task UpdateCostAsync(Cost cost)
    {
        await _costRepository.UpdateAsync(cost);
    }

    public async Task DeleteCostAsync(Guid id)
    {
        var cost = await _costRepository.GetByIdAsync(id);
        if (cost != null)
        {
            await _costRepository.DeleteAsync(cost);
        }
    }
}
