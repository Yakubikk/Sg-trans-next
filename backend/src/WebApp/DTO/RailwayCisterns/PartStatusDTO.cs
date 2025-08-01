namespace WebApp.DTO.RailwayCisterns;

public class PartStatusDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Code { get; set; }
}

public class CreatePartStatusDTO
{
    public string Name { get; set; }
    public int Code { get; set; }
}

public class UpdatePartStatusDTO
{
    public string Name { get; set; }
    public int Code { get; set; }
}
