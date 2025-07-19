using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Data.Entities.References;
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
        
        // Register repositories for references
        services.AddScoped<BaseRepository<AbsorberDevice1>>();
        services.AddScoped<BaseRepository<AbsorberDevice>>();
        services.AddScoped<BaseRepository<AbsorberDeviceAccounting>>();
        services.AddScoped<BaseRepository<AirDistributor>>();
        services.AddScoped<BaseRepository<Brake>>();
        services.AddScoped<BaseRepository<Cargo>>();
        services.AddScoped<BaseRepository<Client>>();
        services.AddScoped<BaseRepository<Contract>>();
        services.AddScoped<BaseRepository<Cost>>();
        services.AddScoped<BaseRepository<Country>>();
        services.AddScoped<BaseRepository<Defect>>();
        services.AddScoped<BaseRepository<Depot>>();
        services.AddScoped<BaseRepository<Employee>>();
        services.AddScoped<BaseRepository<EuroCost>>();
        services.AddScoped<BaseRepository<Fault>>();
        services.AddScoped<BaseRepository<GasContract>>();
        services.AddScoped<BaseRepository<ModelVC>>();
        services.AddScoped<BaseRepository<Modernization>>();
        services.AddScoped<BaseRepository<Part>>();
        services.AddScoped<BaseRepository<Railway>>();
        services.AddScoped<BaseRepository<Reason>>();
        services.AddScoped<BaseRepository<ReferenceStation>>();
        services.AddScoped<BaseRepository<Repair>>();
        services.AddScoped<BaseRepository<RepairType>>();
        services.AddScoped<BaseRepository<Stamp>>();
        services.AddScoped<BaseRepository<Station>>();
        services.AddScoped<BaseRepository<VCType>>();
        services.AddScoped<BaseRepository<Wagon>>();
        
        return services;
    }
}