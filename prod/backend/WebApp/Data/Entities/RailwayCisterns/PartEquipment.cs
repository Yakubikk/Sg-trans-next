namespace WebApp.Data.Entities.RailwayCisterns;

public class PartEquipment
{
    public Guid Id { get; set; }
    public Guid RailwayCisternsId { get; set; }
    public int Operation { get; set; }
    public Guid? EquipmentTypeId { get; set; }
    public string DefectsId { get; set; } = "0";
    public string? AdminOwnerId { get; set; }
    public Guid PartsId { get; set; }
    public Guid JobDepotsId { get; set; }
    public string? JobDate { get; set; }
    public string JobTypeId { get; set; } = "0";
    public int ThicknessLeft { get; set; }
    public int ThicknessRight { get; set; }
    public int? TruckType { get; set; }
    public string? Notes { get; set; }
    public int DocumetnsId { get; set; }
    public DateOnly DocumetnDate { get; set; }
    public Guid? DepotsId { get; set; }
    public Guid RepairTypesId { get; set; }

    // Навигационные свойства
    public RailwayCistern RailwayCistern { get; set; } = null!;
    public EquipmentType? EquipmentType { get; set; }
    public Depot JobDepot { get; set; } = null!;
    public Depot? Depot { get; set; }
    public RepairType RepairType { get; set; } = null!;
    public Part Part { get; set; } = null!;
}
