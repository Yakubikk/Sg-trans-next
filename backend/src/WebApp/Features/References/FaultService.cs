using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class FaultService
{
    private readonly BaseRepository<Fault> _faultRepository;

    public FaultService(BaseRepository<Fault> faultRepository)
    {
        _faultRepository = faultRepository;
    }

    public async Task<IEnumerable<Fault>> GetAllFaultsAsync()
    {
        return await _faultRepository.GetAllAsync();
    }

    public async Task<Fault?> GetFaultByIdAsync(Guid id)
    {
        return await _faultRepository.GetByIdAsync(id);
    }

    public async Task<Fault> CreateFaultAsync(Fault fault)
    {
        fault.Id = Guid.NewGuid();
        return await _faultRepository.CreateAsync(fault);
    }

    public async Task UpdateFaultAsync(Fault fault)
    {
        await _faultRepository.UpdateAsync(fault);
    }

    public async Task DeleteFaultAsync(Guid id)
    {
        var fault = await _faultRepository.GetByIdAsync(id);
        if (fault != null)
        {
            await _faultRepository.DeleteAsync(fault);
        }
    }
}
