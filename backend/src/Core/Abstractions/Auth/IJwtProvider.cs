using Core.Users;

namespace Core.Abstractions.Auth;

public interface IJwtProvider
{
    string Generate(User user);
}