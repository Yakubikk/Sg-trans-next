namespace WebApp.DTO.RailwayCisterns;

public class RepairTypeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
}

public class CreateRepairTypeDTO
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
}

public class UpdateRepairTypeDTO
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
}
