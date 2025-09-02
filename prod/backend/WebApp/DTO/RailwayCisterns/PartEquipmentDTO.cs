namespace WebApp.DTO.RailwayCisterns;

public class PartEquipmentDTO
{
    public Guid Id { get; set; }
    public int Operation { get; set; }
    public string DefectsId { get; set; } = null!;
    public string? AdminOwnerId { get; set; }
    public string? JobDate { get; set; }
    public string JobTypeId { get; set; } = null!;
    public int ThicknessLeft { get; set; }
    public int ThicknessRight { get; set; }
    public int? TruckType { get; set; }
    public string? Notes { get; set; }
    public int DocumetnsId { get; set; }
    public DateOnly DocumetnDate { get; set; }

    // Навигационные свойства
    public RailwayCisternDTO? RailwayCistern { get; set; }
    public EquipmentTypeDTO? EquipmentType { get; set; }
    public DepotDTO? JobDepot { get; set; }
    public DepotDTO? Depot { get; set; }
    public RepairTypeDTO? RepairType { get; set; }
    public PartInfoDTO? Part { get; set; }
}

public class RailwayCisternDTO
{
    public Guid Id { get; set; }
    public string Number { get; set; } = null!;
    public string Model { get; set; } = null!;
    public string Owner { get; set; } = null!;
}

public class PartInfoDTO
{
    public Guid PartId { get; set; }
    public StampInfoDTO StampInfo { get; set; }
    public string? SerialNumber { get; set; }
    public DateOnly? ManufactureYear { get; set; }
}

public class StampInfoDTO
{
    public string Value { get; set; } = null!;
}