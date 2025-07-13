using Core.Users;

namespace Core.Abstractions.Repositories;

public interface IUserRepository
{
    public Task Add(User user);
    public Task<User> GetByEmail(string email);
    Task<HashSet<Permission>> GetUserPermissions(Guid userId);
}