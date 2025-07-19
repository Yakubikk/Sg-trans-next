using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class RepairTypeService
{
    private readonly BaseRepository<RepairType> _repairTypeRepository;

    public RepairTypeService(BaseRepository<RepairType> repairTypeRepository)
    {
        _repairTypeRepository = repairTypeRepository;
    }

    public async Task<IEnumerable<RepairType>> GetAllRepairTypesAsync()
    {
        return await _repairTypeRepository.GetAllAsync();
    }

    public async Task<RepairType?> GetRepairTypeByIdAsync(Guid id)
    {
        return await _repairTypeRepository.GetByIdAsync(id);
    }

    public async Task<RepairType> CreateRepairTypeAsync(RepairType repairType)
    {
        repairType.Id = Guid.NewGuid();
        return await _repairTypeRepository.CreateAsync(repairType);
    }

    public async Task UpdateRepairTypeAsync(RepairType repairType)
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
