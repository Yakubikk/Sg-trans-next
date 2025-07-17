using Core.Repairs;
using Microsoft.Extensions.DependencyInjection;
using UseCases.Services.Repairs;
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


        services.AddScoped<AbsorberDevice1Service>();
        services.AddScoped<AbsorberDeviceService>();
        services.AddScoped<AbsorberDeviceAccountingService>();
        services.AddScoped<AirDistributorService>();
        services.AddScoped<BrakeService>();
        services.AddScoped<CargoService>();
        services.AddScoped<ClientService>();
        services.AddScoped<ContractService>();
        services.AddScoped<CostService>();
        services.AddScoped<CountryService>();
        services.AddScoped<DefectService>();
        services.AddScoped<DepotService>();
        services.AddScoped<EmployeeService>();
        services.AddScoped<EuroCostService>();
        services.AddScoped<FaultService>();
        services.AddScoped<GasContractService>();
        services.AddScoped<ModelVCService>();
        services.AddScoped<ModernizationService>();
        services.AddScoped<PartService>();
        services.AddScoped<RailwayService>();
        services.AddScoped<ReasonService>();
        services.AddScoped<ReferenceStationService>();
        services.AddScoped<RepairService>();
        services.AddScoped<RepairTypeService>();
        services.AddScoped<StampService>();
        services.AddScoped<StampService>();
        services.AddScoped<VCTypeService>();
        services.AddScoped<WagonService>();
        
        
        return services;
    }
}