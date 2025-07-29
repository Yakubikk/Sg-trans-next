namespace WebApp.Data.Entities.RailwayCisterns;

public class Affiliation
{
    public Guid Id { get; set; }
    public string Value { get; set; } = null!;

    public ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}