using Core.Users;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.Authentication;

public class PermissionRequirement(Permission[] permissions)
    : IAuthorizationRequirement
{
    public Permission[] Permissions { get; set; } = permissions;
}