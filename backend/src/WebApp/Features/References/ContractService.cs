using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class ContractService
{
    private readonly BaseRepository<Contract> _contractRepository;

    public ContractService(BaseRepository<Contract> contractRepository)
    {
        _contractRepository = contractRepository;
    }

    public async Task<IEnumerable<Contract>> GetAllContractsAsync()
    {
        return await _contractRepository.GetAllAsync();
    }

    public async Task<Contract?> GetContractByIdAsync(Guid id)
    {
        return await _contractRepository.GetByIdAsync(id);
    }

    public async Task<Contract> CreateContractAsync(Contract contract)
    {
        contract.Id = Guid.NewGuid();                                                                                               
        return await _contractRepository.CreateAsync(contract);
    }

    public async Task UpdateContractAsync(Contract contract)
    {
        await _contractRepository.UpdateAsync(contract);
    }

    public async Task DeleteContractAsync(Guid id)
    {
        var contract = await _contractRepository.GetByIdAsync(id);
        if (contract != null)
        {
            await _contractRepository.DeleteAsync(contract);
        }
    }
}
