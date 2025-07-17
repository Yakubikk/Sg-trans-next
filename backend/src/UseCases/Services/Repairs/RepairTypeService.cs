using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class RepairTypeService
{
    private readonly IBaseRepository<RepairType> _repairTypeRepository;

    public RepairTypeService(IRepairTypeRepository repairTypeRepository)
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
