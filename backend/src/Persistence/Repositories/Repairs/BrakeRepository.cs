using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class BrakeRepository : BaseRepository<Brake>, IBrakeRepository
{
    public BrakeRepository(ApplicationDbContext context) : base(context)
    {
    }
}