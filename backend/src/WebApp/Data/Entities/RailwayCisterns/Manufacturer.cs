using WebApp.DTO;

namespace WebApp.Data.Entities.RailwayCisterns;

public class Manufacturer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;

    public string Country { get; set; } = "Республика Беларусь";

    public CountryInfo GetCountryInfo() => CountryInfo.FromString(Country);
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public string CreatorId { get; set; } = string.Empty;

    public ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
