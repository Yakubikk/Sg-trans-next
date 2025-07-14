using AutoMapper;
using Core.Abstractions.Repositories;
using Core.Users;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserRepository(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task AddAsync(User user)
    {
        var roleEntity = await _context.Roles
                             .SingleOrDefaultAsync(r => r.Id == (int)Role.User)
                         ?? throw new InvalidOperationException();

        var userEntity = new UserEntity()
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
            .FirstOrDefaultAsync(u => u.Email == email) ?? throw new Exception();

        return _mapper.Map<User>(userEntity);
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
            .FirstOrDefaultAsync(u => u.Id == userId) ?? throw new Exception();

        return _mapper.Map<User>(userEntity);
    }

    public async Task<ICollection<User>> GetAllUsersAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .Select(u => _mapper.Map<User>(u))
            .ToListAsync();
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        var userEntity = await _context.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == user.Id);
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

        // Обновление ролей
        if (user.Roles != null && user.Roles.Count > 0)
        {
            var roleEntities = await _context.Roles.Where(r => user.Roles.Select(ur => (int)ur).Contains(r.Id)).ToListAsync();
            userEntity.Roles = roleEntities;
        }

        await _context.SaveChangesAsync();
        return _mapper.Map<User>(userEntity);
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