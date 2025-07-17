using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class DefectRepository : BaseRepository<Defect>, IDefectRepository
{
    public DefectRepository(ApplicationDbContext context) : base(context)
    {
    }
}