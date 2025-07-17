using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class AbsorberDeviceRepository : BaseRepository<AbsorberDevice>, IAbsorberDeviceRepository
{
    public AbsorberDeviceRepository(ApplicationDbContext context) : base(context)
    {
    }
}
