namespace WebApp.DTO.RailwayCisterns;

public class WagonModelDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}

public class CreateWagonModelDTO
{
    public string Name { get; set; }
}

public class UpdateWagonModelDTO
{
    public string Name { get; set; }
}
