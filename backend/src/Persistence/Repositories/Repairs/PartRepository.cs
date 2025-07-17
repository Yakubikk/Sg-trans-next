using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class PartRepository : BaseRepository<Part>, IPartRepository
{
    public PartRepository(ApplicationDbContext context) : base(context)
    {
    }
}