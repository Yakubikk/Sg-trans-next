namespace WebApp.DTO.RailwayCisterns;

// WheelPair
public class WheelPairDTO
{
    public decimal? ThicknessLeft { get; set; }
    public decimal? ThicknessRight { get; set; }
    public string? WheelType { get; set; }
}

public class CreateWheelPairDTO : CreatePartDTOBase
{
    public decimal? ThicknessLeft { get; set; }
    public decimal? ThicknessRight { get; set; }
    public string? WheelType { get; set; }
}

public class UpdateWheelPairDTO : UpdatePartDTOBase
{
    public decimal? ThicknessLeft { get; set; }
    public decimal? ThicknessRight { get; set; }
    public string? WheelType { get; set; }
}

// SideFrame
public class SideFrameDTO
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

public class CreateSideFrameDTO : CreatePartDTOBase
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

public class UpdateSideFrameDTO : UpdatePartDTOBase
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

// Bolster
public class BolsterDTO
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

public class CreateBolsterDTO : CreatePartDTOBase
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

public class UpdateBolsterDTO : UpdatePartDTOBase
{
    public int? ServiceLifeYears { get; set; }
    public DateOnly? ExtendedUntil { get; set; }
}

// Coupler
public class CouplerDTO
{
}

public class CreateCouplerDTO : CreatePartDTOBase
{
}

public class UpdateCouplerDTO : UpdatePartDTOBase
{
}

// ShockAbsorber
public class ShockAbsorberDTO
{
    public string? Model { get; set; }
    public string? ManufacturerCode { get; set; }
    public DateOnly? NextRepairDate { get; set; }
    public int? ServiceLifeYears { get; set; }
}

public class CreateShockAbsorberDTO : CreatePartDTOBase
{
    public string? Model { get; set; }
    public string? ManufacturerCode { get; set; }
    public DateOnly? NextRepairDate { get; set; }
    public int? ServiceLifeYears { get; set; }
}

public class UpdateShockAbsorberDTO : UpdatePartDTOBase
{
    public string? Model { get; set; }
    public string? ManufacturerCode { get; set; }
    public DateOnly? NextRepairDate { get; set; }
    public int? ServiceLifeYears { get; set; }
}
