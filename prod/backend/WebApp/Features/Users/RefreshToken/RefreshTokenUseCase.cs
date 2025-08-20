using WebApp.Abstractions.Auth;
using WebApp.Data.Repositories;
using WebApp.Exceptions;

namespace WebApp.Features.Users.RefreshToken;

public class RefreshTokenUseCase
{
    private readonly UserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;

    public RefreshTokenUseCase(UserRepository userRepository, IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _jwtProvider = jwtProvider;
    }

    public async Task<RefreshTokenResponse> ExecuteAsync(RefreshTokenRequest request)
    {
        var user = await _userRepository.GetUserByIdAsync(request.Id);

        if (user.RefreshTokenExpiry <= DateTime.UtcNow || user.RefreshToken != request.RefreshToken)
            throw new ApiException("Недействительный refresh token", 401);

        var newRefreshToken = _jwtProvider.GenerateRefreshToken();
        var newAccessToken = await _jwtProvider.GenerateAccessTokenAsync(user);

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userRepository.UpdateUserAsync(user);

        return new RefreshTokenResponse(newAccessToken, newRefreshToken);
    }
}
