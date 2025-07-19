using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class AbsorberDeviceAccountingService
{
    private readonly BaseRepository<AbsorberDeviceAccounting> _accountingRepository;

    public AbsorberDeviceAccountingService(BaseRepository<AbsorberDeviceAccounting> accountingRepository)
    {
        _accountingRepository = accountingRepository;
    }

    public async Task<IEnumerable<AbsorberDeviceAccounting>> GetAllAccountingsAsync()
    {
        return await _accountingRepository.GetAllAsync();
    }

    public async Task<AbsorberDeviceAccounting?> GetAccountingByIdAsync(Guid id)
    {
        return await _accountingRepository.GetByIdAsync(id);
    }

    public async Task<AbsorberDeviceAccounting> CreateAccountingAsync(AbsorberDeviceAccounting accounting)
    {
        accounting.Id = Guid.NewGuid();
        return await _accountingRepository.CreateAsync(accounting);
    }

    public async Task UpdateAccountingAsync(AbsorberDeviceAccounting accounting)
    {
        await _accountingRepository.UpdateAsync(accounting);
    }

    public async Task DeleteAccountingAsync(Guid id)
    {
        var accounting = await _accountingRepository.GetByIdAsync(id);
        if (accounting != null)
        {
            await _accountingRepository.DeleteAsync(accounting);
        }
    }

    public async Task<IEnumerable<AbsorberDeviceAccounting>> GetByWagonNumberAsync(string wagonNumber)
    {
        var allAccounting = await _accountingRepository.GetAllAsync();
        return allAccounting.Where(a => a.WagonNumber == wagonNumber);
    }

    public async Task<IEnumerable<AbsorberDeviceAccounting>> GetActiveDevicesAsync()
    {
        var allAccounting = await _accountingRepository.GetAllAsync();
        return allAccounting.Where(a => !a.IsWrittenOff);
    }
}
