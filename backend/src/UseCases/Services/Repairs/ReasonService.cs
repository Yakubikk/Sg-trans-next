using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class ReasonService
{
    private readonly IBaseRepository<Reason> _reasonRepository;

    public ReasonService(IReasonRepository reasonRepository)
    {
        _reasonRepository = reasonRepository;
    }

    public async Task<IEnumerable<Reason>> GetAllReasonsAsync()
    {
        return await _reasonRepository.GetAllAsync();
    }

    public async Task<Reason?> GetReasonByIdAsync(Guid id)
    {
        return await _reasonRepository.GetByIdAsync(id);
    }

    public async Task<Reason> CreateReasonAsync(Reason reason)
    {
        reason.Id = Guid.NewGuid();
        return await _reasonRepository.CreateAsync(reason);
    }

    public async Task UpdateReasonAsync(Reason reason)
    {
        await _reasonRepository.UpdateAsync(reason);
    }

    public async Task DeleteReasonAsync(Guid id)
    {
        var reason = await _reasonRepository.GetByIdAsync(id);
        if (reason != null)
        {
            await _reasonRepository.DeleteAsync(reason);
        }
    }
}
