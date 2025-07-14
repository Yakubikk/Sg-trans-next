using Core.Abstractions.Auth;
using Core.Abstractions.Repositories;
using Core.Users;

namespace UseCases.Users.Register;

public class RegisterUserUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterUserUseCase(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task ExecuteAsync(RegisterUserRequest request)
    {
        var hashedPassword = _passwordHasher.Generate(request.Password);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = hashedPassword,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            PhoneNumber = request.PhoneNumber,
            Roles = new List<Role> { Role.User }
        };

        await _userRepository.AddAsync(user);
    }
}
