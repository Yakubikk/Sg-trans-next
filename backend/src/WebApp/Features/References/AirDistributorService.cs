using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class AirDistributorService
{
    private readonly BaseRepository<AirDistributor> _airDistributorRepository;

    public AirDistributorService(BaseRepository<AirDistributor> airDistributorRepository)
    {
        _airDistributorRepository = airDistributorRepository;
    }

    public async Task<IEnumerable<AirDistributor>> GetAllAirDistributorsAsync()
    {
        return await _airDistributorRepository.GetAllAsync();
    }

    public async Task<AirDistributor?> GetAirDistributorByIdAsync(Guid id)
    {
        return await _airDistributorRepository.GetByIdAsync(id);
    }

    public async Task<AirDistributor> CreateAirDistributorAsync(AirDistributor airDistributor)
    {
        airDistributor.Id = Guid.NewGuid();
        return await _airDistributorRepository.CreateAsync(airDistributor);
    }

    public async Task UpdateAirDistributorAsync(AirDistributor airDistributor)
    {
        await _airDistributorRepository.UpdateAsync(airDistributor);
    }

    public async Task DeleteAirDistributorAsync(Guid id)
    {
        var airDistributor = await _airDistributorRepository.GetByIdAsync(id);
        if (airDistributor != null)
        {
            await _airDistributorRepository.DeleteAsync(airDistributor);
        }
    }
}
