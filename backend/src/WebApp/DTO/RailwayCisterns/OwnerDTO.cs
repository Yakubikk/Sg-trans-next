namespace WebApp.DTO.RailwayCisterns;

public class OwnerDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string UNP { get; set; }
    public string ShortName { get; set; }
    public string Address { get; set; }
    public bool TreatRepairs { get; set; }
    public DateTimeOffset? CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}

public class CreateOwnerDTO
{
    public string Name { get; set; }
    public string UNP { get; set; }
    public string ShortName { get; set; }
    public string Address { get; set; }
    public bool TreatRepairs { get; set; }
}

public class UpdateOwnerDTO
{
    public string Name { get; set; }
    public string UNP { get; set; }
    public string ShortName { get; set; }
    public string Address { get; set; }
    public bool TreatRepairs { get; set; }
}
