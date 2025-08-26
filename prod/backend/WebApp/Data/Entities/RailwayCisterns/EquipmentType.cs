namespace WebApp.Data.Entities.RailwayCisterns;

public class EquipmentType
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int Code { get; set; }
    public Guid PartTypeId { get; set; }
    
    public PartType PartType { get; set; } = null!;
    public ICollection<PartEquipment> PartEquipments { get; set; } = new List<PartEquipment>();
}
