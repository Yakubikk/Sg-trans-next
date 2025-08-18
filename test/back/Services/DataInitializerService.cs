using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Services;

public interface IDataInitializerService
{
    Task InitializeAsync();
}

public class DataInitializerService(ApplicationDbContext context, ILogger<DataInitializerService> logger) : IDataInitializerService
{
    private readonly ApplicationDbContext _context = context;
    private readonly ILogger<DataInitializerService> _logger = logger;

  public async Task InitializeAsync()
    {
        try
        {
            // Проверяем подключение к базе данных
            await _context.Database.CanConnectAsync();
            _logger.LogInformation("Начинаем инициализацию данных...");

            await InitializePermissionsAsync();
            await InitializeRolesAsync();
            await CreateDefaultAdminAsync();

            _logger.LogInformation("Инициализация данных завершена успешно");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при инициализации данных");
            throw;
        }
    }

    private async Task InitializePermissionsAsync()
    {
        var permissions = new[]
        {
            // Разрешения для цистерн
            "cisterns.read",
            "cisterns.create", 
            "cisterns.update",
            "cisterns.delete",
            
            // Разрешения для пользователей
            "users.read",
            "users.create",
            "users.update", 
            "users.delete",
            
            // Разрешения для деталей
            "parts.read",
            "parts.create",
            "parts.update",
            "parts.delete",
            
            // Разрешения для ремонтов
            "repairs.read",
            "repairs.create", 
            "repairs.update",
            "repairs.delete",
            
            // Разрешения для справочников - общие
            "references.read",
            "references.update",
            
            // Разрешения для справочника "Принадлежности"
            "affiliations.read",
            "affiliations.create",
            "affiliations.update",
            "affiliations.delete",
            
            // Разрешения для справочника "Депо"
            "depots.read",
            "depots.create",
            "depots.update",
            "depots.delete",
            
            // Разрешения для справочника "Локации"
            "locations.read",
            "locations.create",
            "locations.update",
            "locations.delete",
            
            // Разрешения для справочника "Производители"
            "manufacturers.read",
            "manufacturers.create",
            "manufacturers.update",
            "manufacturers.delete",
            
            // Разрешения для справочника "Владельцы"
            "owners.read",
            "owners.create",
            "owners.update",
            "owners.delete",
            
            // Разрешения для справочника "Статусы деталей"
            "partstatuses.read",
            "partstatuses.create",
            "partstatuses.update",
            "partstatuses.delete",
            
            // Разрешения для справочника "Типы деталей"
            "parttypes.read",
            "parttypes.create",
            "parttypes.update",
            "parttypes.delete",
            
            // Разрешения для справочника "Регистраторы"
            "registrars.read",
            "registrars.create",
            "registrars.update",
            "registrars.delete",
            
            // Разрешения для справочника "Типы ремонтов"
            "repairtypes.read",
            "repairtypes.create",
            "repairtypes.update",
            "repairtypes.delete",
            
            // Разрешения для справочника "Типы вагонов"
            "wagontypes.read",
            "wagontypes.create",
            "wagontypes.update",
            "wagontypes.delete",
            
            // Разрешения для справочника "Модели вагонов"
            "wagonmodels.read",
            "wagonmodels.create",
            "wagonmodels.update",
            "wagonmodels.delete",
            
            // Административные разрешения
            "admin.full",
            "admin.reports",
            "admin.settings"
        };

        // Используем AsNoTracking для избежания конфликтов отслеживания
        var existingPermissions = await _context.PermissionEntities
            .AsNoTracking()
            .Select(p => p.Name)
            .ToListAsync();

        var newPermissions = new List<PermissionEntity>();
        
        foreach (var permName in permissions)
        {
            if (!existingPermissions.Contains(permName))
            {
                var newPermission = new PermissionEntity
                {
                    // Убираем ручное назначение ID - пусть база данных сама генерирует
                    Name = permName
                };

                newPermissions.Add(newPermission);
                _logger.LogInformation($"Будет добавлено разрешение: {permName}");
            }
        }

        if (newPermissions.Any())
        {
            _context.PermissionEntities.AddRange(newPermissions);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Добавлено {newPermissions.Count} новых разрешений");
        }

        // Очищаем отслеживание после сохранения
        _context.ChangeTracker.Clear();
    }

