using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class AbsorberDevice1Service
{
    private readonly IBaseRepository<AbsorberDevice1> _absorberDevice1Repository;

    public AbsorberDevice1Service(IAbsorberDevice1Repository absorberDevice1Repository)
    {
        _absorberDevice1Repository = absorberDevice1Repository;
    }

    public async Task<IEnumerable<AbsorberDevice1>> GetAllAbsorberDevices1Async()
    {
        return await _absorberDevice1Repository.GetAllAsync();
    }

    public async Task<AbsorberDevice1?> GetAbsorberDevice1ByIdAsync(Guid id)
    {
        return await _absorberDevice1Repository.GetByIdAsync(id);
    }

    public async Task<AbsorberDevice1> CreateAbsorberDevice1Async(AbsorberDevice1 absorberDevice1)
    {
        absorberDevice1.Id = Guid.NewGuid();
        return await _absorberDevice1Repository.CreateAsync(absorberDevice1);
    }

    public async Task UpdateAbsorberDevice1Async(AbsorberDevice1 absorberDevice1)
    {
        await _absorberDevice1Repository.UpdateAsync(absorberDevice1);
    }

    public async Task DeleteAbsorberDevice1Async(Guid id)
    {
        var absorberDevice1 = await _absorberDevice1Repository.GetByIdAsync(id);
        if (absorberDevice1 != null)
        {
            await _absorberDevice1Repository.DeleteAsync(absorberDevice1);
        }
    }
}
