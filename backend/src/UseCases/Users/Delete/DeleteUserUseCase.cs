using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.Delete;

public class DeleteUserUseCase
{
    private readonly IUserRepository _userRepository;

    public DeleteUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task ExecuteAsync(DeleteUserRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        await _userRepository.DeleteUserAsync(user);
    }
}
