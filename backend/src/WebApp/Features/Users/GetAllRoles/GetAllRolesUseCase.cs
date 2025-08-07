using WebApp.Data.Repositories;

namespace WebApp.Features.Users.GetAllRoles;

public class GetAllRolesUseCase
{
    private readonly UserRepository _userRepository;

    public GetAllRolesUseCase(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<GetAllRolesResponse>> ExecuteAsync()
    {
        var roles = await _userRepository.GetAllRolesAsync();
        return roles.Select(r => new GetAllRolesResponse(r.Id, r.Name));
    }
}
