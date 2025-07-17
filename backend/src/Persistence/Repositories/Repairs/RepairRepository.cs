using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class RepairRepository : BaseRepository<Repair>, IRepairRepository
{
    public RepairRepository(ApplicationDbContext context) : base(context)
    {
    }
}