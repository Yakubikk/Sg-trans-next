using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class RailwayRepository : BaseRepository<Railway>, IRailwayRepository
{
    public RailwayRepository(ApplicationDbContext context) : base(context)
    {
    }
}