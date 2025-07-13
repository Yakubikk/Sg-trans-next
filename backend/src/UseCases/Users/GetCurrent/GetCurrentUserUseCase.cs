using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.GetCurrent;

public class GetCurrentUserUseCase
{
    private readonly IUserRepository _userRepository;

    public GetCurrentUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> ExecuteAsync(GetCurrentUserRequest request)
    {
        return await _userRepository.GetUserByIdAsync(request.UserId);
    }
}
