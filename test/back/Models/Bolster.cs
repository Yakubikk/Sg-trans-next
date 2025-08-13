using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Bolster
{
    public Guid PartId { get; set; }

    public int? ServiceLifeYears { get; set; }

    public DateOnly? ExtendedUntil { get; set; }

    public virtual Part Part { get; set; } = null!;
}
