using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace Persistence.Repositories.Repairs;

public class ModelVCRepository : BaseRepository<ModelVC>, IModelVCRepository
{
    public ModelVCRepository(ApplicationDbContext context) : base(context)
    {
    }
}