using System;
using System.Collections.Generic;

namespace back.Models;

public partial class ShockAbsorber
{
    public Guid PartId { get; set; }

    public string? Model { get; set; }

    public string? ManufacturerCode { get; set; }

    public DateOnly? NextRepairDate { get; set; }

    public int? ServiceLifeYears { get; set; }

    public virtual Part Part { get; set; } = null!;
}
