namespace WebApp.Data.Entities.RailwayCisterns;

public class Depot 
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string? Location { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatorId { get; set; } = null!;
    
    public ICollection<Part> Parts { get; set; } = new List<Part>();
    public ICollection<Repair> Repairs { get; set; } = new List<Repair>();
}
