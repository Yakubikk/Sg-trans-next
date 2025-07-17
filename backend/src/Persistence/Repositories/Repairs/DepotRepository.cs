using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class DepotRepository : BaseRepository<Depot>, IDepotRepository
{
    public DepotRepository(ApplicationDbContext context) : base(context)
    {
    }
}