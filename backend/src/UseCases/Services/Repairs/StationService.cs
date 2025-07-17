using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class StationService
{
    private readonly IBaseRepository<Station> _stationRepository;

    public StationService(IStationRepository stationRepository)
    {
        _stationRepository = stationRepository;
    }

    public async Task<IEnumerable<Station>> GetAllStationsAsync()
    {
        return await _stationRepository.GetAllAsync();
    }

    public async Task<Station?> GetStationByIdAsync(Guid id)
    {
        return await _stationRepository.GetByIdAsync(id);
    }

    public async Task<Station> CreateStationAsync(Station station)
    {
        station.Id = Guid.NewGuid();
        return await _stationRepository.CreateAsync(station);
    }

    public async Task UpdateStationAsync(Station station)
    {
        await _stationRepository.UpdateAsync(station);
    }

    public async Task DeleteStationAsync(Guid id)
    {
        var station = await _stationRepository.GetByIdAsync(id);
        if (station != null)
        {
            await _stationRepository.DeleteAsync(station);
        }
    }
}
