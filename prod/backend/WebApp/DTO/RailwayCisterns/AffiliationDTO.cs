namespace WebApp.DTO.RailwayCisterns;

public class AffiliationDTO
{
    public Guid Id { get; set; }
    public string Value { get; set; }
}

public class CreateAffiliationDTO
{
    public string Value { get; set; }
}

public class UpdateAffiliationDTO
{
    public string Value { get; set; }
}
