using WebApp.Data.Entities.RailwayCisterns;

namespace WebApp.DTO.RailwayCisterns;

public class LocationDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public LocationType Type { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateLocationDTO
{
    public string Name { get; set; }
    public LocationType Type { get; set; }
    public string? Description { get; set; }
}

public class UpdateLocationDTO
{
    public string Name { get; set; }
    public LocationType Type { get; set; }
    public string? Description { get; set; }
}
