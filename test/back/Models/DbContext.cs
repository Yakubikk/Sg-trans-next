using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace back.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Affiliation> Affiliations { get; set; }

    public virtual DbSet<Bolster> Bolsters { get; set; }

    public virtual DbSet<Coupler> Couplers { get; set; }

    public virtual DbSet<Depot> Depots { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Manufacturer> Manufacturers { get; set; }

    public virtual DbSet<MilageCistern> MilageCisterns { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Part> Parts { get; set; }

    public virtual DbSet<PartInstallation> PartInstallations { get; set; }

    public virtual DbSet<PartStatus> PartStatuses { get; set; }

    public virtual DbSet<PartType> PartTypes { get; set; }

    public virtual DbSet<PermissionEntity> PermissionEntities { get; set; }

    public virtual DbSet<RailwayCistern> RailwayCisterns { get; set; }

    public virtual DbSet<Registrar> Registrars { get; set; }

    public virtual DbSet<Repair> Repairs { get; set; }

    public virtual DbSet<RepairType> RepairTypes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SavedFilter> SavedFilters { get; set; }

    public virtual DbSet<ShockAbsorber> ShockAbsorbers { get; set; }

    public virtual DbSet<SideFrame> SideFrames { get; set; }

    public virtual DbSet<StampNumber> StampNumbers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vessel> Vessels { get; set; }

    public virtual DbSet<WagonModel> WagonModels { get; set; }

    public virtual DbSet<WagonType> WagonTypes { get; set; }

    public virtual DbSet<WheelPair> WheelPairs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Строка подключения теперь будет настраиваться через DI
        if (!optionsBuilder.IsConfigured)
        {
            // Fallback конфигурация только для миграций
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Affiliation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Affiliations_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Bolster>(entity =>
        {
            entity.HasKey(e => e.PartId);

            entity.Property(e => e.PartId).ValueGeneratedNever();

            entity.HasOne(d => d.Part).WithOne(p => p.Bolster).HasForeignKey<Bolster>(d => d.PartId);
        });

        modelBuilder.Entity<Coupler>(entity =>
        {
            entity.HasKey(e => e.PartId);

            entity.Property(e => e.PartId).ValueGeneratedNever();

            entity.HasOne(d => d.Part).WithOne(p => p.Coupler).HasForeignKey<Coupler>(d => d.PartId);
        });

        modelBuilder.Entity<Depot>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Manufacturer>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code).HasDefaultValue(0);
        });

        modelBuilder.Entity<MilageCistern>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_MilageCistern");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Cistern).WithMany(p => p.MilageCisterns)
                .HasForeignKey(d => d.CisternId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CisternId_RailwayCisterns_id");

            entity.HasOne(d => d.RepairType).WithMany(p => p.MilageCisterns)
                .HasForeignKey(d => d.RepairTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RepairTypeId_RepairTypes_id");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Owners_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Unp).HasColumnName("UNP");
        });

        modelBuilder.Entity<Part>(entity =>
        {
            entity.HasIndex(e => e.DepotId, "IX_Parts_DepotId");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Depot).WithMany(p => p.Parts).HasForeignKey(d => d.DepotId);

            entity.HasOne(d => d.PartType).WithMany(p => p.Parts)
                .HasForeignKey(d => d.PartTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.StampNumber).WithMany(p => p.Parts)
                .HasForeignKey(d => d.StampNumberId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Status).WithMany(p => p.Parts)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<PartInstallation>(entity =>
        {
            entity.HasIndex(e => e.FromLocationId, "IX_PartInstallations_FromLocationId");

            entity.HasIndex(e => e.PartId, "IX_PartInstallations_PartId");

            entity.HasIndex(e => e.ToLocationId, "IX_PartInstallations_ToLocationId");

            entity.HasIndex(e => e.WagonId, "IX_PartInstallations_WagonId");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.FromLocation).WithMany(p => p.PartInstallationFromLocations).HasForeignKey(d => d.FromLocationId);

            entity.HasOne(d => d.Part).WithMany(p => p.PartInstallations).HasForeignKey(d => d.PartId);

            entity.HasOne(d => d.ToLocation).WithMany(p => p.PartInstallationToLocations).HasForeignKey(d => d.ToLocationId);

            entity.HasOne(d => d.Wagon).WithMany(p => p.PartInstallations).HasForeignKey(d => d.WagonId);
        });

        modelBuilder.Entity<PartStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PartStatus_pkey");

            entity.ToTable("PartStatus");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<PartType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PartTypes_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code).HasDefaultValue(0);
        });

        modelBuilder.Entity<PermissionEntity>(entity =>
        {
            entity.ToTable("PermissionEntity");
        });

        modelBuilder.Entity<RailwayCistern>(entity =>
        {
            entity.HasIndex(e => e.ManufacturerId, "IX_RailwayCisterns_ManufacturerId");

            entity.HasIndex(e => e.ModelId, "IX_RailwayCisterns_ModelId");

            entity.HasIndex(e => e.RegistrarId, "IX_RailwayCisterns_RegistrarId");

            entity.HasIndex(e => e.TypeId, "IX_RailwayCisterns_TypeId");

            entity.HasIndex(e => e.Ownerid, "fki_FK_RailwayCisterns_Owners_Ownerid");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.DangerClass).HasDefaultValue(0);
            entity.Property(e => e.ServiceLifeYears).HasDefaultValue(40);
            entity.Property(e => e.Substance).HasDefaultValueSql("'СУГ'::text");

            entity.HasOne(d => d.Affiliation).WithMany(p => p.RailwayCisterns)
                .HasForeignKey(d => d.AffiliationId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Manufacturer).WithMany(p => p.RailwayCisterns).HasForeignKey(d => d.ManufacturerId);

            entity.HasOne(d => d.Model).WithMany(p => p.RailwayCisterns).HasForeignKey(d => d.ModelId);

            entity.HasOne(d => d.Owner).WithMany(p => p.RailwayCisterns).HasForeignKey(d => d.Ownerid);

            entity.HasOne(d => d.Registrar).WithMany(p => p.RailwayCisterns).HasForeignKey(d => d.RegistrarId);

            entity.HasOne(d => d.Type).WithMany(p => p.RailwayCisterns).HasForeignKey(d => d.TypeId);
        });

        modelBuilder.Entity<Registrar>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Repair>(entity =>
        {
            entity.HasIndex(e => e.DepotId, "IX_Repairs_DepotId");

            entity.HasIndex(e => e.PartId, "IX_Repairs_PartId");

            entity.HasIndex(e => e.RepairTypeId, "IX_Repairs_RepairTypeId");

            entity.Property(e => e.RepairId).ValueGeneratedNever();

            entity.HasOne(d => d.Depot).WithMany(p => p.Repairs).HasForeignKey(d => d.DepotId);

            entity.HasOne(d => d.Part).WithMany(p => p.Repairs).HasForeignKey(d => d.PartId);

            entity.HasOne(d => d.RepairType).WithMany(p => p.Repairs).HasForeignKey(d => d.RepairTypeId);
        });

        modelBuilder.Entity<RepairType>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasMany(d => d.Permissions).WithMany(p => p.Roles)
                .UsingEntity<Dictionary<string, object>>(
                    "RolePermission",
                    r => r.HasOne<PermissionEntity>().WithMany().HasForeignKey("PermissionId"),
                    l => l.HasOne<Role>().WithMany().HasForeignKey("RoleId"),
                    j =>
                    {
                        j.HasKey("RoleId", "PermissionId");
                        j.ToTable("RolePermissions");
                        j.HasIndex(new[] { "PermissionId" }, "IX_RolePermissions_PermissionId");
                    });
        });

        modelBuilder.Entity<SavedFilter>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SavedFilters_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.User).WithMany(p => p.SavedFilters)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_SavedFilters_User_UserId");
        });

        modelBuilder.Entity<ShockAbsorber>(entity =>
        {
            entity.HasKey(e => e.PartId);

            entity.Property(e => e.PartId).ValueGeneratedNever();

            entity.HasOne(d => d.Part).WithOne(p => p.ShockAbsorber).HasForeignKey<ShockAbsorber>(d => d.PartId);
        });

        modelBuilder.Entity<SideFrame>(entity =>
        {
            entity.HasKey(e => e.PartId);

            entity.Property(e => e.PartId).ValueGeneratedNever();

            entity.HasOne(d => d.Part).WithOne(p => p.SideFrame).HasForeignKey<SideFrame>(d => d.PartId);
        });

        modelBuilder.Entity<StampNumber>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("StampNumbers_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("UserRole");
                        j.HasIndex(new[] { "RoleId" }, "IX_UserRole_RoleId");
                    });
        });

        modelBuilder.Entity<Vessel>(entity =>
        {
            entity.HasIndex(e => e.RailwayCisternId, "IX_Vessels_RailwayCisternId").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.RailwayCistern).WithOne(p => p.Vessel).HasForeignKey<Vessel>(d => d.RailwayCisternId);
        });

        modelBuilder.Entity<WagonModel>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<WagonType>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Type).HasDefaultValueSql("0");
        });

        modelBuilder.Entity<WheelPair>(entity =>
        {
            entity.HasKey(e => e.PartId);

            entity.Property(e => e.PartId).ValueGeneratedNever();

            entity.HasOne(d => d.Part).WithOne(p => p.WheelPair).HasForeignKey<WheelPair>(d => d.PartId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
