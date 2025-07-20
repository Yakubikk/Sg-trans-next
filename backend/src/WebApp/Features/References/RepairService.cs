using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class RepairService
{
    private readonly BaseRepository<RepairReference> _repairRepository;

    public RepairService(BaseRepository<RepairReference> repairRepository)
    {
        _repairRepository = repairRepository;
    }

    public async Task<IEnumerable<RepairReference>> GetAllRepairsAsync()
    {
        return await _repairRepository.GetAllAsync();
    }

    public async Task<RepairReference?> GetRepairByIdAsync(Guid id)
    {
        return await _repairRepository.GetByIdAsync(id);
    }

    public async Task<RepairReference> CreateRepairAsync(RepairReference repair)
    {
        repair.Id = Guid.NewGuid();
        return await _repairRepository.CreateAsync(repair);
    }

    public async Task UpdateRepairAsync(RepairReference repair)
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
