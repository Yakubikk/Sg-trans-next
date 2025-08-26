namespace WebApp.DTO.RailwayCisterns;

public class DepotDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string? Location { get; set; }
    public string? ShortName { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateDepotDTO
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string? Location { get; set; }
    public string? ShortName { get; set; }
}

public class UpdateDepotDTO
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string? Location { get; set; }
    public string? ShortName { get; set; }
}
