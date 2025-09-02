using Microsoft.EntityFrameworkCore;
using WebApp.Data.Entities.RailwayCisterns;
using WebApp.Data.Entities.Users;

namespace WebApp.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IServiceProvider serviceProvider) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }

    //RailwayCisternsModels
    public DbSet<Affiliation> Affiliations { get; set; }
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<MilageCistern> MilageCisterns { get; set; }
    public DbSet<Owner> Owners { get; set; }
    public DbSet<RailwayCistern> RailwayCisterns { get; set; }
    public DbSet<SavedFilter> SavedFilters { get; set; }
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
    public DbSet<PartStatus> PartStatuses { get; set; }
    public DbSet<PartType> PartTypes { get; set; }
    public DbSet<FilterType> FilterTypes { get; set; }
    public DbSet<StampNumber> StampNumbers { get; set; }
    public DbSet<EquipmentType> EquipmentTypes { get; set; }
    public DbSet<PartEquipment> PartEquipments { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Affiliations
        modelBuilder.Entity<Affiliation>(entity =>
        {
            entity.ToTable("Affiliations");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Value).HasColumnName("Value").IsRequired().HasColumnType("text");
        });

        // Manufacturers
        modelBuilder.Entity<Manufacturer>(entity =>
        {
            entity.ToTable("Manufacturers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.Country).HasColumnName("Country").IsRequired().HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt").IsRequired()
                .HasColumnType("timestamp with time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt").IsRequired()
                .HasColumnType("timestamp with time zone");
            entity.Property(e => e.CreatorId).HasColumnName("CreatorId").IsRequired().HasColumnType("text");
            entity.Property(e => e.ShortName).HasColumnName("ShortName").HasColumnType("text");
            entity.Property(e => e.Code).HasColumnName("Code").IsRequired().HasDefaultValue(0);
        });

        // MilageCisterns
        modelBuilder.Entity<MilageCistern>(entity =>
        {
            entity.ToTable("MilageCisterns");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.CisternId).HasColumnName("CisternId").IsRequired();
            entity.Property(e => e.Milage).HasColumnName("Milage").IsRequired();
            entity.Property(e => e.MilageNorm).HasColumnName("MilageNorm").IsRequired();
            entity.Property(e => e.RepairTypeId).HasColumnName("RepairTypeId").IsRequired();
            entity.Property(e => e.RepairDate).HasColumnName("RepairDate").IsRequired().HasColumnType("date");
            entity.Property(e => e.InputModeCode).HasColumnName("InputModeCode").IsRequired();
            entity.Property(e => e.InputDate).HasColumnName("InputDate").IsRequired().HasColumnType("date");
            entity.Property(e => e.CisternNumber).HasColumnName("CisternNumber").IsRequired().HasColumnType("text");

            entity.HasOne(d => d.Cistern)
                .WithMany(p => p.MilageCisterns)
                .HasForeignKey(d => d.CisternId)
                .HasConstraintName("FK_CisternId_RailwayCisterns_id")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION

            entity.HasOne(d => d.RepairType)
                .WithMany(p => p.MilageCisterns)
                .HasForeignKey(d => d.RepairTypeId)
                .HasConstraintName("FK_RepairTypeId_RepairTypes_id")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION
        });

        // Owners
        modelBuilder.Entity<Owner>(entity =>
        {
            entity.ToTable("Owners");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.UNP).HasColumnName("UNP").HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt").HasColumnType("timestamp with time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt").HasColumnType("timestamp with time zone");
            entity.Property(e => e.CreatorId).HasColumnName("CreatorId").HasColumnType("text");
            entity.Property(e => e.ShortName).HasColumnName("ShortName").IsRequired().HasColumnType("text");
            entity.Property(e => e.Address).HasColumnName("Address").HasColumnType("text");
            entity.Property(e => e.TreatRepairs).HasColumnName("TreatRepairs").IsRequired();
        });

        // RailwayCisterns
        modelBuilder.Entity<RailwayCistern>(entity =>
        {
            entity.ToTable("RailwayCisterns");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Number).HasColumnName("Number").IsRequired().HasColumnType("text");
            entity.Property(e => e.ManufacturerId).HasColumnName("ManufacturerId").IsRequired();
            entity.Property(e => e.BuildDate).HasColumnName("BuildDate").IsRequired().HasColumnType("date");
            entity.Property(e => e.TareWeight).HasColumnName("TareWeight").IsRequired().HasColumnType("numeric");
            entity.Property(e => e.LoadCapacity).HasColumnName("LoadCapacity").IsRequired().HasColumnType("numeric");
            entity.Property(e => e.Length).HasColumnName("Length").IsRequired();
            entity.Property(e => e.AxleCount).HasColumnName("AxleCount").IsRequired();
            entity.Property(e => e.Volume).HasColumnName("Volume").IsRequired().HasColumnType("numeric");
            entity.Property(e => e.FillingVolume).HasColumnName("FillingVolume").HasColumnType("numeric");
            entity.Property(e => e.InitialTareWeight).HasColumnName("InitialTareWeight").HasColumnType("numeric");
            entity.Property(e => e.TypeId).HasColumnName("TypeId").IsRequired();
            entity.Property(e => e.ModelId).HasColumnName("ModelId");
            entity.Property(e => e.CommissioningDate).HasColumnName("CommissioningDate").HasColumnType("date");
            entity.Property(e => e.SerialNumber).HasColumnName("SerialNumber").IsRequired().HasColumnType("text");
            entity.Property(e => e.RegistrationNumber).HasColumnName("RegistrationNumber").IsRequired()
                .HasColumnType("text");
            entity.Property(e => e.RegistrationDate).HasColumnName("RegistrationDate").IsRequired()
                .HasColumnType("date");
            entity.Property(e => e.RegistrarId).HasColumnName("RegistrarId");
            entity.Property(e => e.Notes).HasColumnName("Notes").HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt").IsRequired()
                .HasColumnType("timestamp with time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt").IsRequired()
                .HasColumnType("timestamp with time zone");
            entity.Property(e => e.CreatorId).HasColumnName("CreatorId").IsRequired().HasColumnType("text");
            entity.Property(e => e.OwnerId).HasColumnName("Ownerid"); // Matches SQL column name
            entity.Property(e => e.TechConditions).HasColumnName("TechСonditions") // С русской буквой С
                .HasColumnType("text"); // Matches SQL column name
            entity.Property(e => e.Pripiska).HasColumnName("Pripiska").HasColumnType("text");
            entity.Property(e => e.ReRegistrationDate).HasColumnName("ReRegistrationDate").HasColumnType("date");
            entity.Property(e => e.Pressure).HasColumnName("Pressure").IsRequired().HasColumnType("numeric");
            entity.Property(e => e.TestPressure).HasColumnName("TestPressure").IsRequired().HasColumnType("numeric")
                .HasDefaultValue(0);
            entity.Property(e => e.Rent).HasColumnName("Rent").HasColumnType("text");
            entity.Property(e => e.AffiliationId).HasColumnName("AffiliationId").IsRequired();
            entity.Property(e => e.ServiceLifeYears).HasColumnName("ServiceLifeYears").IsRequired().HasDefaultValue(40);
            entity.Property(e => e.PeriodMajorRepair).HasColumnName("PeriodMajorRepair").HasColumnType("date");
            entity.Property(e => e.PeriodPeriodicTest).HasColumnName("PeriodPeriodicTest").HasColumnType("date");
            entity.Property(e => e.PeriodIntermediateTest).HasColumnName("PeriodIntermediateTest")
                .HasColumnType("date");
            entity.Property(e => e.PeriodDepotRepair).HasColumnName("PeriodDepotRepair").HasColumnType("date");
            entity.Property(e => e.DangerClass).HasColumnName("DangerClass").IsRequired().HasDefaultValue(0);
            entity.Property(e => e.Substance).HasColumnName("Substance").IsRequired().HasColumnType("text")
                .HasDefaultValue("СУГ");
            entity.Property(e => e.TareWeight2).HasColumnName("TareWeight2").IsRequired().HasColumnType("numeric")
                .HasDefaultValue(0);
            entity.Property(e => e.TareWeight3).HasColumnName("TareWeight3").IsRequired().HasColumnType("numeric")
                .HasDefaultValue(0);


            entity.HasOne(d => d.Affiliation)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.AffiliationId)
                .HasConstraintName("FK_RailwayCisterns_Affiliations_AffiliationId")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION

            entity.HasOne(d => d.Manufacturer)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.ManufacturerId)
                .HasConstraintName("FK_RailwayCisterns_Manufacturers_ManufacturerId")
                .OnDelete(DeleteBehavior.Cascade); // ON DELETE CASCADE

            entity.HasOne(d => d.Owner)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.OwnerId) // Corrected to OwnerId
                .HasConstraintName("FK_RailwayCisterns_Owners_Ownerid")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION

            entity.HasOne(d => d.Registrar)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.RegistrarId)
                .HasConstraintName("FK_RailwayCisterns_Registrars_RegistrarId")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION

            entity.HasOne(d => d.Model)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.ModelId)
                .HasConstraintName("FK_RailwayCisterns_WagonModels_ModelId")
                .OnDelete(DeleteBehavior.NoAction); // ON DELETE NO ACTION

            entity.HasOne(d => d.Type)
                .WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK_RailwayCisterns_WagonTypes_TypeId")
                .OnDelete(DeleteBehavior.Cascade); // ON DELETE CASCADE
        });

        // WagonTypes
        modelBuilder.Entity<WagonType>(entity =>
        {
            entity.ToTable("WagonTypes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.Type).HasColumnName("Type").IsRequired().HasColumnType("text").HasDefaultValue("0"); // "0" as text default based on SQL
        });

        // RepairTypes
        modelBuilder.Entity<RepairType>(entity =>
        {
            entity.ToTable("RepairTypes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.Code).HasColumnName("Code").IsRequired().HasColumnType("text");
            entity.Property(e => e.Description).HasColumnName("Description").HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt").IsRequired().HasColumnType("timestamp with time zone");
        });

        // Part конфигурация
        modelBuilder.Entity<Part>(entity =>
        {
            entity.ToTable("Parts");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.SerialNumber).HasColumnType("text");
            entity.Property(e => e.CurrentLocation).HasColumnType("text");
            entity.Property(e => e.Notes).HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp with time zone");
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp with time zone");
            
            entity.HasOne(d => d.Depot)
                .WithMany(p => p.Parts)
                .HasForeignKey(d => d.DepotId)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(d => d.Status)
                .WithMany()
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(d => d.PartType)
                .WithMany()
                .HasForeignKey(d => d.PartTypeId)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(d => d.StampNumber)
                .WithMany()
                .HasForeignKey(d => d.StampNumberId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        // Специализированные части
        modelBuilder.Entity<WheelPair>(entity =>
        {
            entity.ToTable("WheelPairs");
            entity.HasKey(e => e.PartId);
            
            entity.Property(e => e.ThicknessLeft).HasColumnType("numeric");
            entity.Property(e => e.ThicknessRight).HasColumnType("numeric");
            entity.Property(e => e.WheelType).HasColumnType("text");
            
            entity.HasOne(d => d.Part)
                .WithOne(p => p.WheelPair)
                .HasForeignKey<WheelPair>(d => d.PartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<SideFrame>(entity =>
        {
            entity.ToTable("SideFrames");
            entity.HasKey(e => e.PartId);
            
            entity.HasOne(d => d.Part)
                .WithOne(p => p.SideFrame)
                .HasForeignKey<SideFrame>(d => d.PartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ShockAbsorber>(entity =>
        {
            entity.ToTable("ShockAbsorbers");
            entity.HasKey(e => e.PartId);
            
            entity.Property(e => e.Model).HasColumnType("text");
            entity.Property(e => e.ManufacturerCode).HasColumnType("text");
            
            entity.HasOne(d => d.Part)
                .WithOne(p => p.ShockAbsorber)
                .HasForeignKey<ShockAbsorber>(d => d.PartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Coupler>(entity =>
        {
            entity.ToTable("Couplers");
            entity.HasKey(e => e.PartId);
            
            entity.HasOne(d => d.Part)
                .WithOne(p => p.Coupler)
                .HasForeignKey<Coupler>(d => d.PartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Bolster>(entity =>
        {
            entity.ToTable("Bolsters");
            entity.HasKey(e => e.PartId);
            
            entity.HasOne(d => d.Part)
                .WithOne(p => p.Bolster)
                .HasForeignKey<Bolster>(d => d.PartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

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

        // PartStatus
        modelBuilder.Entity<PartStatus>(entity =>
        {
            entity.ToTable("PartStatus");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.Code).HasColumnName("Code").IsRequired();
        });

        // PartTypes
        modelBuilder.Entity<PartType>(entity =>
        {
            entity.ToTable("PartTypes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Name).HasColumnName("Name").IsRequired().HasColumnType("text");
            entity.Property(e => e.Code).HasColumnName("Code").IsRequired().HasDefaultValue(0);
        });

        // StampNumbers
        modelBuilder.Entity<StampNumber>(entity =>
        {
            entity.ToTable("StampNumbers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("Id").IsRequired();
            entity.Property(e => e.Value).HasColumnName("Value").IsRequired().HasColumnType("text");
        });

        // SavedFilters
        modelBuilder.Entity<SavedFilter>(entity =>
        {
            entity.ToTable("SavedFilters");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasColumnType("text");
            entity.Property(e => e.FilterJson).IsRequired().HasColumnType("text");
            entity.Property(e => e.SortFieldsJson).IsRequired().HasColumnType("text");
            entity.Property(e => e.SelectedColumnsJson).IsRequired().HasColumnType("text"); // Добавлено
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.FilterTypeId).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired().HasColumnType("timestamp with time zone");
            entity.Property(e => e.UpdatedAt).IsRequired().HasColumnType("timestamp with time zone");

            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.FilterType)
                .WithMany(p => p.SavedFilters)
                .HasForeignKey(d => d.FilterTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // FilterTypes
        modelBuilder.Entity<FilterType>(entity =>
        {
            entity.ToTable("FilterTypes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasColumnType("text");
        });

        // EquipmentType конфигурация
        modelBuilder.Entity<EquipmentType>(entity =>
        {
            entity.ToTable("EquipmentType");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasColumnType("text");
            entity.Property(e => e.Code).IsRequired().HasDefaultValue(0);
            
            entity.HasOne(e => e.PartType)
                .WithMany()
                .HasForeignKey(e => e.PartTypeId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        // PartEquipments конфигурация
        modelBuilder.Entity<PartEquipment>(entity =>
        {
            entity.ToTable("PartEquipments");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Operation).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.DefectsId).IsRequired().HasDefaultValue("0").HasColumnType("text");
            entity.Property(e => e.AdminOwnerId).HasColumnType("text");
            entity.Property(e => e.JobDate).HasColumnType("text");
            entity.Property(e => e.JobTypeId).IsRequired().HasDefaultValue("0").HasColumnType("text");
            entity.Property(e => e.ThicknessLeft).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.ThicknessRight).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.Notes).HasColumnType("text");
            entity.Property(e => e.DocumetnsId).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.DocumetnDate).IsRequired().HasColumnType("date");
            
            entity.HasOne(pe => pe.RailwayCistern)
                .WithMany()
                .HasForeignKey(pe => pe.RailwayCisternsId)
                .OnDelete(DeleteBehavior.NoAction);
                
            entity.HasOne(pe => pe.EquipmentType)
                .WithMany(et => et.PartEquipments)
                .HasForeignKey(pe => pe.EquipmentTypeId)
                .OnDelete(DeleteBehavior.NoAction);
                
            entity.HasOne(pe => pe.JobDepot)
                .WithMany()
                .HasForeignKey(pe => pe.JobDepotsId)
                .OnDelete(DeleteBehavior.NoAction);
                
            entity.HasOne(pe => pe.Depot)
                .WithMany()
                .HasForeignKey(pe => pe.DepotsId)
                .OnDelete(DeleteBehavior.NoAction);
                
            entity.HasOne(pe => pe.RepairType)
                .WithMany()
                .HasForeignKey(pe => pe.RepairTypesId)
                .OnDelete(DeleteBehavior.NoAction);
            
            entity.HasOne(pe => pe.Part)
                .WithMany()
                .HasForeignKey(pe => pe.PartsId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        var builder = modelBuilder.Entity<RolePermission>();

        builder.HasKey(r => new { r.RoleId, r.PermissionId });
    }
}
