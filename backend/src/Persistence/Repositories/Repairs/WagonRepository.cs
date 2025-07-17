using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class WagonRepository : BaseRepository<Wagon>, IWagonRepository
{
    public WagonRepository(ApplicationDbContext context) : base(context)
    {
    }
}