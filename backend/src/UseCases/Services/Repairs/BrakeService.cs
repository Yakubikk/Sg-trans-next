using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class BrakeService
{
    private readonly IBaseRepository<Brake> _brakeRepository;

    public BrakeService(IBrakeRepository brakeRepository)
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
