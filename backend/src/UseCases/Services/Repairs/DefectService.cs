using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class DefectService
{
    private readonly IBaseRepository<Defect> _defectRepository;

    public DefectService(IDefectRepository defectRepository)
    {
        _defectRepository = defectRepository;
    }

    public async Task<IEnumerable<Defect>> GetAllDefectsAsync()
    {
        return await _defectRepository.GetAllAsync();
    }

    public async Task<Defect?> GetDefectByIdAsync(Guid id)
    {
        return await _defectRepository.GetByIdAsync(id);
    }

    public async Task<Defect> CreateDefectAsync(Defect defect)
    {
        defect.Id = Guid.NewGuid();
        return await _defectRepository.CreateAsync(defect);
    }

    public async Task UpdateDefectAsync(Defect defect)
    {
        await _defectRepository.UpdateAsync(defect);
    }

    public async Task DeleteDefectAsync(Guid id)
    {
        var defect = await _defectRepository.GetByIdAsync(id);
        if (defect != null)
        {
            await _defectRepository.DeleteAsync(defect);
        }
    }
}
