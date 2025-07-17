using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class RepairService
{
    private readonly IBaseRepository<Repair> _repairRepository;

    public RepairService(IRepairRepository repairRepository)
    {
        _repairRepository = repairRepository;
    }

    public async Task<IEnumerable<Repair>> GetAllRepairsAsync()
    {
        return await _repairRepository.GetAllAsync();
    }

    public async Task<Repair?> GetRepairByIdAsync(Guid id)
    {
        return await _repairRepository.GetByIdAsync(id);
    }

    public async Task<Repair> CreateRepairAsync(Repair repair)
    {
        repair.Id = Guid.NewGuid();
        return await _repairRepository.CreateAsync(repair);
    }

    public async Task UpdateRepairAsync(Repair repair)
    {
        await _repairRepository.UpdateAsync(repair);
    }

    public async Task DeleteRepairAsync(Guid id)
    {
        var repair = await _repairRepository.GetByIdAsync(id);
        if (repair != null)
        {
            await _repairRepository.DeleteAsync(repair);
        }
    }
}
