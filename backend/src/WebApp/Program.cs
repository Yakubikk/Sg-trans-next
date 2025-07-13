using Core.Abstractions.Auth;
using Infrastructure;
using Infrastructure.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using WebApp.Extensions;
using Persistence;
using Persistence.Mappings;
using UseCases;


var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.AddApiAuthentication(configuration);

services.AddEndpointsApiExplorer();

builder.Services.AddOpenApi();

services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
services.Configure<AuthorizationOptions>(configuration.GetSection(nameof(AuthorizationOptions)));

services
    .AddPersistence(configuration)
    .AddApplication()
    .AddInfrastructure();

builder.Services.AddProblemDetails();

services.AddAutoMapper(typeof(DataBaseMappings));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "Car Rent API V1");
    options.RoutePrefix = string.Empty;
}); 

// app.UseHttpsRedirection();

app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
    HttpOnly = HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.Always
});

app.UseAuthentication();

app.UseAuthorization();

app.AddMappedEndpoints();

app.MapGet("get", () =>
{
    return Results.Ok("ok");
}).RequireAuthorization("AdminPolicy");

using (var scope = app.Services.CreateScope())
{
    var scopeServiceProvider = scope.ServiceProvider;
    try
    {
        var context = scopeServiceProvider.GetRequiredService<ApplicationDbContext>();
        var passwordHasher = scopeServiceProvider.GetRequiredService<IPasswordHasher>();

        await DbInitializer.Initialize(context, passwordHasher);
    }
    catch (Exception ex)
    {
        var logger = scopeServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Произошла ошибка при заполнении базы данных.");
    }
}

app.Run();
