namespace WebApp.Data.Entities.RailwayCisterns;

public class RepairType
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public ICollection<MilageCistern> MilageCisterns { get; set; }
    
    public ICollection<Repair> Repairs { get; set; } = new List<Repair>();
}
