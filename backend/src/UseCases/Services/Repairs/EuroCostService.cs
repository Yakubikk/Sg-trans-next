using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class EuroCostService
{
    private readonly IBaseRepository<EuroCost> _euroCostRepository;

    public EuroCostService(IEuroCostRepository euroCostRepository)
    {
        _euroCostRepository = euroCostRepository;
    }

    public async Task<IEnumerable<EuroCost>> GetAllEuroCostsAsync()
    {
        return await _euroCostRepository.GetAllAsync();
    }

    public async Task<EuroCost?> GetEuroCostByIdAsync(Guid id)
    {
        return await _euroCostRepository.GetByIdAsync(id);
    }

    public async Task<EuroCost> CreateEuroCostAsync(EuroCost euroCost)
    {
        euroCost.Id = Guid.NewGuid();
        return await _euroCostRepository.CreateAsync(euroCost);
    }

    public async Task UpdateEuroCostAsync(EuroCost euroCost)
    {
        await _euroCostRepository.UpdateAsync(euroCost);
    }

    public async Task DeleteEuroCostAsync(Guid id)
    {
        var euroCost = await _euroCostRepository.GetByIdAsync(id);
        if (euroCost != null)
        {
            await _euroCostRepository.DeleteAsync(euroCost);
        }
    }
}
