using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;
using WebApp.Features.Users.GetCurrent;

namespace WebApp.Features.Users.Update;

public class UpdateUserUseCase
{
    private readonly UserRepository _userRepository;

    public UpdateUserUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetCurrentUserResponse> ExecuteAsync(UpdateUserRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        
        user.Email = request.Email;
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Patronymic = request.Patronymic;
        user.PhoneNumber = request.PhoneNumber;

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