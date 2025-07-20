using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class PartService
{
    private readonly BaseRepository<PartReference> _partRepository;

    public PartService(BaseRepository<PartReference> partRepository)
    {
        _partRepository = partRepository;
    }

    public async Task<IEnumerable<PartReference>> GetAllPartsAsync()
    {
        return await _partRepository.GetAllAsync();
    }

    public async Task<PartReference?> GetPartByIdAsync(Guid id)
    {
        return await _partRepository.GetByIdAsync(id);
    }

    public async Task<PartReference> CreatePartAsync(PartReference part)
    {
        part.Id = Guid.NewGuid();
        return await _partRepository.CreateAsync(part);
    }

    public async Task UpdatePartAsync(PartReference part)
    {
        await _partRepository.UpdateAsync(part);
    }

    public async Task DeletePartAsync(Guid id)
    {
        var part = await _partRepository.GetByIdAsync(id);
        if (part != null)
        {
            await _partRepository.DeleteAsync(part);
        }
    }
}
