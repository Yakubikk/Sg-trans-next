namespace WebApp.Data.Entities.RailwayCisterns;

public class Owner
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? UNP { get; set; }
    public DateTimeOffset? CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public string? CreatorId { get; set; }
    public string ShortName { get; set; } = null!;
    public string? Address { get; set; }
    public bool TreatRepairs { get; set; }

    public ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}