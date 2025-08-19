namespace WebApp.DTO.RailwayCisterns;

public class RailwayCisternFilterSortDTO
{
    public FilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class RailwayCisternFilterSortWithoutPaginationDTO
{
    public FilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
}

public class FilterCriteria
{
    public List<string>? Numbers { get; set; }
    public List<Guid>? ManufacturerIds { get; set; }
    public DateOnly? BuildDateFrom { get; set; }
    public DateOnly? BuildDateTo { get; set; }
    public decimal? TareWeightFrom { get; set; }
    public decimal? TareWeightTo { get; set; }
    public decimal? LoadCapacityFrom { get; set; }
    public decimal? LoadCapacityTo { get; set; }
    public int? LengthFrom { get; set; }
    public int? LengthTo { get; set; }
    public List<int>? AxleCounts { get; set; }
    public decimal? VolumeFrom { get; set; }
    public decimal? VolumeTo { get; set; }
    public decimal? FillingVolumeFrom { get; set; }
    public decimal? FillingVolumeTo { get; set; }
    public decimal? InitialTareWeightFrom { get; set; }
    public decimal? InitialTareWeightTo { get; set; }
    public List<Guid>? TypeIds { get; set; }
    public List<Guid>? ModelIds { get; set; }
    public DateOnly? CommissioningDateFrom { get; set; }
    public DateOnly? CommissioningDateTo { get; set; }
    public List<string>? SerialNumbers { get; set; }
    public List<string>? RegistrationNumbers { get; set; }
    public DateOnly? RegistrationDateFrom { get; set; }
    public DateOnly? RegistrationDateTo { get; set; }
    public List<Guid>? RegistrarIds { get; set; }
    public List<Guid>? OwnerIds { get; set; }
    public List<string>? TechConditions { get; set; }
    public List<string>? Prispiski { get; set; }
    public DateOnly? ReRegistrationDateFrom { get; set; }
    public DateOnly? ReRegistrationDateTo { get; set; }
    public decimal? PressureFrom { get; set; }
    public decimal? PressureTo { get; set; }
    public decimal? TestPressureFrom { get; set; }
    public decimal? TestPressureTo { get; set; }
    public List<string>? Rents { get; set; }
    public List<Guid>? AffiliationIds { get; set; }
    public int? ServiceLifeYearsFrom { get; set; }
    public int? ServiceLifeYearsTo { get; set; }
    public DateOnly? PeriodMajorRepairFrom { get; set; }
    public DateOnly? PeriodMajorRepairTo { get; set; }
    public DateOnly? PeriodPeriodicTestFrom { get; set; }
    public DateOnly? PeriodPeriodicTestTo { get; set; }
    public DateOnly? PeriodIntermediateTestFrom { get; set; }
    public DateOnly? PeriodIntermediateTestTo { get; set; }
    public DateOnly? PeriodDepotRepairFrom { get; set; }
    public DateOnly? PeriodDepotRepairTo { get; set; }
    public List<int>? DangerClasses { get; set; }
    public List<string>? Substances { get; set; }
    public decimal? TareWeight2From { get; set; }
    public decimal? TareWeight2To { get; set; }
    public decimal? TareWeight3From { get; set; }
    public decimal? TareWeight3To { get; set; }
    public DateTimeOffset? CreatedAtFrom { get; set; }
    public DateTimeOffset? CreatedAtTo { get; set; }
    public DateTimeOffset? UpdatedAtFrom { get; set; }
    public DateTimeOffset? UpdatedAtTo { get; set; }
}

public class SortCriteria
{
    public string FieldName { get; set; } = null!;
    public bool Descending { get; set; }
}
