using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.Update;

public class UpdateUserUseCase
{
    private readonly IUserRepository _userRepository;

    public UpdateUserUseCase(IUserRepository userRepository)
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
