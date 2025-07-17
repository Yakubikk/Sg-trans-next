using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class StampRepository : BaseRepository<Stamp>, IStampRepository
{
    public StampRepository(ApplicationDbContext context) : base(context)
    {
    }
}