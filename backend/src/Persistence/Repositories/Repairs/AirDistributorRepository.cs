using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class AirDistributorRepository : BaseRepository<AirDistributor>, IAirDistributorRepository
{
    public AirDistributorRepository(ApplicationDbContext context) : base(context)
    {
    }
}