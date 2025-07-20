namespace WebApp.Data.Entities.RailwayCisterns;

public class Coupler
{
    public Guid PartId { get; set; }
    public Part Part { get; set; } = null!;
}
