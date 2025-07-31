using Microsoft.OpenApi.Models;
using WebApp.Extensions;
using WebApp.Abstractions.Auth;
using WebApp.Data;
using WebApp.Endpoints.RailwayCisterns;
using WebApp.Services;
using WebApp.Services.Authentication;


var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.AddApiAuthentication(configuration);

services.AddEndpointsApiExplorer();

// Добавляем CORS
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
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

services.AddHttpContextAccessor();
services.AddScoped<ICurrentUserService, CurrentUserService>();

services
    .AddPersistence(configuration)
    .AddApplication()
    .AddInfrastructure();

services.AddAuthorization();

builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.AddMappedEndpoints();

// using (var scope = app.Services.CreateScope())
// {
//     var scopeServiceProvider = scope.ServiceProvider;
//     try
//     {
//         var context = scopeServiceProvider.GetRequiredService<ApplicationDbContext>();
//         var passwordHasher = scopeServiceProvider.GetRequiredService<IPasswordHasher>();
//
//         await DbInitializer.Initialize(context, passwordHasher);
//     }
//     catch (Exception ex)
//     {
//         var logger = scopeServiceProvider.GetRequiredService<ILogger<Program>>();
//         logger.LogError(ex, "Произошла ошибка при заполнении базы данных.");
//     }
// }

app.Run();
