namespace WebApp.DTO.RailwayCisterns;

public class FilterTypeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}

public class CreateFilterTypeDTO
{
    public string Name { get; set; }
}

public class UpdateFilterTypeDTO
{
    public string Name { get; set; }
}
