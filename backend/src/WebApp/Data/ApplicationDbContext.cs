using Microsoft.EntityFrameworkCore;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Entities.References;
using WebApp.Data.Entities.Users;

namespace WebApp.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IServiceProvider serviceProvider) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }

    // ReferencesModels
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
    public DbSet<DepotReference> DepotsReferences { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<EuroCost> EuroCosts { get; set; }
    public DbSet<Fault> Faults { get; set; }
    public DbSet<GasContract> GasContracts { get; set; }
    public DbSet<ModelVC> ModelVCs { get; set; }
    public DbSet<Modernization> Modernizations { get; set; }
    public DbSet<PartReference> PartsReferences { get; set; }
    public DbSet<Railway> Railways { get; set; }
    public DbSet<Reason> Reasons { get; set; }
    public DbSet<ReferenceStation> ReferenceStations { get; set; }
    public DbSet<RepairReference> RepairsReferences { get; set; }
    public DbSet<RepairTypeReference> RepairTypesReferences { get; set; }
    public DbSet<Stamp> Stamps { get; set; }
    public DbSet<Station> Stations { get; set; }
    public DbSet<VCType> VCTypes { get; set; }
    public DbSet<Wagon> Wagons { get; set; }
    
    //RailwayCisternsModels
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<RailwayCistern> RailwayCisterns { get; set; }
    public DbSet<WagonType> WagonTypes { get; set; }
    public DbSet<WagonModel> WagonModels { get; set; }
    public DbSet<Registrar> Registrars { get; set; }
    public DbSet<Vessel> Vessels { get; set; }
    public DbSet<Depot> Depots { get; set; }
    public DbSet<Part> Parts { get; set; }
    public DbSet<WheelPair> WheelPairs { get; set; }
    public DbSet<SideFrame> SideFrames { get; set; }
    public DbSet<Bolster> Bolsters { get; set; }
    public DbSet<Coupler> Couplers { get; set; }
    public DbSet<ShockAbsorber> ShockAbsorbers { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<PartInstallation> PartInstallations { get; set; }
    public DbSet<RepairType> RepairTypes { get; set; }
    public DbSet<Repair> Repairs { get; set; }

    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Manufacturer - RailwayCistern связь
        modelBuilder.Entity<Manufacturer>()
            .HasMany(m => m.RailwayCisterns)
            .WithOne(w => w.Manufacturer)
            .HasForeignKey(w => w.ManufacturerId)
            .OnDelete(DeleteBehavior.Cascade);
            
        // WagonType - RailwayCistern связь
        modelBuilder.Entity<WagonType>()
            .HasMany(t => t.RailwayCisterns)
            .WithOne(r => r.Type)
            .HasForeignKey(r => r.TypeId);
            
        // WagonModel - RailwayCistern связь
        modelBuilder.Entity<WagonModel>()
            .HasMany(m => m.RailwayCisterns)
            .WithOne(r => r.Model)
            .HasForeignKey(r => r.ModelId);
            
        // Registrar - RailwayCistern связь
        modelBuilder.Entity<Registrar>()
            .HasMany(r => r.RailwayCisterns)
            .WithOne(c => c.Registrar)
            .HasForeignKey(c => c.RegistrarId);

        // RailwayCistern - Vessel связь один-к-одному
        modelBuilder.Entity<RailwayCistern>()
            .HasOne(r => r.Vessel)
            .WithOne(v => v.RailwayCistern)
            .HasForeignKey<Vessel>(v => v.RailwayCisternId);

        // Part - PartInstallation связь
        modelBuilder.Entity<Part>()
            .HasMany(p => p.PartInstallations)
            .WithOne(i => i.Part)
            .HasForeignKey(i => i.PartId);

        // Part - специальные части (TPH схема наследования)
        modelBuilder.Entity<WheelPair>()
            .HasKey(w => w.PartId);
            
        modelBuilder.Entity<SideFrame>()
            .HasKey(s => s.PartId);
            
        modelBuilder.Entity<Bolster>()
            .HasKey(b => b.PartId);
            
        modelBuilder.Entity<Coupler>()
            .HasKey(c => c.PartId);
            
        modelBuilder.Entity<ShockAbsorber>()
            .HasKey(s => s.PartId);

        // PartInstallation - Location связи
        modelBuilder.Entity<PartInstallation>()
            .HasOne(pi => pi.FromLocation)
            .WithMany(l => l.FromInstallations)
            .HasForeignKey(pi => pi.FromLocationId)
            .IsRequired(false);

        modelBuilder.Entity<PartInstallation>()
            .HasOne(pi => pi.ToLocation)
            .WithMany(l => l.ToInstallations)
            .HasForeignKey(pi => pi.ToLocationId);

        // RailwayCistern - PartInstallation связь
        modelBuilder.Entity<RailwayCistern>()
            .HasMany(r => r.PartInstallations)
            .WithOne(p => p.Wagon)
            .HasForeignKey(p => p.WagonId)
            .IsRequired(false);

        // Depot - Part связь
        modelBuilder.Entity<Depot>()
            .HasMany(d => d.Parts)
            .WithOne(p => p.Depot)
            .HasForeignKey(p => p.DepotId);

        // Repair связи
        modelBuilder.Entity<RepairType>()
            .HasMany(rt => rt.Repairs)
            .WithOne(r => r.RepairType)
            .HasForeignKey(r => r.RepairTypeId);

        modelBuilder.Entity<Part>()
            .HasMany(p => p.Repairs)
            .WithOne(r => r.Part)
            .HasForeignKey(r => r.PartId);

        modelBuilder.Entity<Depot>()
            .HasMany(d => d.Repairs)
            .WithOne(r => r.Depot)
            .HasForeignKey(r => r.DepotId);
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        
        var builder = modelBuilder.Entity<RolePermission>();
        
        builder.HasKey(r => new { r.RoleId, r.PermissionId });
    }
}