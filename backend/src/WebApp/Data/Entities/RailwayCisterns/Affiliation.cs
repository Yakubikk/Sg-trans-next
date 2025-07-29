namespace WebApp.Data.Entities.RailwayCisterns;

public class Affiliation
{
    public Guid Id { get; set; }
    public string Value { get; set; }

    public ICollection<RailwayCistern> RailwayCisterns { get; set; }
}