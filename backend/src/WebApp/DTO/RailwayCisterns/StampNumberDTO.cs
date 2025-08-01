namespace WebApp.DTO.RailwayCisterns;

public class StampNumberDTO
{
    public Guid Id { get; set; }
    public string Value { get; set; }
}

public class CreateStampNumberDTO
{
    public string Value { get; set; }
}

public class UpdateStampNumberDTO
{
    public string Value { get; set; }
}
