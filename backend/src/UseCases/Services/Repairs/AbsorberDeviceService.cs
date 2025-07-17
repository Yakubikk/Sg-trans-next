using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class AbsorberDeviceService
{
    private readonly IBaseRepository<AbsorberDevice> _absorberDeviceRepository;

    public AbsorberDeviceService(IAbsorberDeviceRepository absorberDeviceRepository)
    {
        _absorberDeviceRepository = absorberDeviceRepository;
    }

    public async Task<IEnumerable<AbsorberDevice>> GetAllAbsorberDevicesAsync()
    {
        return await _absorberDeviceRepository.GetAllAsync();
    }

    public async Task<AbsorberDevice?> GetAbsorberDeviceByIdAsync(Guid id)
    {
        return await _absorberDeviceRepository.GetByIdAsync(id);
    }

    public async Task<AbsorberDevice> CreateAbsorberDeviceAsync(AbsorberDevice absorberDevice)
    {
        absorberDevice.Id = Guid.NewGuid();
        return await _absorberDeviceRepository.CreateAsync(absorberDevice);
    }

    public async Task UpdateAbsorberDeviceAsync(AbsorberDevice absorberDevice)
    {
        await _absorberDeviceRepository.UpdateAsync(absorberDevice);
    }

    public async Task DeleteAbsorberDeviceAsync(Guid id)
    {
        var absorberDevice = await _absorberDeviceRepository.GetByIdAsync(id);
        if (absorberDevice != null)
        {
            await _absorberDeviceRepository.DeleteAsync(absorberDevice);
        }
    }
}
