using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class GasContractService
{
    private readonly IBaseRepository<GasContract> _gasContractRepository;

    public GasContractService(IGasContractRepository gasContractRepository)
    {
        _gasContractRepository = gasContractRepository;
    }

    public async Task<IEnumerable<GasContract>> GetAllGasContractsAsync()
    {
        return await _gasContractRepository.GetAllAsync();
    }

    public async Task<GasContract?> GetGasContractByIdAsync(Guid id)
    {
        return await _gasContractRepository.GetByIdAsync(id);
    }

    public async Task<GasContract> CreateGasContractAsync(GasContract gasContract)
    {
        gasContract.Id = Guid.NewGuid();
        return await _gasContractRepository.CreateAsync(gasContract);
    }

    public async Task UpdateGasContractAsync(GasContract gasContract)
    {
        await _gasContractRepository.UpdateAsync(gasContract);
    }

    public async Task DeleteGasContractAsync(Guid id)
    {
        var gasContract = await _gasContractRepository.GetByIdAsync(id);
        if (gasContract != null)
        {
            await _gasContractRepository.DeleteAsync(gasContract);
        }
    }

    public async Task<IEnumerable<GasContract>> GetContractsByClientAsync(string clientName)
    {
        var allContracts = await _gasContractRepository.GetAllAsync();
        return allContracts.Where(c => c.ClientName == clientName);
    }
}
