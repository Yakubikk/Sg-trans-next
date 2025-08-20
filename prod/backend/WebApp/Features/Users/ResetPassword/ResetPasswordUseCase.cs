using WebApp.Abstractions.Auth;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.ResetPassword;

public class ResetPasswordUseCase
{
    private readonly UserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public ResetPasswordUseCase(
        UserRepository userRepository,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task ExecuteAsync(ResetPasswordRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.UserId);
        
        user.PasswordHash = _passwordHasher.Generate(request.NewPassword);
        
        await _userRepository.UpdateUserAsync(user);
    }
}
