using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;
using Persistence.Repositories.Repairs;

namespace Persistence;

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

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAbsorberDeviceRepository, AbsorberDeviceRepository>();
        services.AddScoped<IAbsorberDevice1Repository, AbsorberDevice1Repository>();
        services.AddScoped<IAbsorberDeviceAccountingRepository, AbsorberDeviceAccountingRepository>();
        services.AddScoped<IAirDistributorRepository, AirDistributorRepository>();
        services.AddScoped<IBrakeRepository, BrakeRepository>();
        services.AddScoped<ICargoRepository, CargoRepository>();
        services.AddScoped<IClientRepository, ClientRepository>();
        services.AddScoped<IContractRepository, ContractRepository>();
        services.AddScoped<ICostRepository, CostRepository>();
        services.AddScoped<ICountryRepository, CountryRepository>();
        services.AddScoped<IDefectRepository, DefectRepository>();
        services.AddScoped<IDepotRepository, DepotRepository>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<IEuroCostRepository, EuroCostRepository>();
        services.AddScoped<IFaultRepository, FaultRepository>();
        services.AddScoped<IGasContractRepository, GasContractRepository>();
        services.AddScoped<IModelVCRepository, ModelVCRepository>();
        services.AddScoped<IModernizationRepository, ModernizationRepository>();
        services.AddScoped<IPartRepository, PartRepository>();
        services.AddScoped<IRailwayRepository, RailwayRepository>();
        services.AddScoped<IReasonRepository, ReasonRepository>();
        services.AddScoped<IReferenceStationRepository, ReferenceStationRepository>();
        services.AddScoped<IRepairRepository, RepairRepository>();
        services.AddScoped<IRepairTypeRepository, RepairTypeRepository>();
        services.AddScoped<IStampRepository, StampRepository>();
        services.AddScoped<IStationRepository, StationRepository>();
        services.AddScoped<IVCTypeRepository, VCTypeRepository>();
        services.AddScoped<IWagonRepository, WagonRepository>();

        return services;
    }
}