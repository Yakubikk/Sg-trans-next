using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class CargoRepository : BaseRepository<Cargo>, ICargoRepository
{
    public CargoRepository(ApplicationDbContext context) : base(context)
    {
    }
}