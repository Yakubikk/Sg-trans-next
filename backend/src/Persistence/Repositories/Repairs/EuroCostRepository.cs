using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class EuroCostRepository : BaseRepository<EuroCost>, IEuroCostRepository
{
    public EuroCostRepository(ApplicationDbContext context) : base(context)
    {
    }
}