using WebApp.Abstractions.Auth;
using WebApp.Data.Entities.Users;
using WebApp.Data.Repositories;

namespace WebApp.Features.Users.Register;

public class RegisterUserUseCase
{
    private readonly UserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterUserUseCase(
        UserRepository userRepository,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task ExecuteAsync(RegisterUserRequest request)
    {
        var hashedPassword = _passwordHasher.Generate(request.Password);
        var roles = await _userRepository.GetRolesByIdsAsync(request.RoleIds);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = hashedPassword,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            PhoneNumber = request.PhoneNumber,
            Roles = roles.ToList()
        };

        await _userRepository.AddAsync(user);
    }
}
