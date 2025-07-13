using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.UpdateRoles;

public class UpdateUserRolesUseCase
{
    private readonly IUserRepository _userRepository;

    public UpdateUserRolesUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> ExecuteAsync(UpdateUserRolesRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        user.Roles = request.Roles;
        
        return await _userRepository.UpdateUserAsync(user);
    }
}
