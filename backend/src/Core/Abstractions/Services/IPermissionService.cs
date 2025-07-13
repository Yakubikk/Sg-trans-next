using Core.Users;

namespace Core.Abstractions.Services;

public interface IPermissionService
{
    Task<HashSet<Permission>> GetPermissionsAsync(Guid userId);
}