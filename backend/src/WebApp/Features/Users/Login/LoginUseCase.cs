using WebApp.Abstractions.Auth;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.Login;

public class LoginUseCase
{
    private readonly UserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public LoginUseCase(
        UserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }

    public async Task<LoginResponse> ExecuteAsync(LoginRequest request)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.Email);
        
        if (!_passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new Exception("Invalid credentials");
        }

        var refreshToken = _jwtProvider.GenerateRefreshToken();
        var accessToken = await _jwtProvider.GenerateAccessTokenAsync(user);

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        
        await _userRepository.UpdateUserAsync(user);

        return new LoginResponse(accessToken, refreshToken);
    }
}
