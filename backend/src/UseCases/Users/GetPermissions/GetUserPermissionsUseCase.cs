using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.GetPermissions;

public class GetUserPermissionsUseCase
{
    private readonly IUserRepository _userRepository;

    public GetUserPermissionsUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<HashSet<Permission>> ExecuteAsync(GetUserPermissionsRequest request)
    {
        return _userRepository.GetUserPermissionsAsync(request.UserId);
    }
}
