using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Repositories;

namespace WebApp.Extensions;

public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<AuthorizationOptions>(configuration.GetSection("Authorization"));
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString(nameof(ApplicationDbContext)));
        });
        services.AddScoped<UserRepository>();
        
        return services;
    }
}