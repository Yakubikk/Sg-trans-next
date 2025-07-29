using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using WebApp.Abstractions.Services;
using WebApp.Data.Enums;
using WebApp.Endpoints;
using WebApp.Endpoints.RailwayCisterns;
using WebApp.Endpoints.References;
using WebApp.Services;
using WebApp.Services.Authentication;

namespace WebApp.Extensions;

public static class ApiExtensions
{
    public static void AddMappedEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapUsersEndpoints();
        
        // Reference endpoints (справочники)
        app.MapGasContractEndpoints();
        app.MapStationEndpoints();
        //app.MapRepairTypeEndpoints();
        app.MapRepairEndpoints();
        app.MapRailwayEndpoints();
        app.MapCountryEndpoints();
        app.MapWagonEndpoints();
        //app.MapDepotEndpoints();
        app.MapEmployeeEndpoints();
        app.MapDefectEndpoints();
        app.MapFaultEndpoints();
        app.MapEuroCostEndpoints();
        app.MapModelVCEndpoints();
        app.MapVcTypeEndpoints();
        app.MapStampEndpoints();
        app.MapReferenceStationEndpoints();
        app.MapAbsorberDeviceEndpoints();
        app.MapAbsorberDevice1Endpoints();
        app.MapAbsorberDeviceAccountingEndpoints();
        app.MapAirDistributorEndpoints();
        app.MapBrakeEndpoints();
        app.MapCargoEndpoints();
        app.MapClientEndpoints();
        app.MapContractEndpoints();
        app.MapCostEndpoints();
        app.MapModernizationEndpoints();
        app.MapPartEndpoints();
        app.MapReasonEndpoints();

        // Railway cisterns endpoints
        app.MapRailwayCisternEndpoints();
        app.MapRepairTypeEndpoints();
        app.MapManufacturerEndpoints();
        app.MapWagonModelEndpoints();
        app.MapWagonTypeEndpoints();
        app.MapRegistrarEndpoints();
        app.MapOwnerEndpoints();
        app.MapAffiliationEndpoints();
        app.MapMilageCisternEndpoints();
        app.MapLocationEndpoints();
        app.MapDepotEndpoints();
    }

    public static void AddApiAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtOptions!.SecretKey))
                };
            });

        services.AddScoped<IPermissionService, PermissionService>();
        services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
    }

    public static IEndpointConventionBuilder RequirePermissions<TBuilder>(
        this TBuilder builder, params Permission[] permissions)
            where TBuilder : IEndpointConventionBuilder
    {
        return builder
            .RequireAuthorization(pb =>
                pb.AddRequirements(new PermissionRequirement(permissions)));
    }
}