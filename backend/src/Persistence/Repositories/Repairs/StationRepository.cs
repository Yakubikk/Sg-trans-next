using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class StationRepository : BaseRepository<Station>, IStationRepository
{
    public StationRepository(ApplicationDbContext context) : base(context)
    {
    }
}