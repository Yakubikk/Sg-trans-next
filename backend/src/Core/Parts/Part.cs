namespace Core.Parts;

public class Part
{
    public Guid Id { get; set; }
    public PartTypes PartType { get; set; }
    public string StampNumber { get; set; }
    public string FactoryNumber { get; set; }
    public int ManufactureYear { get; set; }
    
}