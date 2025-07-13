using Core.Users;

namespace UseCases.Users.UpdateRoles;

public record UpdateUserRolesRequest(Guid UserId, ICollection<Role> Roles);
