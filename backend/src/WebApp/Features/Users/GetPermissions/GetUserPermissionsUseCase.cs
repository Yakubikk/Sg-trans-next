using WebApp.Data.Enums;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.GetPermissions;

public class GetUserPermissionsUseCase
{
    private readonly UserRepository _userRepository;

    public GetUserPermissionsUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<HashSet<Permission>> ExecuteAsync(GetUserPermissionsRequest request)
    {
        return _userRepository.GetUserPermissionsAsync(request.UserId);
    }
}
