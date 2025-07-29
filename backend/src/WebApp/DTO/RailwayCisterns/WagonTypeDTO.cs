namespace WebApp.DTO.RailwayCisterns;

public class WagonTypeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
}

public class CreateWagonTypeDTO
{
    public string Name { get; set; }
    public string Type { get; set; }
}

public class UpdateWagonTypeDTO
{
    public string Name { get; set; }
    public string Type { get; set; }
}
