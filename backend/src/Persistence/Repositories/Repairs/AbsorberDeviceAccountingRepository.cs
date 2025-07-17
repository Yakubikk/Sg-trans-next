using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class AbsorberDeviceAccountingRepository : BaseRepository<AbsorberDeviceAccounting>, IAbsorberDeviceAccountingRepository
{
    public AbsorberDeviceAccountingRepository(ApplicationDbContext context) : base(context)
    {
    }
}
