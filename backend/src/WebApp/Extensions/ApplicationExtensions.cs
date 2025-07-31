using WebApp.Features.Users.Delete;
using WebApp.Features.Users.GetCurrent;
using WebApp.Features.Users.GetPermissions;
using WebApp.Features.Users.Login;
using WebApp.Features.Users.RefreshToken;
using WebApp.Features.Users.Register;
using WebApp.Features.Users.Update;
using WebApp.Features.Users.UpdateRoles;

namespace WebApp.Extensions;

public static class ApplicationExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // User Use Cases
        services.AddScoped<RegisterUserUseCase>();
        services.AddScoped<LoginUseCase>();
        services.AddScoped<UpdateUserUseCase>();
        services.AddScoped<UpdateUserRolesUseCase>();
        services.AddScoped<DeleteUserUseCase>();
        services.AddScoped<RefreshTokenUseCase>();
        services.AddScoped<GetUserPermissionsUseCase>();
        services.AddScoped<GetCurrentUserUseCase>();
        
        
        return services;
    }
}