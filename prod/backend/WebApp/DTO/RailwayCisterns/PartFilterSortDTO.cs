using WebApp.DTO.Common;

namespace WebApp.DTO.RailwayCisterns;

public class PartFilterSortDTO
{
    public PartFilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 100;
}

public class PartFilterSortWithoutPaginationDTO
{
    public PartFilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
}

public class PartFilterCriteria
{
    public List<Guid>? PartTypeIds { get; set; }
    public List<Guid>? DepotIds { get; set; }
    public List<string>? StampNumbers { get; set; }
    public List<string>? SerialNumbers { get; set; }
    public DateRange? ManufactureYear { get; set; }
    public List<string>? Locations { get; set; }
    public List<Guid>? StatusIds { get; set; }
    public DateTimeRange? CreatedAt { get; set; }
    public DateTimeRange? UpdatedAt { get; set; }

    // Специфичные поля для колесных пар
    public DecimalRange? ThicknessLeft { get; set; }
    public DecimalRange? ThicknessRight { get; set; }
    public List<string>? WheelTypes { get; set; }

    // Боковая рама и надрессорная балка
    public IntRange? ServiceLifeYears { get; set; }
    public DateRange? ExtendedUntil { get; set; }

    // Поглощающий аппарат
    public List<string>? Models { get; set; }
    public List<string>? ManufacturerCodes { get; set; }
    public DateRange? NextRepairDate { get; set; }

    // Фильтры по коду и документу
    public IntRange? Code { get; set; }
    public Guid? DocumentId { get; set; }
    public List<string>? DocumentNumbers { get; set; }
    public List<int>? DocumentTypes { get; set; }
    public DateRange? DocumentDate { get; set; }
}
