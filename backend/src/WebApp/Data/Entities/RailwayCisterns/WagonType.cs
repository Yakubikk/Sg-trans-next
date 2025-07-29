namespace WebApp.Data.Entities.RailwayCisterns;

public class WagonType
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; } 

    public ICollection<RailwayCistern> RailwayCisterns { get; set; }
}
