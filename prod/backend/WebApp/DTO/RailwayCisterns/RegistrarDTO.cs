namespace WebApp.DTO.RailwayCisterns;

public class RegistrarDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}

public class CreateRegistrarDTO
{
    public string Name { get; set; }
}

public class UpdateRegistrarDTO
{
    public string Name { get; set; }
}
