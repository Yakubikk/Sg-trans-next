using WebApp.Abstractions.Services;
using WebApp.Data.Enums;
using WebApp.Data.Repositories;

namespace WebApp.Services;

public class PermissionService : IPermissionService
{
    private readonly UserRepository _userRepository;

    public PermissionService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<HashSet<Permission>> GetPermissionsAsync(Guid userId)
    {
        return _userRepository.GetUserPermissionsAsync(userId);
    }
}