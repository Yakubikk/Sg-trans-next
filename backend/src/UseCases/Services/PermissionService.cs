using Core.Abstractions.Repositories;
using Core.Abstractions.Services;
using Core.Users;

namespace UseCases.Services;

public class PermissionService : IPermissionService
{
    private readonly IUserRepository _userRepository;

    public PermissionService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<HashSet<Permission>> GetPermissionsAsync(Guid userId)
    {
        return _userRepository.GetUserPermissionsAsync(userId);
    }
}