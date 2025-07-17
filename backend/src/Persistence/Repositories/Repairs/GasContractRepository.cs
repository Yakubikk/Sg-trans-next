using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class GasContractRepository : BaseRepository<GasContract>, IGasContractRepository
{
    public GasContractRepository(ApplicationDbContext context) : base(context)
    {
    }
}