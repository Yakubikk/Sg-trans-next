using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class FaultService
{
    private readonly IBaseRepository<Fault> _faultRepository;

    public FaultService(IFaultRepository faultRepository)
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
