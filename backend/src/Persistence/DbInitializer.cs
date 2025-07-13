using Core.Abstractions.Auth;
using Core.Users;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence;

public static class DbInitializer
{
    public static async Task Initialize(
        ApplicationDbContext context, IPasswordHasher passwordHasher)
    {
        // // Создать базу данных, если ее нет
        // await context.Database.EnsureCreatedAsync();
        
        
        if (await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == "admin@wagon.com") is null)
        {
            var adminRole = await context.Roles
                                 .SingleOrDefaultAsync(r => r.Id == (int)Role.Admin)
                             ?? throw new InvalidOperationException();
            var password = "Admin123!";
            
            var passwordHash = passwordHasher.Generate(password);
            
            var admin = new UserEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Admin",
                LastName = "User",
                Patronymic = "Adminovich",
                PhoneNumber = "+1234567890",
                Email = "admin@wagon.com",
                PasswordHash = passwordHash,
                Roles = [adminRole]
            };

            await context.Users.AddAsync(admin);
            await context.SaveChangesAsync();
        }
        
        // Заполняем RolePermissionEntity, если таблица пуста
        if (!context.RolePermissions.Any())
        {
            context.RolePermissions.AddRange(
                new[]
                {
                    new RolePermissionEntity { RoleId = 2, PermissionId = 1 },
                    new RolePermissionEntity { RoleId = 1, PermissionId = 1 },
                    new RolePermissionEntity { RoleId = 1, PermissionId = 2 },
                    new RolePermissionEntity { RoleId = 1, PermissionId = 3 },
                    new RolePermissionEntity { RoleId = 1, PermissionId = 4 },
                });

            context.SaveChanges();
        }
    }
}