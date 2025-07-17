using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class VCTypeService
{
    private readonly IBaseRepository<VCType> _vcTypeRepository;

    public VCTypeService(IVCTypeRepository vcTypeRepository)
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
