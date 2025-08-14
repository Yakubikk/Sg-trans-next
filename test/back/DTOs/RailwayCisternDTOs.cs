namespace back.DTOs;

public class RailwayCisternDto
{
    public Guid Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public Guid ManufacturerId { get; set; }
    public string? ManufacturerName { get; set; }
    public DateOnly BuildDate { get; set; }
    public decimal TareWeight { get; set; }
    public decimal LoadCapacity { get; set; }
    public int Length { get; set; }
    public int AxleCount { get; set; }
    public decimal Volume { get; set; }
    public decimal? FillingVolume { get; set; }
    public decimal? InitialTareWeight { get; set; }
    public Guid TypeId { get; set; }
    public string? TypeName { get; set; }
    public Guid? ModelId { get; set; }
    public string? ModelName { get; set; }
    public DateOnly? CommissioningDate { get; set; }
    public string SerialNumber { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public DateOnly RegistrationDate { get; set; }
    public Guid? RegistrarId { get; set; }
    public string? RegistrarName { get; set; }
    public string? Notes { get; set; }
    public Guid? Ownerid { get; set; }
    public string? OwnerName { get; set; }
    public string? TechСonditions { get; set; }
    public string? Pripiska { get; set; }
    public DateOnly? ReRegistrationDate { get; set; }
    public decimal Pressure { get; set; }
    public decimal TestPressure { get; set; }
    public string? Rent { get; set; }
    public Guid AffiliationId { get; set; }
    public string? AffiliationName { get; set; }
    public int ServiceLifeYears { get; set; }
    public DateOnly? PeriodMajorRepair { get; set; }
    public DateOnly? PeriodPeriodicTest { get; set; }
    public DateOnly? PeriodIntermediateTest { get; set; }
    public DateOnly? PeriodDepotRepair { get; set; }
    public int DangerClass { get; set; }
    public string Substance { get; set; } = string.Empty;
    public decimal TareWeight2 { get; set; }
    public decimal TareWeight3 { get; set; }
}

public class CreateRailwayCisternDto
{
    public string Number { get; set; } = string.Empty;
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
    public string SerialNumber { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public DateOnly RegistrationDate { get; set; }
    public Guid? RegistrarId { get; set; }
    public string? Notes { get; set; }
    public Guid? Ownerid { get; set; }
    public string? TechСonditions { get; set; }
    public string? Pripiska { get; set; }
    public DateOnly? ReRegistrationDate { get; set; }
    public decimal Pressure { get; set; }
    public decimal TestPressure { get; set; }
    public string? Rent { get; set; }
    public Guid AffiliationId { get; set; }
    public int ServiceLifeYears { get; set; } = 40;
    public DateOnly? PeriodMajorRepair { get; set; }
    public DateOnly? PeriodPeriodicTest { get; set; }
    public DateOnly? PeriodIntermediateTest { get; set; }
    public DateOnly? PeriodDepotRepair { get; set; }
    public int DangerClass { get; set; } = 0;
    public string Substance { get; set; } = "СУГ";
    public decimal TareWeight2 { get; set; }
    public decimal TareWeight3 { get; set; }
}

public class UpdateRailwayCisternDto
{
    public string? Number { get; set; }
    public Guid? ManufacturerId { get; set; }
    public DateOnly? BuildDate { get; set; }
    public decimal? TareWeight { get; set; }
    public decimal? LoadCapacity { get; set; }
    public int? Length { get; set; }
    public int? AxleCount { get; set; }
    public decimal? Volume { get; set; }
    public decimal? FillingVolume { get; set; }
    public decimal? InitialTareWeight { get; set; }
    public Guid? TypeId { get; set; }
    public Guid? ModelId { get; set; }
    public DateOnly? CommissioningDate { get; set; }
    public string? SerialNumber { get; set; }
    public string? RegistrationNumber { get; set; }
    public DateOnly? RegistrationDate { get; set; }
    public Guid? RegistrarId { get; set; }
    public string? Notes { get; set; }
    public Guid? Ownerid { get; set; }
    public string? TechСonditions { get; set; }
    public string? Pripiska { get; set; }
    public DateOnly? ReRegistrationDate { get; set; }
    public decimal? Pressure { get; set; }
    public decimal? TestPressure { get; set; }
    public string? Rent { get; set; }
    public Guid? AffiliationId { get; set; }
    public int? ServiceLifeYears { get; set; }
    public DateOnly? PeriodMajorRepair { get; set; }
    public DateOnly? PeriodPeriodicTest { get; set; }
    public DateOnly? PeriodIntermediateTest { get; set; }
    public DateOnly? PeriodDepotRepair { get; set; }
    public int? DangerClass { get; set; }
    public string? Substance { get; set; }
    public decimal? TareWeight2 { get; set; }
    public decimal? TareWeight3 { get; set; }
}

public class RailwayCisternPassportDto
{
    public Guid Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    
    // Производство
    public string? Manufacturer { get; set; }
    public DateOnly BuildDate { get; set; }
    public DateOnly? CommissioningDate { get; set; }
    
    // Тип и модель
    public string? Type { get; set; }
    public string? Model { get; set; }
    
    // Весовые характеристики
    public decimal TareWeight { get; set; }
    public decimal TareWeight2 { get; set; }
    public decimal TareWeight3 { get; set; }
    public decimal? InitialTareWeight { get; set; }
    public decimal LoadCapacity { get; set; }
    
    // Размеры
    public int Length { get; set; }
    public int AxleCount { get; set; }
    public decimal Volume { get; set; }
    public decimal? FillingVolume { get; set; }
    
    // Давление
    public decimal Pressure { get; set; }
    public decimal TestPressure { get; set; }
    
    // Опасность
    public int DangerClass { get; set; }
    public string Substance { get; set; } = string.Empty;
    
    // Регистрация
    public DateOnly RegistrationDate { get; set; }
    public DateOnly? ReRegistrationDate { get; set; }
    public string? Registrar { get; set; }
    
    // Владение
    public string? Owner { get; set; }
    public string? Affiliation { get; set; }
    public string? Rent { get; set; }
    public string? Pripiska { get; set; }
    
    // Ремонт и обслуживание
    public int ServiceLifeYears { get; set; }
    public DateOnly? PeriodMajorRepair { get; set; }
    public DateOnly? PeriodPeriodicTest { get; set; }
    public DateOnly? PeriodIntermediateTest { get; set; }
    public DateOnly? PeriodDepotRepair { get; set; }
    
    // Дополнительно
    public string? TechСonditions { get; set; }
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Установленные части
    public List<InstalledPartDto> InstalledParts { get; set; } = new();
    
    // Сосуд под давлением
    public VesselInfoDto? VesselInfo { get; set; }
}

public class InstalledPartDto
{
    public Guid Id { get; set; }
    public Guid PartId { get; set; }
    public string? PartTypeName { get; set; }
    public string? PartStatusName { get; set; }
    public string? SerialNumber { get; set; }
    public DateOnly? ManufactureYear { get; set; }
    public DateTime InstalledAt { get; set; }
    public string? InstalledBy { get; set; }
    public DateTime? RemovedAt { get; set; }
    public string? RemovedBy { get; set; }
    public string? FromLocationName { get; set; }
    public string? ToLocationName { get; set; }
    public string? Notes { get; set; }
}

public class VesselInfoDto
{
    public Guid Id { get; set; }
    // Добавить необходимые поля в зависимости от модели Vessel
}
