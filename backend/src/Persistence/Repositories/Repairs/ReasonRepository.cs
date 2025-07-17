using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class ReasonRepository : BaseRepository<Reason>, IReasonRepository
{
    public ReasonRepository(ApplicationDbContext context) : base(context)
    {
    }
}