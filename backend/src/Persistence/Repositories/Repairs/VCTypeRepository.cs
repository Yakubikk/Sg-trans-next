using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class VCTypeRepository : BaseRepository<VCType>, IVCTypeRepository
{
    public VCTypeRepository(ApplicationDbContext context) : base(context)
    {
    }
}