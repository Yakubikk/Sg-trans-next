using Microsoft.EntityFrameworkCore;
using WebApp.Data.Entities.Users;
using WebApp.Data.Enums;

namespace WebApp.Data.Repositories;

public class UserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(User user)
    {
        var roleEntity = await _context.Roles
                             .SingleOrDefaultAsync(r => r.Id == (int)Role.User)
                         ?? throw new InvalidOperationException();

        var userEntity = new User()
        {
            Id = user.Id,
            PasswordHash = user.PasswordHash,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Patronymic = user.Patronymic,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            Roles = [roleEntity]
        };

        await _context.Users.AddAsync(userEntity);
        await _context.SaveChangesAsync();
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        var userEntity = await _context.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Email == email) ?? throw new Exception();

        return userEntity;
    }

    public async Task<HashSet<Permission>> GetUserPermissionsAsync(Guid userId)
    {
        var roles = await _context.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .ThenInclude(r => r.Permissions)
            .Where(u => u.Id == userId)
            .Select(u => u.Roles)
            .ToArrayAsync();

        return roles
            .SelectMany(r => r)
            .SelectMany(r => r.Permissions)
            .Select(p => (Permission)p.Id)
            .ToHashSet();
    }

    public async Task<User> GetUserByIdAsync(Guid userId)
    {
        var userEntity = await _context.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Id == userId) ?? throw new Exception();

        return userEntity;
    }

    public async Task<ICollection<User>> GetAllUsersAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .ToListAsync();
    }

    public async Task<RoleEntity> GetRoleByIdAsync(int roleId)
    {
        return await _context.Roles
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == roleId) ?? throw new InvalidOperationException();
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        var userEntity = await _context.Users
            .Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == user.Id);
        if (userEntity == null)
            throw new Exception("User not found");

        userEntity.FirstName = user.FirstName;
        userEntity.LastName = user.LastName;
        userEntity.Patronymic = user.Patronymic;
        userEntity.PhoneNumber = user.PhoneNumber;
        userEntity.Email = user.Email;
        userEntity.PasswordHash = user.PasswordHash;
        userEntity.RefreshToken = user.RefreshToken;
        userEntity.RefreshTokenExpiry = user.RefreshTokenExpiry;
        userEntity.Roles.Clear();
        foreach (var role in user.Roles)
        {
            var existingRole = await _context.Roles.FindAsync(role.Id);
            if (existingRole != null)
            {
                userEntity.Roles.Add(existingRole);
            }
        }

        await _context.SaveChangesAsync();
        return userEntity;
    }

    public async Task DeleteUserAsync(User user)
    {
        var userEntity = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        if (userEntity == null)
            throw new Exception("User not found");
        _context.Users.Remove(userEntity);
        await _context.SaveChangesAsync();
    }
}