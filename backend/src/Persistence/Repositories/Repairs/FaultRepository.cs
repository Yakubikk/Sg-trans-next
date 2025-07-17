using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class FaultRepository : BaseRepository<Fault>, IFaultRepository
{
    public FaultRepository(ApplicationDbContext context) : base(context)
    {
    }
}