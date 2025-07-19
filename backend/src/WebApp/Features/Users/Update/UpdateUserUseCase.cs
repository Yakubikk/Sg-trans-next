using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.Update;

public class UpdateUserUseCase
{
    private readonly UserRepository _userRepository;

    public UpdateUserUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> ExecuteAsync(UpdateUserRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        
        user.Email = request.Email;
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Patronymic = request.Patronymic;
        user.PhoneNumber = request.PhoneNumber;

        return await _userRepository.UpdateUserAsync(user);
    }
}
