namespace Core.Depots;

public class Location
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public LocationType LocationType { get; set; }
    public string? Description { get; set; }
}

public enum LocationType
{
    Depot,
    Warehouse,
    Wagon,
    RepairShop,
    Station,
    ScrapYard,
    Terminal,
    Other
}