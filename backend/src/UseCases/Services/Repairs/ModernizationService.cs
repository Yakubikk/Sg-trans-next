using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class ModernizationService
{
    private readonly IBaseRepository<Modernization> _modernizationRepository;

    public ModernizationService(IModernizationRepository modernizationRepository)
    {
        _modernizationRepository = modernizationRepository;
    }

    public async Task<IEnumerable<Modernization>> GetAllModernizationsAsync()
    {
        return await _modernizationRepository.GetAllAsync();
    }

    public async Task<Modernization?> GetModernizationByIdAsync(Guid id)
    {
        return await _modernizationRepository.GetByIdAsync(id);
    }

    public async Task<Modernization> CreateModernizationAsync(Modernization modernization)
    {
        modernization.Id = Guid.NewGuid();
        return await _modernizationRepository.CreateAsync(modernization);
    }

    public async Task UpdateModernizationAsync(Modernization modernization)
    {
        await _modernizationRepository.UpdateAsync(modernization);
    }

    public async Task DeleteModernizationAsync(Guid id)
    {
        var modernization = await _modernizationRepository.GetByIdAsync(id);
        if (modernization != null)
        {
            await _modernizationRepository.DeleteAsync(modernization);
        }
    }
}
