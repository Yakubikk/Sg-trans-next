namespace WebApp.DTO.RailwayCisterns;

public class EquipmentTypeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int Code { get; set; }
    public Guid PartTypeId { get; set; }
    public string PartTypeName { get; set; } = null!;
}
