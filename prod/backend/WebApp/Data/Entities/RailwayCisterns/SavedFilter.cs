using WebApp.Data.Entities.Users;
using WebApp.DTO.RailwayCisterns;

namespace WebApp.Data.Entities.RailwayCisterns;

public class SavedFilter
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string FilterJson { get; set; } = null!;
    public string SortFieldsJson { get; set; } = null!;
    public string SelectedColumnsJson { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid FilterTypeId { get; set; }
    public FilterType FilterType { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