    private async Task InitializeRolesAsync()
    {
        var rolesData = new[]
        {
            new 
            { 
                Name = "Admin", 
                Permissions = new[] 
                { 
                    "admin.full", "users.create", "users.read", "users.update", "users.delete",
                    "cisterns.read", "cisterns.create", "cisterns.update", "cisterns.delete",
                    "parts.read", "parts.create", "parts.update", "parts.delete",
                    "repairs.read", "repairs.create", "repairs.update", "repairs.delete",
                    "references.read", "references.update", "admin.reports", "admin.settings",
                    // Все справочники - полные права
                    "affiliations.read", "affiliations.create", "affiliations.update", "affiliations.delete",
                    "depots.read", "depots.create", "depots.update", "depots.delete",
                    "locations.read", "locations.create", "locations.update", "locations.delete",
                    "manufacturers.read", "manufacturers.create", "manufacturers.update", "manufacturers.delete",
                    "owners.read", "owners.create", "owners.update", "owners.delete",
                    "partstatuses.read", "partstatuses.create", "partstatuses.update", "partstatuses.delete",
                    "parttypes.read", "parttypes.create", "parttypes.update", "parttypes.delete",
                    "registrars.read", "registrars.create", "registrars.update", "registrars.delete",
                    "repairtypes.read", "repairtypes.create", "repairtypes.update", "repairtypes.delete",
                    "wagontypes.read", "wagontypes.create", "wagontypes.update", "wagontypes.delete",
                    "wagonmodels.read", "wagonmodels.create", "wagonmodels.update", "wagonmodels.delete"
                }
            },
            new 
            { 
                Name = "Manager", 
                Permissions = new[] 
                { 
                    "cisterns.read", "cisterns.create", "cisterns.update",
                    "parts.read", "parts.create", "parts.update",
                    "repairs.read", "repairs.create", "repairs.update",
                    "references.read", "admin.reports",
                    // Справочники - чтение и редактирование
                    "affiliations.read", "affiliations.update",
                    "depots.read", "depots.update",
                    "locations.read", "locations.update",
                    "manufacturers.read", "manufacturers.update",
                    "owners.read", "owners.update",
                    "partstatuses.read", "partstatuses.update",
                    "parttypes.read", "parttypes.update",
                    "registrars.read", "registrars.update",
                    "repairtypes.read", "repairtypes.update",
                    "wagontypes.read", "wagontypes.update",
                    "wagonmodels.read", "wagonmodels.update"
                }
            },
            new 
            { 
                Name = "Operator", 
                Permissions = new[] 
                { 
                    "cisterns.read", "cisterns.update",
                    "parts.read", "parts.update",
                    "repairs.read", "repairs.create", "repairs.update",
                    "references.read",
                    // Справочники - только чтение
                    "affiliations.read",
                    "depots.read",
                    "locations.read",
                    "manufacturers.read",
                    "owners.read",
                    "partstatuses.read",
                    "parttypes.read",
                    "registrars.read",
                    "repairtypes.read",
                    "wagontypes.read",
                    "wagonmodels.read"
                }
            },
            new 
            { 
                Name = "Viewer", 
                Permissions = new[] 
                { 
                    "cisterns.read", "parts.read", "repairs.read", "references.read",
                    // Справочники - только чтение
                    "affiliations.read",
                    "depots.read",
                    "locations.read",
                    "manufacturers.read",
                    "owners.read",
                    "partstatuses.read",
                    "parttypes.read",
                    "registrars.read",
                    "repairtypes.read",
                    "wagontypes.read",
                    "wagonmodels.read"
                }
            }
        };

        foreach (var roleData in rolesData)
        {
            await CreateOrUpdateRoleAsync(roleData.Name, roleData.Permissions);
        }
    }

