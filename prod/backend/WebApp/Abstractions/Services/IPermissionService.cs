using WebApp.Data.Enums;

namespace WebApp.Abstractions.Services;

public interface IPermissionService
{
    Task<HashSet<Permission>> GetPermissionsAsync(Guid userId);
}