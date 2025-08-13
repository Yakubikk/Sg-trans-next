using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace back.Attributes;

public class RequirePermissionAttribute(string permission) : Attribute, IAuthorizationFilter
{
    private readonly string _permission = permission;

  public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.User.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var permissions = context.HttpContext.User.Claims
            .Where(c => c.Type == "Permission")
            .Select(c => c.Value)
            .ToList();

        if (!permissions.Contains(_permission))
        {
            context.Result = new ForbidResult();
        }
    }
}

public class RequireRoleAttribute(string role) : Attribute, IAuthorizationFilter
{
    private readonly string _role = role;

  public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.User.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        if (!context.HttpContext.User.IsInRole(_role))
        {
            context.Result = new ForbidResult();
        }
    }
}
