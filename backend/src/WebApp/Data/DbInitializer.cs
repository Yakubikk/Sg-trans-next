using Microsoft.EntityFrameworkCore;
using WebApp.Abstractions.Auth;
using WebApp.Data.Entities.References;
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
            var password = "Admin123!";
            
            var passwordHash = passwordHasher.Generate(password);
            
            var admin = new User
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
                    new RolePermission { RoleId = 2, PermissionId = 1 },
                    new RolePermission { RoleId = 1, PermissionId = 1 },
                    new RolePermission { RoleId = 1, PermissionId = 2 },
                    new RolePermission { RoleId = 1, PermissionId = 3 },
                    new RolePermission { RoleId = 1, PermissionId = 4 },
                });

            context.SaveChanges();
        }
        
        // Заполняем тестовые данные для справочника вагонов, если таблица пуста
        if (!context.Wagons.Any())
        {
            var testWagons = new[]
            {
                new Wagon
                {
                    Id = Guid.NewGuid(),
                    Number = 12345,
                    Way = "Путь 1",
                    Assignment = "А",
                    OwnerId = 1,
                    RailwayCode = "РЖД001",
                    LoadCapacity = 68.5,
                    Tare = 22.3,
                    CarFactoryNumberId = "12345678",
                    CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2020-05-15"), DateTimeKind.Utc),
                    CarBrand = "8-1234",
                    CarType = "Цистерна",
                    CarLoadCapacityVol = 65.2,
                    CarTareVolume = 20.1,
                    CarFactoryId = 101,
                    CarAxleLoad = 23,
                    CarAirDistributor = "ВР483",
                    CarBrake = "Композит",
                    CarAbsorberDevice = "Ш-1-ТМ",
                    CarTele = "18-100",
                    DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-6), DateTimeKind.Utc),
                    CarAxles = 4.0,
                    CarWheelset = "957мм",
                    RegNumber = "RU-123456",
                    RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2020-06-01"), DateTimeKind.Utc),
                    RegNumberOrg = "РЖД",
                    Capacity = 70.0,
                    FillingLevel = 0.8m,
                    CreateDate = DateTime.SpecifyKind(DateTime.Now.AddYears(-1), DateTimeKind.Utc),
                    CreateUser = "system",
                    IsActive = true,
                    Type = "ЦИС",
                    MileageNorm = 500000,
                    IsLeased = false,
                    SUG = "СУГ",
                    Class = "А",
                    Pressure = 1.8
                },
                new Wagon
                {
                    Id = Guid.NewGuid(),
                    Number = 67890,
                    Way = "Путь 2",
                    Assignment = "Б",
                    OwnerId = 2,
                    RailwayCode = "РЖД002",
                    LoadCapacity = 70.0,
                    Tare = 24.5,
                    CarFactoryNumberId = "87654321",
                    CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2019-08-20"), DateTimeKind.Utc),
                    CarBrand = "8-5678",
                    CarType = "Полувагон",
                    CarLoadCapacityVol = 68.0,
                    CarTareVolume = 22.0,
                    CarFactoryId = 102,
                    CarAxleLoad = 25,
                    CarAirDistributor = "ВР292",
                    CarBrake = "Чугунный",
                    CarAbsorberDevice = "СА-3",
                    CarTele = "18-194",
                    DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-3), DateTimeKind.Utc),
                    CarAxles = 4.0,
                    CarWheelset = "950мм",
                    RegNumber = "RU-789123",
                    RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2019-09-15"), DateTimeKind.Utc),
                    RegNumberOrg = "РЖД",
                    Capacity = 72.5,
                    FillingLevel = 0.0m,
                    CreateDate = DateTime.SpecifyKind(DateTime.Now.AddYears(-1), DateTimeKind.Utc),
                    CreateUser = "system",
                    IsActive = true,
                    Type = "ПОЛ",
                    MileageNorm = 600000,
                    IsLeased = true,
                    Class = "Б",
                    Pressure = 0.0
                },
                new Wagon
                {
                    Id = Guid.NewGuid(),
                    Number = 11111,
                    Way = "Путь 3",
                    Assignment = "В",
                    OwnerId = 1,
                    RailwayCode = "РЖД003",
                    LoadCapacity = 65.0,
                    Tare = 21.8,
                    CarFactoryNumberId = "11111111",
                    CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2021-03-10"), DateTimeKind.Utc),
                    CarBrand = "8-9999",
                    CarType = "Крытый",
                    CarLoadCapacityVol = 62.0,
                    CarTareVolume = 19.5,
                    CarFactoryId = 103,
                    CarAxleLoad = 22,
                    CarAirDistributor = "ВР483",
                    CarBrake = "Композит",
                    CarAbsorberDevice = "Ш-2-В",
                    CarTele = "18-578",
                    DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-1), DateTimeKind.Utc),
                    CarAxles = 4.0,
                    CarWheelset = "957мм",
                    RegNumber = "RU-111222",
                    RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2021-04-01"), DateTimeKind.Utc),
                    RegNumberOrg = "РЖД",
                    Capacity = 67.0,
                    CreateDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-8), DateTimeKind.Utc),
                    CreateUser = "system",
                    IsActive = true,
                    Type = "КРЫ",
                    MileageNorm = 400000,
                    IsLeased = false,
                    Class = "В",
                    Pressure = 0.0
                }
            };

            await context.Wagons.AddRangeAsync(testWagons);
            await context.SaveChangesAsync();
        }
    }
}