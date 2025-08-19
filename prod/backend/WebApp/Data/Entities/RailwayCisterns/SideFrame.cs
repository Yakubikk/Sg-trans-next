namespace WebApp.Data.Entities.RailwayCisterns;

public class SideFrame
{
    public Guid PartId { get; set; }
    public Part Part { get; set; } = null!;
    
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}
