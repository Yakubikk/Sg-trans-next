using WebApp.Data.Entities.Users;
using WebApp.DTO.RailwayCisterns;

namespace WebApp.Data.Entities.RailwayCisterns;

public class SavedFilter
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string FilterJson { get; set; }
    public string SortFieldsJson { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
