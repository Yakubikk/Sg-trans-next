using Core.Abstractions.Auth;
using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.RefreshToken;

public class RefreshTokenUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;

    public RefreshTokenUseCase(IUserRepository userRepository, IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _jwtProvider = jwtProvider;
    }

    public async Task<RefreshTokenResponse> ExecuteAsync(RefreshTokenRequest request)
    {
        // Найти пользователя по refresh token
        var users = await _userRepository.GetAllUsersAsync();
        var user = users.FirstOrDefault(u => u.RefreshToken == request.RefreshToken) 
            ?? throw new Exception("Invalid refresh token");

        // Проверить срок действия токена
        if (user.RefreshTokenExpiry <= DateTime.UtcNow)
            throw new Exception("Refresh token expired");

        // Сгенерировать новые токены
        var newRefreshToken = _jwtProvider.GenerateRefreshToken();
        var newAccessToken = await _jwtProvider.GenerateAccessTokenAsync(user);

        // Обновить refresh token в базе
        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userRepository.UpdateUserAsync(user);

        return new RefreshTokenResponse(newAccessToken, newRefreshToken);
    }
}
