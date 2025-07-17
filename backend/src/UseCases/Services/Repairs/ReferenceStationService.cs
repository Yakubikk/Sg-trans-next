using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class ReferenceStationService
{
    private readonly IBaseRepository<ReferenceStation> _referenceStationRepository;

    public ReferenceStationService(IReferenceStationRepository referenceStationRepository)
    {
        _referenceStationRepository = referenceStationRepository;
    }

    public async Task<IEnumerable<ReferenceStation>> GetAllReferenceStationsAsync()
    {
        return await _referenceStationRepository.GetAllAsync();
    }

    public async Task<ReferenceStation?> GetReferenceStationByIdAsync(Guid id)
    {
        return await _referenceStationRepository.GetByIdAsync(id);
    }

    public async Task<ReferenceStation> CreateReferenceStationAsync(ReferenceStation referenceStation)
    {
        referenceStation.Id = Guid.NewGuid();
        return await _referenceStationRepository.CreateAsync(referenceStation);
    }

    public async Task UpdateReferenceStationAsync(ReferenceStation referenceStation)
    {
        await _referenceStationRepository.UpdateAsync(referenceStation);
    }

    public async Task DeleteReferenceStationAsync(Guid id)
    {
        var referenceStation = await _referenceStationRepository.GetByIdAsync(id);
        if (referenceStation != null)
        {
            await _referenceStationRepository.DeleteAsync(referenceStation);
        }
    }
}
