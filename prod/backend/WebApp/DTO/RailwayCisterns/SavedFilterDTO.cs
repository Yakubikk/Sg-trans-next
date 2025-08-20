namespace WebApp.DTO.RailwayCisterns;

public class SavedFilterDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public FilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
    public Guid UserId { get; set; }
    public Guid FilterTypeId { get; set; }
    public FilterTypeDTO FilterType { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}

public class CreateSavedFilterDTO
{
    public string Name { get; set; } = null!;
    public FilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
    public Guid FilterTypeId { get; set; }
}

public class UpdateSavedFilterDTO
{
    public string Name { get; set; } = null!;
    public FilterCriteria? Filters { get; set; }
    public List<SortCriteria>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
    public Guid FilterTypeId { get; set; }
}
