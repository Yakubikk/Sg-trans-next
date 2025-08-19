using WebApp.DTO.Common;

namespace WebApp.DTO.RailwayCisterns;

public class PartFilterSortDTO
{
    public PartFilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 100;
}

public class PartFilterSortWithoutPaginationDTO
{
    public PartFilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
}

public class PartFilterCriteria
{
    public List<Guid>? PartTypeIds { get; set; }
    public List<Guid>? DepotIds { get; set; }
    public List<string>? StampNumbers { get; set; }
    public List<string>? SerialNumbers { get; set; }
    public DateOnly? ManufactureYearFrom { get; set; }
    public DateOnly? ManufactureYearTo { get; set; }
    public List<string>? Locations { get; set; }
    public List<Guid>? StatusIds { get; set; }
    public DateTimeOffset? CreatedAtFrom { get; set; }
    public DateTimeOffset? CreatedAtTo { get; set; }
    public DateTimeOffset? UpdatedAtFrom { get; set; }
    public DateTimeOffset? UpdatedAtTo { get; set; }

    // Специфичные поля для типов деталей
    // Колесная пара
    public decimal? ThicknessLeftFrom { get; set; }
    public decimal? ThicknessLeftTo { get; set; }
    public decimal? ThicknessRightFrom { get; set; }
    public decimal? ThicknessRightTo { get; set; }
    public List<string>? WheelTypes { get; set; }

    // Боковая рама и надрессорная балка
    public int? ServiceLifeYearsFrom { get; set; }
    public int? ServiceLifeYearsTo { get; set; }
    public DateOnly? ExtendedUntilFrom { get; set; }
    public DateOnly? ExtendedUntilTo { get; set; }

    // Поглощающий аппарат
    public List<string>? Models { get; set; }
    public List<string>? ManufacturerCodes { get; set; }
    public DateOnly? NextRepairDateFrom { get; set; }
    public DateOnly? NextRepairDateTo { get; set; }
}
