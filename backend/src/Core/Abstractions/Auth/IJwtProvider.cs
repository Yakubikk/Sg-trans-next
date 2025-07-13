using Core.Users;

namespace Core.Abstractions.Auth;

public interface IJwtProvider
{
    Task<string> GenerateAccessTokenAsync(User user);
    string GenerateRefreshToken();
    bool ValidateAccessToken(string token);
    bool ValidateRefreshToken(string token);
}