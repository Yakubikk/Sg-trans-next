using Microsoft.EntityFrameworkCore;
using WebApp.Abstractions.Auth;
using WebApp.Data.Entities.Users;
using WebApp.Data.Enums;

namespace WebApp.Data;

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
            
            const string adminPassword = "Admin123!";
            var adminPasswordHash = passwordHasher.Generate(adminPassword);
            
            var admin = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "Admin",
                LastName = "Adminovich",
                Patronymic = "User",
                PhoneNumber = "+1234567890",
                Email = "admin@wagon.com",
                PasswordHash = adminPasswordHash,
                Roles = [adminRole]
            };

            await context.Users.AddAsync(admin);
            await context.SaveChangesAsync();
        }

        if (await context.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == "user@wagon.com") is null)
        {
            var userRole = await context.Roles
                               .SingleOrDefaultAsync(r => r.Id == (int)Role.User)
                           ?? throw new InvalidOperationException();
            
            const string userPassword = "User123!";
            var userPasswordHash = passwordHasher.Generate(userPassword);
            
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "User",
                LastName = "Polsovatelev",
                Patronymic = "User",
                PhoneNumber = "+1234567890",
                Email = "user@wagon.com",
                PasswordHash = userPasswordHash,
                Roles = [userRole]
            };
            
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
        
        // Заполняем RolePermissionEntity, если таблица пуста
        if (!context.RolePermissions.Any())
        {
            context.RolePermissions.AddRange(
                new RolePermission { RoleId = 2, PermissionId = 1 }, 
                new RolePermission { RoleId = 1, PermissionId = 1 }, 
                new RolePermission { RoleId = 1, PermissionId = 2 }, 
                new RolePermission { RoleId = 1, PermissionId = 3 }, 
                new RolePermission { RoleId = 1, PermissionId = 4 });

            await context.SaveChangesAsync();
        }
    }
}