using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;
using WebApp.Features.Users.GetCurrent;

namespace WebApp.Features.Users.UpdateRoles;

public class UpdateUserRolesUseCase
{
    private readonly UserRepository _userRepository;

    public UpdateUserRolesUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetCurrentUserResponse> ExecuteAsync(UpdateUserRolesRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        user.Roles = new List<RoleEntity>();
        foreach (var role in request.Roles)
        {
            user.Roles.Add(await _userRepository.GetRoleByIdAsync((int)role));
        }

        user = await _userRepository.UpdateUserAsync(user);
        
        var response = new GetCurrentUserResponse(
            user.Id,
            user.Email,
            user.FirstName,
            user.LastName,
            user.Patronymic,
            user.PhoneNumber,
            user.RefreshToken,
            user.RefreshTokenExpiry,
            user.Roles.Select(r => new RolesForCurrentUser(
                r.Id,
                r.Name
            )).ToArray());
        return response;
    }
}
