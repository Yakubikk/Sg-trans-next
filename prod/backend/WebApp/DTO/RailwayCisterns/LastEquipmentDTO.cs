namespace WebApp.DTO.RailwayCisterns;

public class LastEquipmentDTO
{
    public Guid EquipmentTypeId { get; set; }
    public string EquipmentTypeName { get; set; } = null!;
    public PartEquipmentDTO LastEquipment { get; set; } = null!;
}
