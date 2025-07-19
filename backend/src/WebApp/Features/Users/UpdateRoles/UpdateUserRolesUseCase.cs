using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.UpdateRoles;

public class UpdateUserRolesUseCase
{
    private readonly UserRepository _userRepository;

    public UpdateUserRolesUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> ExecuteAsync(UpdateUserRolesRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        user.Roles = new List<RoleEntity>();
        foreach (var role in request.Roles)
        {
            user.Roles.Add(await _userRepository.GetRoleByIdAsync((int)role));
        }

        return await _userRepository.UpdateUserAsync(user);
    }
}
