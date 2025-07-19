using WebApp.Data.Entities.References;
using WebApp.Data.Repositories;

namespace WebApp.Features.References;

public class VCTypeService
{
    private readonly BaseRepository<VCType> _vcTypeRepository;

    public VCTypeService(BaseRepository<VCType> vcTypeRepository)
    {
        _vcTypeRepository = vcTypeRepository;
    }

    public async Task<IEnumerable<VCType>> GetAllVCTypesAsync()
    {
        return await _vcTypeRepository.GetAllAsync();
    }

    public async Task<VCType?> GetVCTypeByIdAsync(Guid id)
    {
        return await _vcTypeRepository.GetByIdAsync(id);
    }

    public async Task<VCType> CreateVCTypeAsync(VCType vcType)
    {
        vcType.Id = Guid.NewGuid();
        return await _vcTypeRepository.CreateAsync(vcType);
    }

    public async Task UpdateVCTypeAsync(VCType vcType)
    {
        await _vcTypeRepository.UpdateAsync(vcType);
    }

    public async Task DeleteVCTypeAsync(Guid id)
    {
        var vcType = await _vcTypeRepository.GetByIdAsync(id);
        if (vcType != null)
        {
            await _vcTypeRepository.DeleteAsync(vcType);
        }
    }
}
