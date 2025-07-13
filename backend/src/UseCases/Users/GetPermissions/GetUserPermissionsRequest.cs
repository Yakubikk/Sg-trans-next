using System.ComponentModel.DataAnnotations;

namespace UseCases.Users.GetPermissions;

public record GetUserPermissionsRequest([Required] Guid UserId);
