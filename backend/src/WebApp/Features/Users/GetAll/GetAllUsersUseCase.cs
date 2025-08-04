using WebApp.Data.Repositories;

namespace WebApp.Features.Users.GetAll;

public class GetAllUsersUseCase
{
    private readonly UserRepository _userRepository;

    public GetAllUsersUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<GetAllUsersResponse>> ExecuteAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();
        
        return users.Select(user => new GetAllUsersResponse(
            user.Id,
            user.Email,
            user.FirstName,
            user.LastName,
            user.Patronymic,
            user.PhoneNumber,
            user.Roles.Select(role => new RoleResponse(
                role.Id,
                role.Name
            )).ToArray()
        ));
    }
}
