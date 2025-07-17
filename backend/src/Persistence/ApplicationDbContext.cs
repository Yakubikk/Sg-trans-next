using Core.Repairs;
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

    // Repair entities
    public DbSet<AbsorberDevice> AbsorberDevices { get; set; }
    public DbSet<AbsorberDevice1> AbsorberDevices1 { get; set; }
    public DbSet<AbsorberDeviceAccounting> AbsorberDeviceAccountings { get; set; }
    public DbSet<AirDistributor> AirDistributors { get; set; }
    public DbSet<Brake> Brakes { get; set; }
    public DbSet<Cargo> Cargos { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Contract> Contracts { get; set; }
    public DbSet<Cost> Costs { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Defect> Defects { get; set; }
    public DbSet<Depot> Depots { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<EuroCost> EuroCosts { get; set; }
    public DbSet<Fault> Faults { get; set; }
    public DbSet<GasContract> GasContracts { get; set; }
    public DbSet<ModelVC> ModelVCs { get; set; }
    public DbSet<Modernization> Modernizations { get; set; }
    public DbSet<Part> Parts { get; set; }
    public DbSet<Railway> Railways { get; set; }
    public DbSet<Reason> Reasons { get; set; }
    public DbSet<ReferenceStation> ReferenceStations { get; set; }
    public DbSet<Repair> Repairs { get; set; }
    public DbSet<RepairType> RepairTypes { get; set; }
    public DbSet<Stamp> Stamps { get; set; }
    public DbSet<Station> Stations { get; set; }
    public DbSet<VCType> VCTypes { get; set; }
    public DbSet<Wagon> Wagons { get; set; }

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