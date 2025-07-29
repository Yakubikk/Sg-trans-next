namespace WebApp.DTO.RailwayCisterns;

public class MilageCisternDTO
{
    public Guid Id { get; set; }
    public Guid CisternId { get; set; }
    public string CisternNumber { get; set; }
    public int Milage { get; set; }
    public int MilageNorm { get; set; }
    public Guid RepairTypeId { get; set; }
    public DateOnly RepairDate { get; set; }
    public int InputModeCode { get; set; }
    public DateOnly InputDate { get; set; }
}

public class CreateMilageCisternDTO
{
    public Guid CisternId { get; set; }
    public string CisternNumber { get; set; }
    public int Milage { get; set; }
    public int MilageNorm { get; set; }
    public Guid RepairTypeId { get; set; }
    public DateOnly RepairDate { get; set; }
    public int InputModeCode { get; set; }
    public DateOnly InputDate { get; set; }
}

public class UpdateMilageCisternDTO
{
    public int Milage { get; set; }
    public int MilageNorm { get; set; }
    public Guid RepairTypeId { get; set; }
    public DateOnly RepairDate { get; set; }
    public int InputModeCode { get; set; }
    public DateOnly InputDate { get; set; }
}
