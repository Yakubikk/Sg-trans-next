using Core.Users;

namespace Core.Abstractions.Repositories;

public interface IUserRepository
{
    public Task AddAsync(User user);
    public Task<User> GetUserByEmailAsync(string email);
    public Task<HashSet<Permission>> GetUserPermissionsAsync(Guid userId);
    public Task<User> GetUserByIdAsync(Guid userId);
    public Task<ICollection<User>> GetAllUsersAsync();
    public Task<User> UpdateUserAsync(User user);
    public Task DeleteUserAsync(User user);
    
}