namespace WebApp.Data.Entities.RailwayCisterns;

public enum LocationType
{
    Warehouse,
    Wagon,
    RepairShop,
    StorageYard,
    DisassemblyShop,
    ServicePoint,
    FabricationShop,
    InspectionPoint,
    ScrapYard,
    Other
}

public class Location 
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public LocationType Type { get; set; }
    public string? Description { get; set; }
    
    public ICollection<PartInstallation> FromInstallations { get; set; } = new List<PartInstallation>();
    public ICollection<PartInstallation> ToInstallations { get; set; } = new List<PartInstallation>();
    
    public DateTime CreatedAt { get; set; }
    public string CreatorId { get; set; } = null!;
}
