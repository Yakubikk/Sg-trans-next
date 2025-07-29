using WebApp.DTO;

namespace WebApp.Data.Entities.RailwayCisterns;

public class Manufacturer
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Country { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public string CreatorId { get; set; } = null!;
    public string? ShortName { get; set; }
    public int Code { get; set; }

    public ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
