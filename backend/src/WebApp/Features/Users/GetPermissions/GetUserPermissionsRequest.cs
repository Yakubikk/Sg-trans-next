using System.ComponentModel.DataAnnotations;

namespace WebApp.Features.Users.GetPermissions;

public record GetUserPermissionsRequest([Required] Guid UserId);
