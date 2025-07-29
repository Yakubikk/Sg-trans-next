using WebApp.DTO;

namespace WebApp.Data.Entities.RailwayCisterns;

public class Manufacturer
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public string CreatorId { get; set; }
    public string ShortName { get; set; }
    public int Code { get; set; }

    public ICollection<RailwayCistern> RailwayCisterns { get; set; }
}