    private async Task CreateOrUpdateRoleAsync(string roleName, string[] permissionNames)
    {
        // Очищаем отслеживание перед началом работы с ролью
        _context.ChangeTracker.Clear();
        
        try
        {
            // Проверяем существование роли без отслеживания
            var existingRole = await _context.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Name == roleName);

            Role? role;
            if (existingRole == null)
            {
                // Создаем новую роль без ручного назначения ID
                role = new Role
                {
                    Name = roleName
                };
                _context.Roles.Add(role);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Создана роль: {roleName}");
            }
            else
            {
                // Получаем роль для отслеживания
                role = await _context.Roles.FindAsync(existingRole.Id);
                if (role == null)
                {
                    _logger.LogError($"Не удалось найти роль с ID {existingRole.Id}");
                    return;
                }
                _logger.LogInformation($"Обновляется роль: {roleName}");
            }

            // role не может быть null здесь, так как мы создали новую или получили существующую

            // Получаем все разрешения без отслеживания
            var allPermissions = await _context.PermissionEntities
                .AsNoTracking()
                .Where(p => permissionNames.Contains(p.Name))
                .ToListAsync();

            if (allPermissions.Count != permissionNames.Length)
            {
                var foundNames = allPermissions.Select(p => p.Name).ToArray();
                var missingPermissions = permissionNames.Except(foundNames).ToArray();
                _logger.LogWarning($"Не найдены разрешения для роли {roleName}: {string.Join(", ", missingPermissions)}");
            }

            // Загружаем существующие разрешения для роли
            await _context.Entry(role)
                .Collection(r => r.Permissions)
                .LoadAsync();

            // Очищаем существующие разрешения
            role.Permissions.Clear();

            // Добавляем новые разрешения
            foreach (var permission in allPermissions)
            {
                // Получаем отслеживаемую версию разрешения
                var trackedPermission = await _context.PermissionEntities.FindAsync(permission.Id);
                if (trackedPermission != null)
                {
                    role.Permissions.Add(trackedPermission);
                }
            }

            await _context.SaveChangesAsync();
            _logger.LogInformation($"Роль {roleName} настроена с {role.Permissions.Count} разрешениями");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Ошибка при создании/обновлении роли {roleName}");
            throw;
        }
        finally
        {
            // Очищаем отслеживание после завершения работы с ролью
            _context.ChangeTracker.Clear();
        }
    }

    private async Task CreateDefaultAdminAsync()
    {
        var adminEmail = "admin@sgtrans.by";
        
        // Очищаем отслеживание перед началом
        _context.ChangeTracker.Clear();
        
        // Проверяем существование администратора без отслеживания
        var existingAdmin = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == adminEmail);

        if (existingAdmin == null)
        {
            // Получаем роль Admin без отслеживания
            var adminRole = await _context.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Name == "Admin");

            if (adminRole != null)
            {
                var adminUser = new User
                {
                    Id = Guid.NewGuid(),
                    Email = adminEmail,
                    FirstName = "Администратор",
                    LastName = "Системы",
                    Patronymic = "",
                    PhoneNumber = "+375000000000",
                    PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword("Admin123!")
                };

                _context.Users.Add(adminUser);
                await _context.SaveChangesAsync();

                // Получаем отслеживаемые версии для связи
                var trackedUser = await _context.Users.FindAsync(adminUser.Id);
                var trackedRole = await _context.Roles.FindAsync(adminRole.Id);

                if (trackedUser != null && trackedRole != null)
                {
                    // Загружаем коллекцию ролей пользователя
                    await _context.Entry(trackedUser)
                        .Collection(u => u.Roles)
                        .LoadAsync();

                    trackedUser.Roles.Add(trackedRole);
                    await _context.SaveChangesAsync();
                }

                _logger.LogInformation($"Создан администратор по умолчанию: {adminEmail}");
                _logger.LogWarning("ВАЖНО: Смените пароль администратора по умолчанию (Admin123!)");
            }
            else
            {
                _logger.LogWarning("Роль Admin не найдена, администратор не создан");
            }
        }
        else
        {
            _logger.LogInformation($"Администратор {adminEmail} уже существует");
        }

        // Финальная очистка отслеживания
        _context.ChangeTracker.Clear();
    }
}
