using System;
using System.Collections.Generic;

namespace back.Models;

public partial class MilageCistern
{
    public Guid Id { get; set; }

    public Guid CisternId { get; set; }

    public int Milage { get; set; }

    public int MilageNorm { get; set; }

    public Guid RepairTypeId { get; set; }

    public DateOnly RepairDate { get; set; }

    public int InputModeCode { get; set; }

    public DateOnly InputDate { get; set; }

    public string CisternNumber { get; set; } = null!;

    public virtual RailwayCistern Cistern { get; set; } = null!;

    public virtual RepairType RepairType { get; set; } = null!;
}
