using WebApp.Data.Enums;

namespace WebApp.Features.Users.UpdateRoles;

public record UpdateUserRolesRequest(Guid UserId, ICollection<Role> Roles);
