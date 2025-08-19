using Microsoft.AspNetCore.Authorization;
using WebApp.Data.Enums;

namespace WebApp.Services.Authentication;

public class PermissionRequirement(Permission[] permissions)
    : IAuthorizationRequirement
{
    public Permission[] Permissions { get; set; } = permissions;
}