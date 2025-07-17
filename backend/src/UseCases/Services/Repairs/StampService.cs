using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class StampService
{
    private readonly IBaseRepository<Stamp> _stampRepository;

    public StampService(IStampRepository stampRepository)
    {
        _stampRepository = stampRepository;
    }

    public async Task<IEnumerable<Stamp>> GetAllStampsAsync()
    {
        return await _stampRepository.GetAllAsync();
    }

    public async Task<Stamp?> GetStampByIdAsync(Guid id)
    {
        return await _stampRepository.GetByIdAsync(id);
    }

    public async Task<Stamp> CreateStampAsync(Stamp stamp)
    {
        stamp.Id = Guid.NewGuid();
        return await _stampRepository.CreateAsync(stamp);
    }

    public async Task UpdateStampAsync(Stamp stamp)
    {
        await _stampRepository.UpdateAsync(stamp);
    }

    public async Task DeleteStampAsync(Guid id)
    {
        var stamp = await GetStampByIdAsync(id);
        if (stamp != null)
        {
            await _stampRepository.DeleteAsync(stamp);
        }
    }
}
