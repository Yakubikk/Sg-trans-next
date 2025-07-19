using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class BrakeService
{
    private readonly BaseRepository<Brake> _brakeRepository;

    public BrakeService(BaseRepository<Brake> brakeRepository)
    {
        _brakeRepository = brakeRepository;
    }

    public async Task<IEnumerable<Brake>> GetAllBrakesAsync()
    {
        return await _brakeRepository.GetAllAsync();
    }

    public async Task<Brake?> GetBrakeByIdAsync(Guid id)
    {
        return await _brakeRepository.GetByIdAsync(id);
    }

    public async Task<Brake> CreateBrakeAsync(Brake brake)
    {
        brake.Id = Guid.NewGuid();
        return await _brakeRepository.CreateAsync(brake);
    }

    public async Task UpdateBrakeAsync(Brake brake)
    {
        await _brakeRepository.UpdateAsync(brake);
    }

    public async Task DeleteBrakeAsync(Guid id)
    {
        var brake = await _brakeRepository.GetByIdAsync(id);
        if (brake != null)
        {
            await _brakeRepository.DeleteAsync(brake);
        }
    }
}
