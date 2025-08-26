namespace WebApp.DTO.RailwayCisterns;

public class PartEquipmentDTO
{
    public Guid Id { get; set; }
    public Guid RailwayCisternsId { get; set; }
    public int Operation { get; set; }
    public Guid? EquipmentTypeId { get; set; }
    public string DefectsId { get; set; } = null!;
    public string? AdminOwnerId { get; set; }
    public Guid PartsId { get; set; }
    public Guid JobDepotsId { get; set; }
    public string? JobDate { get; set; }
    public string JobTypeId { get; set; } = null!;
    public int ThicknessLeft { get; set; }
    public int ThicknessRight { get; set; }
    public int? TruckType { get; set; }
    public string? Notes { get; set; }
    public int DocumetnsId { get; set; }
    public DateOnly DocumetnDate { get; set; }
    public Guid? DepotsId { get; set; }
    public Guid RepairTypesId { get; set; }

    // Навигационные свойства в DTO
    public string? EquipmentTypeName { get; set; }
    public string JobDepotName { get; set; } = null!;
    public string? DepotName { get; set; }
    public string RepairTypeName { get; set; } = null!;
}
