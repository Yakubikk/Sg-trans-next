using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class PartService
{
    private readonly BaseRepository<Part> _partRepository;

    public PartService(BaseRepository<Part> partRepository)
    {
        _partRepository = partRepository;
    }

    public async Task<IEnumerable<Part>> GetAllPartsAsync()
    {
        return await _partRepository.GetAllAsync();
    }

    public async Task<Part?> GetPartByIdAsync(Guid id)
    {
        return await _partRepository.GetByIdAsync(id);
    }

    public async Task<Part> CreatePartAsync(Part part)
    {
        part.Id = Guid.NewGuid();
        return await _partRepository.CreateAsync(part);
    }

    public async Task UpdatePartAsync(Part part)
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
