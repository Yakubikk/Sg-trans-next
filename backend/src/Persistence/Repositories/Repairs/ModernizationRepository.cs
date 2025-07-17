using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class ModernizationRepository : BaseRepository<Modernization>, IModernizationRepository
{
    public ModernizationRepository(ApplicationDbContext context) : base(context)
    {
    }
}