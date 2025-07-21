using Microsoft.AspNetCore.Http;

namespace WebApp.Services;

public interface ICurrentUserService
{
    string GetCurrentUserId();
}

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetCurrentUserId()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirst("userId")?.Value ?? string.Empty;
    }
}
