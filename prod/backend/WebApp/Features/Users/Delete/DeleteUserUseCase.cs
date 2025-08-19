using WebApp.Data.Repositories;

namespace WebApp.Features.Users.Delete;

public class DeleteUserUseCase
{
    private readonly UserRepository _userRepository;

    public DeleteUserUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task ExecuteAsync(DeleteUserRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        await _userRepository.DeleteUserAsync(user);
    }
}
