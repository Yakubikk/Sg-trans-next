namespace WebApp.Data.Entities.RailwayCisterns;

public class RailwayCistern
{
    public Guid Id { get; set; }
        public string Number { get; set; }
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
        public string SerialNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public DateOnly RegistrationDate { get; set; }
        public Guid? RegistrarId { get; set; }
        public string Notes { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public string CreatorId { get; set; }
        public Guid? OwnerId { get; set; } // Corrected casing to match C# conventions
        public string TechConditions { get; set; }
        public string Pripiska { get; set; }
        public DateOnly? ReRegistrationDate { get; set; }
        public decimal Pressure { get; set; }
        public decimal TestPressure { get; set; }
        public string Rent { get; set; }
        public Guid AffiliationId { get; set; }
        public int ServiceLifeYears { get; set; }
        public DateOnly? PeriodMajorRepair { get; set; }
        public DateOnly? PeriodPeriodicTest { get; set; }
        public DateOnly? PeriodIntermediateTest { get; set; }
        public DateOnly? PeriodDepotRepair { get; set; }
        public int DangerClass { get; set; }
        public string Substance { get; set; }

        public Affiliation Affiliation { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public Owner Owner { get; set; }
        public Registrar Registrar { get; set; } // Assumed model
        public WagonModel Model { get; set; }     // Assumed model
        public WagonType Type { get; set; }
        public ICollection<MilageCistern> MilageCisterns { get; set; }
        public ICollection<PartInstallation> PartInstallations { get; set; }
}
