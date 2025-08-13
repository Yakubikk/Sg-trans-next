using System;
using System.Collections.Generic;

namespace back.Models;

public partial class RailwayCistern
{
    public Guid Id { get; set; }

    public string Number { get; set; } = null!;

    public Guid ManufacturerId { get; set; }

    public DateOnly BuildDate { get; set; }

    public decimal TareWeight { get; set; }

    public decimal LoadCapacity { get; set; }

    public int Length { get; set; }

    public int AxleCount { get; set; }

    public decimal Volume { get; set; }

    public decimal? FillingVolume { get; set; }

    public decimal? InitialTareWeight { get; set; }

    public Guid TypeId { get; set; }

    public Guid? ModelId { get; set; }

    public DateOnly? CommissioningDate { get; set; }

    public string SerialNumber { get; set; } = null!;

    public string RegistrationNumber { get; set; } = null!;

    public DateOnly RegistrationDate { get; set; }

    public Guid? RegistrarId { get; set; }

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string CreatorId { get; set; } = null!;

    public Guid? Ownerid { get; set; }

    public string? TechСonditions { get; set; }

    public string? Pripiska { get; set; }

    public DateOnly? ReRegistrationDate { get; set; }

    public decimal Pressure { get; set; }

    public decimal TestPressure { get; set; }

    public string? Rent { get; set; }

    public Guid AffiliationId { get; set; }

    public int ServiceLifeYears { get; set; }

    public DateOnly? PeriodMajorRepair { get; set; }

    public DateOnly? PeriodPeriodicTest { get; set; }

    public DateOnly? PeriodIntermediateTest { get; set; }

    public DateOnly? PeriodDepotRepair { get; set; }

    public int DangerClass { get; set; }

    public string Substance { get; set; } = null!;

    public decimal TareWeight2 { get; set; }

    public decimal TareWeight3 { get; set; }

    public virtual Affiliation Affiliation { get; set; } = null!;

    public virtual Manufacturer Manufacturer { get; set; } = null!;

    public virtual ICollection<MilageCistern> MilageCisterns { get; set; } = new List<MilageCistern>();

    public virtual WagonModel? Model { get; set; }

    public virtual Owner? Owner { get; set; }

    public virtual ICollection<PartInstallation> PartInstallations { get; set; } = new List<PartInstallation>();

    public virtual Registrar? Registrar { get; set; }

    public virtual WagonType Type { get; set; } = null!;

    public virtual Vessel? Vessel { get; set; }
}
