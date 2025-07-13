using Microsoft.Extensions.DependencyInjection;
using UseCases.Services;

namespace UseCases;

public static class ApplicationExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<UserService>();

        return services;
    }
}