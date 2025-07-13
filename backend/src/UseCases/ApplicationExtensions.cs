using Microsoft.Extensions.DependencyInjection;
using UseCases.Users.Delete;
using UseCases.Users.GetCurrent;
using UseCases.Users.GetPermissions;
using UseCases.Users.Login;
using UseCases.Users.RefreshToken;
using UseCases.Users.Register;
using UseCases.Users.Update;
using UseCases.Users.UpdateRoles;

namespace UseCases;

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