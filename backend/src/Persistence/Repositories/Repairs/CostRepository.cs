using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class CostRepository : BaseRepository<Cost>, ICostRepository
{
    public CostRepository(ApplicationDbContext context) : base(context)
    {
    }
}