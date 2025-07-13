using Core.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Persistence.Configurations;
using Persistence.Entities;

namespace Persistence;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IServiceProvider serviceProvider) : DbContext(options)
{
    public DbSet<UserEntity> Users { get; set; }

    public DbSet<RoleEntity> Roles { get; set; }
    
    public DbSet<RolePermissionEntity> RolePermissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        
        var builder = modelBuilder.Entity<RolePermissionEntity>();
        //
        // var authOptions = serviceProvider.GetRequiredService<IOptions<AuthorizationOptions>>().Value;
        
        builder.HasKey(r => new { r.RoleId, r.PermissionId });
    
        // builder.HasData(authOptions.RolePermissions
        //     .SelectMany(rp => rp.Permissions
        //         .Select(p => new RolePermissionEntity
        //         {
        //             RoleId = (int)Enum.Parse<Role>(rp.Role),
        //             PermissionId = (int)Enum.Parse<Permission>(p)
        //         }))
        //     .ToArray());

        //modelBuilder.ApplyConfiguration(new RolePermissionConfiguration(authOptions.Value));
    }
}