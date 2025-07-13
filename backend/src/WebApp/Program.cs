using Core.Abstractions.Auth;
using Infrastructure;
using Infrastructure.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.OpenApi.Models;
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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AspireApp API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Заголовок авторизации JWT с использованием схемы Bearer. Пример: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            []
        }
    });
});

services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
services.Configure<AuthorizationOptions>(configuration.GetSection(nameof(AuthorizationOptions)));

services
    .AddPersistence(configuration)
    .AddApplication()
    .AddInfrastructure();

services.AddAuthorization();

builder.Services.AddProblemDetails();

services.AddAutoMapper(typeof(DataBaseMappings));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI(); 

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
