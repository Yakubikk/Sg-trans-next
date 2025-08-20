namespace WebApp.DTO.RailwayCisterns;

public class ManufacturerDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }
    public string ShortName { get; set; }
    public int Code { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}

public class CreateManufacturerDTO
{
    public string Name { get; set; }
    public string Country { get; set; }
    public string ShortName { get; set; }
    public int Code { get; set; }
}

public class UpdateManufacturerDTO
{
    public string Name { get; set; }
    public string Country { get; set; }
    public string ShortName { get; set; }
    public int Code { get; set; }
}
