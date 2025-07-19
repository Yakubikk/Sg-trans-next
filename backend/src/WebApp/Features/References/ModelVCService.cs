using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class ModelVCService
{
    private readonly BaseRepository<ModelVC> _modelVCRepository;

    public ModelVCService(BaseRepository<ModelVC> modelVCRepository)
    {
        _modelVCRepository = modelVCRepository;
    }

    public async Task<IEnumerable<ModelVC>> GetAllModelVCsAsync()
    {
        return await _modelVCRepository.GetAllAsync();
    }

    public async Task<ModelVC?> GetModelVCByIdAsync(Guid id)
    {
        return await _modelVCRepository.GetByIdAsync(id);
    }

    public async Task<ModelVC> CreateModelVCAsync(ModelVC modelVC)
    {
        modelVC.Id = Guid.NewGuid();
        return await _modelVCRepository.CreateAsync(modelVC);
    }

    public async Task UpdateModelVCAsync(ModelVC modelVC)
    {
        await _modelVCRepository.UpdateAsync(modelVC);
    }

    public async Task DeleteModelVCAsync(Guid id)
    {
        var modelVC = await _modelVCRepository.GetByIdAsync(id);
        if (modelVC != null)
        {
            await _modelVCRepository.DeleteAsync(modelVC);
        }
    }
}
