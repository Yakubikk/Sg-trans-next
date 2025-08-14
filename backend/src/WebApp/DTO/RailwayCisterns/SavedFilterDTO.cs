namespace WebApp.DTO.RailwayCisterns;

public class SavedFilterDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public FilterCriteria Filter { get; set; }
    public List<SortCriteria> SortFields { get; set; }
    public Guid UserId { get; set; }
    public Guid FilterTypeId { get; set; }
    public FilterTypeDTO FilterType { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}

public class CreateSavedFilterDTO
{
    public string Name { get; set; }
    public FilterCriteria Filter { get; set; }
    public List<SortCriteria> SortFields { get; set; }
    public Guid FilterTypeId { get; set; }
}

public class UpdateSavedFilterDTO
{
    public string Name { get; set; }
    public FilterCriteria Filter { get; set; }
    public List<SortCriteria> SortFields { get; set; }
    public Guid FilterTypeId { get; set; }
}
