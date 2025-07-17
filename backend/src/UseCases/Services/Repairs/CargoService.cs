using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class CargoService
{
    private readonly IBaseRepository<Cargo> _cargoRepository;

    public CargoService(ICargoRepository cargoRepository)
    {
        _cargoRepository = cargoRepository;
    }

    public async Task<IEnumerable<Cargo>> GetAllCargosAsync()
    {
        return await _cargoRepository.GetAllAsync();
    }

    public async Task<Cargo?> GetCargoByIdAsync(Guid id)
    {
        return await _cargoRepository.GetByIdAsync(id);
    }

    public async Task<Cargo> CreateCargoAsync(Cargo cargo)
    {
        cargo.Id = Guid.NewGuid();
        return await _cargoRepository.CreateAsync(cargo);
    }

    public async Task UpdateCargoAsync(Cargo cargo)
    {
        await _cargoRepository.UpdateAsync(cargo);
    }

    public async Task DeleteCargoAsync(Guid id)
    {
        var cargo = await _cargoRepository.GetByIdAsync(id);
        if (cargo != null)
        {
            await _cargoRepository.DeleteAsync(cargo);
        }
    }
}
