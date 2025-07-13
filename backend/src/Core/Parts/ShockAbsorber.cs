namespace Core.Parts;

public class ShockAbsorber : Part
{
    public string Model { get; set; }
    public string ManufacturerCode { get; set; }
    public DateOnly NextRepairDate { get; set; }
    public int ServiceLifeYears { get; set; }
}