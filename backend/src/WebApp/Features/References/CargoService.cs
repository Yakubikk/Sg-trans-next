using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class CargoService
{
    private readonly BaseRepository<Cargo> _cargoRepository;

    public CargoService(BaseRepository<Cargo> cargoRepository)
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
