using Core.Abstractions.Auth;
using Core.Abstractions.Repositories;
using Core.Users;
using UseCases.Contracts.Users;

namespace UseCases.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public UserService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }

    public async Task Register(RegisterUserRequest request)
    
    {
        var hashedPassword = _passwordHasher.Generate(request.Password);

        var user = new User()
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            PasswordHash = hashedPassword,
        };

        await _userRepository.Add(user);
    }

    public async Task<string> Login(LoginUserRequest request)
    {
        var user = await _userRepository.GetByEmail(request.Email);

        var result = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (result == false)
        {
            throw new Exception("Failed to login");
        }

        var token = _jwtProvider.Generate(user);

        return token;
    }
}