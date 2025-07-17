using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class AbsorberDevice1Repository : BaseRepository<AbsorberDevice1>, IAbsorberDevice1Repository
{
    public AbsorberDevice1Repository(ApplicationDbContext context) : base(context)
    {
    }
}
