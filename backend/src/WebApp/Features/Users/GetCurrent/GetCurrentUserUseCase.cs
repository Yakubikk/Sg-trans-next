using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.GetCurrent;

public class GetCurrentUserUseCase
{
    private readonly UserRepository _userRepository;

    public GetCurrentUserUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetCurrentUserResponse> ExecuteAsync(GetCurrentUserRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
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
