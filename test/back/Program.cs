using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using back.Models;
using back.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Добавляем Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SG Trans API",
        Version = "v1.0",
        Description = "API для управления железнодорожными цистернами и деталями",
        Contact = new OpenApiContact
        {
            Name = "SG Trans Support",
            Email = "support@sgtrans.by"
        }
    });

    // Настройка JWT аутентификации для Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
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
            new string[] {}
        }
    });

    // Включаем XML комментарии
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "back.xml"), true);
    
    // Группировка по тегам
    c.TagActionsBy(api => new[] { api.ActionDescriptor.RouteValues["controller"] ?? "Default" });
    c.DocInclusionPredicate((_, _) => true);
});

// Добавляем поддержку контроллеров
builder.Services.AddControllers();

// Добавляем Entity Framework с PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрируем сервисы
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDataInitializerService, DataInitializerService>();

// Настройка JWT аутентификации
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];
var issuer = jwtSettings["Issuer"];
var audience = jwtSettings["Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!)),
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

// Добавляем CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", corsBuilder =>
    {
        corsBuilder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    // Добавляем Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SG Trans API v1.0");
        c.RoutePrefix = string.Empty; // Swagger UI будет доступен по корневому адресу "/"
        c.DocumentTitle = "SG Trans API Documentation";
        
        // Настройки интерфейса
        c.DefaultModelsExpandDepth(-1); // Скрываем модели по умолчанию
        c.DisplayRequestDuration();
        c.EnableDeepLinking();
        c.EnableFilter();
        c.ShowExtensions();
        
        // Настройки авторизации
        c.EnablePersistAuthorization(); // Сохраняет токен между перезагрузками
    });
}
else
{
    // В продакшене тоже показываем Swagger (можно убрать, если не нужно)
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SG Trans API v1.0");
        c.RoutePrefix = "swagger";
        c.DocumentTitle = "SG Trans API Documentation";
        c.EnablePersistAuthorization();
    });
}

app.UseHttpsRedirection();

// Добавляем CORS
app.UseCors("AllowAll");

// Добавляем аутентификацию и авторизацию
app.UseAuthentication();
app.UseAuthorization();

// Добавляем маршрутизацию контроллеров
app.MapControllers();

app.Run();
