namespace WebApp.Data.Entities.RailwayCisterns;

public class FilterType
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    
    public ICollection<SavedFilter> SavedFilters { get; set; } = new List<SavedFilter>();
}

