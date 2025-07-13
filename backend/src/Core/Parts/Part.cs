using Core.Depots;

namespace Core.Parts;

public class Part
{
    public Guid Id { get; set; }
    public PartTypes PartType { get; set; }
    public string StampNumber { get; set; }
    public string FactoryNumber { get; set; }
    public int ManufactureYear { get; set; }
    public Status Status { get; set; }
    public string Notes { get; set; }
    public double Weight { get; set; }
   
    
    
    public Guid? DepotId { get; set; }
    public Depot? Depot { get; set; }
    public Guid? LocationId { get; set; }
    public Location? Location { get; set; }
    
}

public enum Status
{
    Active,
    Inactive,
    Extended,
    UnderMaintenance,
    Decommissioned
}