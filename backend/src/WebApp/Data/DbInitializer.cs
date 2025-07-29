using Microsoft.EntityFrameworkCore;
using WebApp.Abstractions.Auth;
using WebApp.Data.Entities.RailwayCisterns;
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
        
        // // Заполняем тестовые данные для железнодорожных цистерн, если таблица пуста
        // if (!context.RailwayCisterns.Any())
        // {
        //     // Создаем производителей
        //     var manufacturers = new[]
        //     {
        //         new Manufacturer
        //         {
        //             Id = Guid.NewGuid(),
        //             Name = "Тихвинский вагоностроительный завод",
        //             Country = "Российская Федерация",
        //             CreatorId = "system"
        //         },
        //         new Manufacturer
        //         {
        //             Id = Guid.NewGuid(),
        //             Name = "Алтайвагон",
        //             Country = "Российская Федерация", 
        //             CreatorId = "system"
        //         }
        //     };
        //     
        //     await context.Manufacturers.AddRangeAsync(manufacturers);
        //     
        //     // Создаем типы вагонов
        //     var wagonTypes = new[]
        //     {
        //         new WagonType
        //         {
        //             Id = Guid.NewGuid(),
        //             Name = "Цистерна для нефтепродуктов"
        //         },
        //         new WagonType
        //         {
        //             Id = Guid.NewGuid(),
        //             Name = "Цистерна для химических грузов"
        //         }
        //     };
        //     
        //     await context.WagonTypes.AddRangeAsync(wagonTypes);
        //     await context.SaveChangesAsync();
        //
        //     var testRailwayCisterns = new[]
        //     {
        //         new RailwayCistern
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = "12345678",
        //             ManufacturerId = manufacturers[0].Id,
        //             BuildDate = DateOnly.FromDateTime(DateTime.Parse("2020-05-15")),
        //             TareWeight = 22.3m,
        //             LoadCapacity = 68.5m,
        //             Length = 14000,
        //             AxleCount = 4,
        //             Volume = 75.0m,
        //             FillingVolume = 73.5m,
        //             InitialTareWeight = 22.0m,
        //             TypeId = wagonTypes[0].Id,
        //             SerialNumber = "001234",
        //             RegistrationNumber = "RU-123456",
        //             RegistrationDate = DateOnly.FromDateTime(DateTime.Parse("2020-06-01")),
        //             Notes = "Тестовая цистерна для нефтепродуктов",
        //             CreatorId = "system"
        //         },
        //         new RailwayCistern
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = "87654321",
        //             ManufacturerId = manufacturers[1].Id,
        //             BuildDate = DateOnly.FromDateTime(DateTime.Parse("2019-08-20")),
        //             TareWeight = 24.5m,
        //             LoadCapacity = 70.0m,
        //             Length = 13500,
        //             AxleCount = 4,
        //             Volume = 78.0m,
        //             FillingVolume = 76.0m,
        //             InitialTareWeight = 24.2m,
        //             TypeId = wagonTypes[1].Id,
        //             SerialNumber = "005678",
        //             RegistrationNumber = "RU-789123",
        //             RegistrationDate = DateOnly.FromDateTime(DateTime.Parse("2019-09-15")),
        //             Notes = "Тестовая цистерна для химических грузов",
        //             CreatorId = "system"
        //         },
        //         new RailwayCistern
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = "11111111",
        //             ManufacturerId = manufacturers[0].Id,
        //             BuildDate = DateOnly.FromDateTime(DateTime.Parse("2021-03-10")),
        //             TareWeight = 21.8m,
        //             LoadCapacity = 65.0m,
        //             Length = 13800,
        //             AxleCount = 4,
        //             Volume = 72.0m,
        //             FillingVolume = 70.5m,
        //             InitialTareWeight = 21.5m,
        //             TypeId = wagonTypes[0].Id,
        //             SerialNumber = "009999",
        //             RegistrationNumber = "RU-111222",
        //             RegistrationDate = DateOnly.FromDateTime(DateTime.Parse("2021-04-01")),
        //             Notes = "Новая цистерна для нефтепродуктов",
        //             CreatorId = "system"
        //         }
        //     };
        //
        //     await context.RailwayCisterns.AddRangeAsync(testRailwayCisterns);
        //     await context.SaveChangesAsync();
        // }
        //
        // // Заполняем тестовые данные для справочника вагонов, если таблица пуста
        // if (!context.Wagons.Any())
        // {
        //     var testWagons = new[]
        //     {
        //         new Wagon
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = 12345678,
        //             Way = "Путь 1",
        //             Assignment = "А",
        //             OwnerId = 1,
        //             RailwayCode = "РЖД001",
        //             LoadCapacity = 68.5,
        //             Tare = 22.3,
        //             CarFactoryNumberId = "12345678",
        //             CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2020-05-15"), DateTimeKind.Utc),
        //             CarBrand = "8-1234",
        //             CarType = "Цистерна",
        //             CarLoadCapacityVol = 65.2,
        //             CarTareVolume = 20.1,
        //             CarFactoryId = 101,
        //             CarAxleLoad = 23,
        //             CarAirDistributor = "ВР483",
        //             CarBrake = "Композит",
        //             CarAbsorberDevice = "Ш-1-ТМ",
        //             CarTele = "18-100",
        //             DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-6), DateTimeKind.Utc),
        //             CarAxles = 4.0,
        //             CarWheelset = "957мм",
        //             RegNumber = "RU-123456",
        //             RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2020-06-01"), DateTimeKind.Utc),
        //             RegNumberOrg = "РЖД",
        //             Capacity = 70.0,
        //             FillingLevel = 0.8m,
        //             CreateDate = DateTime.SpecifyKind(DateTime.Now.AddYears(-1), DateTimeKind.Utc),
        //             CreateUser = "system",
        //             IsActive = true,
        //             Type = "ЦИС",
        //             MileageNorm = 500000,
        //             IsLeased = false,
        //             SUG = "СУГ",
        //             Class = "А",
        //             Pressure = 1.8
        //         },
        //         new Wagon
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = 87654321,
        //             Way = "Путь 2",
        //             Assignment = "Б",
        //             OwnerId = 2,
        //             RailwayCode = "РЖД002",
        //             LoadCapacity = 70.0,
        //             Tare = 24.5,
        //             CarFactoryNumberId = "87654321",
        //             CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2019-08-20"), DateTimeKind.Utc),
        //             CarBrand = "8-5678",
        //             CarType = "Полувагон",
        //             CarLoadCapacityVol = 68.0,
        //             CarTareVolume = 22.0,
        //             CarFactoryId = 102,
        //             CarAxleLoad = 25,
        //             CarAirDistributor = "ВР292",
        //             CarBrake = "Чугунный",
        //             CarAbsorberDevice = "СА-3",
        //             CarTele = "18-194",
        //             DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-3), DateTimeKind.Utc),
        //             CarAxles = 4.0,
        //             CarWheelset = "950мм",
        //             RegNumber = "RU-789123",
        //             RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2019-09-15"), DateTimeKind.Utc),
        //             RegNumberOrg = "РЖД",
        //             Capacity = 72.5,
        //             FillingLevel = 0.0m,
        //             CreateDate = DateTime.SpecifyKind(DateTime.Now.AddYears(-1), DateTimeKind.Utc),
        //             CreateUser = "system",
        //             IsActive = true,
        //             Type = "ПОЛ",
        //             MileageNorm = 600000,
        //             IsLeased = true,
        //             Class = "Б",
        //             Pressure = 0.0
        //         },
        //         new Wagon
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = 11111111,
        //             Way = "Путь 3",
        //             Assignment = "В",
        //             OwnerId = 1,
        //             RailwayCode = "РЖД003",
        //             LoadCapacity = 65.0,
        //             Tare = 21.8,
        //             CarFactoryNumberId = "11111111",
        //             CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2021-03-10"), DateTimeKind.Utc),
        //             CarBrand = "8-9999",
        //             CarType = "Крытый",
        //             CarLoadCapacityVol = 62.0,
        //             CarTareVolume = 19.5,
        //             CarFactoryId = 103,
        //             CarAxleLoad = 22,
        //             CarAirDistributor = "ВР483",
        //             CarBrake = "Композит",
        //             CarAbsorberDevice = "Ш-2-В",
        //             CarTele = "18-578",
        //             DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-1), DateTimeKind.Utc),
        //             CarAxles = 4.0,
        //             CarWheelset = "957мм",
        //             RegNumber = "RU-111222",
        //             RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2021-04-01"), DateTimeKind.Utc),
        //             RegNumberOrg = "РЖД",
        //             Capacity = 67.0,
        //             FillingLevel = 0.5m,
        //             CreateDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-8), DateTimeKind.Utc),
        //             CreateUser = "system",
        //             IsActive = true,
        //             Type = "КРЫ",
        //             MileageNorm = 550000,
        //             IsLeased = false,
        //             Class = "В",
        //             Pressure = 0.0
        //         },
        //         new Wagon
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = 22222222,
        //             Way = "Путь 4",
        //             Assignment = "Г",
        //             OwnerId = 3,
        //             RailwayCode = "РЖД004",
        //             LoadCapacity = 72.0,
        //             Tare = 25.2,
        //             CarFactoryNumberId = "22222222",
        //             CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2018-11-05"), DateTimeKind.Utc),
        //             CarBrand = "8-2222",
        //             CarType = "Платформа",
        //             CarLoadCapacityVol = 70.0,
        //             CarTareVolume = 23.5,
        //             CarFactoryId = 104,
        //             CarAxleLoad = 24,
        //             CarAirDistributor = "ВР292",
        //             CarBrake = "Композит",
        //             CarAbsorberDevice = "Ш-1-ТМ",
        //             CarTele = "18-100",
        //             DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-9), DateTimeKind.Utc),
        //             CarAxles = 4.0,
        //             CarWheelset = "950мм",
        //             RegNumber = "RU-222333",
        //             RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2018-12-01"), DateTimeKind.Utc),
        //             RegNumberOrg = "РЖД",
        //             Capacity = 75.0,
        //             FillingLevel = 0.0m,
        //             CreateDate = DateTime.SpecifyKind(DateTime.Now.AddYears(-2), DateTimeKind.Utc),
        //             CreateUser = "system",
        //             IsActive = true,
        //             Type = "ПЛА",
        //             MileageNorm = 700000,
        //             IsLeased = true,
        //             Class = "Г",
        //             Pressure = 0.0
        //         },
        //         new Wagon
        //         {
        //             Id = Guid.NewGuid(),
        //             Number = 33333333,
        //             Way = "Путь 5",
        //             Assignment = "Д",
        //             OwnerId = 2,
        //             RailwayCode = "РЖД005",
        //             LoadCapacity = 60.0,
        //             Tare = 19.5,
        //             CarFactoryNumberId = "33333333",
        //             CarConstructionDate = DateTime.SpecifyKind(DateTime.Parse("2022-07-15"), DateTimeKind.Utc),
        //             CarBrand = "8-3333",
        //             CarType = "Хоппер",
        //             CarLoadCapacityVol = 58.0,
        //             CarTareVolume = 17.8,
        //             CarFactoryId = 105,
        //             CarAxleLoad = 21,
        //             CarAirDistributor = "ВР483",
        //             CarBrake = "Чугунный",
        //             CarAbsorberDevice = "СА-3",
        //             CarTele = "18-194",
        //             DocDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-2), DateTimeKind.Utc),
        //             CarAxles = 4.0,
        //             CarWheelset = "957мм",
        //             RegNumber = "RU-333444",
        //             RegNumberDate = DateTime.SpecifyKind(DateTime.Parse("2022-08-10"), DateTimeKind.Utc),
        //             RegNumberOrg = "РЖД",
        //             Capacity = 62.0,
        //             FillingLevel = 0.3m,
        //             CreateDate = DateTime.SpecifyKind(DateTime.Now.AddMonths(-4), DateTimeKind.Utc),
        //             CreateUser = "system",
        //             IsActive = true,
        //             Type = "ХОП",
        //             MileageNorm = 480000,
        //             IsLeased = false,
        //             Class = "Д",
        //             Pressure = 0.0
        //         }
        //     };

            // await context.Wagons.AddRangeAsync(testWagons);
        //     await context.SaveChangesAsync();
        // }
    }
}