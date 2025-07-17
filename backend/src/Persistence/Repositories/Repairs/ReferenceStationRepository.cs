using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class ReferenceStationRepository : BaseRepository<ReferenceStation>, IReferenceStationRepository
{
    public ReferenceStationRepository(ApplicationDbContext context) : base(context)
    {
    }
}