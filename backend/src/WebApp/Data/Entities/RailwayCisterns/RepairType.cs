namespace WebApp.Data.Entities.RailwayCisterns;

public class RepairType
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }

    public ICollection<MilageCistern> MilageCisterns { get; set; } = new List<MilageCistern>();
    public ICollection<Repair> Repairs { get; set; } = new List<Repair>();
}
