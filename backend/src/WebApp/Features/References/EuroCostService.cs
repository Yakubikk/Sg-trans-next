using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class EuroCostService
{
    private readonly BaseRepository<EuroCost> _euroCostRepository;

    public EuroCostService(BaseRepository<EuroCost> euroCostRepository)
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
