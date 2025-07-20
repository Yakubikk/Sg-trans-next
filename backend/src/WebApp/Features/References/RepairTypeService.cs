using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class RepairTypeService
{
    private readonly BaseRepository<RepairTypeReference> _repairTypeRepository;

    public RepairTypeService(BaseRepository<RepairTypeReference> repairTypeRepository)
    {
        _repairTypeRepository = repairTypeRepository;
    }

    public async Task<IEnumerable<RepairTypeReference>> GetAllRepairTypesAsync()
    {
        return await _repairTypeRepository.GetAllAsync();
    }

    public async Task<RepairTypeReference?> GetRepairTypeByIdAsync(Guid id)
    {
        return await _repairTypeRepository.GetByIdAsync(id);
    }

    public async Task<RepairTypeReference> CreateRepairTypeAsync(RepairTypeReference repairType)
    {
        repairType.Id = Guid.NewGuid();
        return await _repairTypeRepository.CreateAsync(repairType);
    }

    public async Task UpdateRepairTypeAsync(RepairTypeReference repairType)
    {
        await _repairTypeRepository.UpdateAsync(repairType);
    }

    public async Task DeleteRepairTypeAsync(Guid id)
    {
        var repairType = await _repairTypeRepository.GetByIdAsync(id);
        if (repairType != null)
        {
            await _repairTypeRepository.DeleteAsync(repairType);
        }
    }
}
