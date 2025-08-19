namespace WebApp.Data.Entities.RailwayCisterns;

public class WheelPair
{
    public Guid PartId { get; set; }
    public Part Part { get; set; } = null!;
    
    public decimal? ThicknessLeft { get; set; }
    public decimal? ThicknessRight { get; set; }
    public string? WheelType { get; set; }
}
