using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class WagonService
{
    private readonly IBaseRepository<Wagon> _wagonRepository;

    public WagonService(IWagonRepository wagonRepository)
    {
        _wagonRepository = wagonRepository;
    }

    public async Task<IEnumerable<Wagon>> GetAllWagonsAsync()
    {
        return await _wagonRepository.GetAllAsync();
    }

    public async Task<Wagon?> GetWagonByIdAsync(Guid id)
    {
        return await _wagonRepository.GetByIdAsync(id);
    }

    public async Task<Wagon> CreateWagonAsync(Wagon wagon)
    {
        wagon.Id = Guid.NewGuid();
        return await _wagonRepository.CreateAsync(wagon);
    }

    public async Task UpdateWagonAsync(Wagon wagon)
    {
        await _wagonRepository.UpdateAsync(wagon);
    }

    public async Task DeleteWagonAsync(Guid id)
    {
        var wagon = await _wagonRepository.GetByIdAsync(id);
        if (wagon != null)
        {
            await _wagonRepository.DeleteAsync(wagon);
        }
    }
}

