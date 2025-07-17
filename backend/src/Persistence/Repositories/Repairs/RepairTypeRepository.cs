using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class RepairTypeRepository : BaseRepository<RepairType>, IRepairTypeRepository
{
    public RepairTypeRepository(ApplicationDbContext context) : base(context)
    {
    }
}