using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Repair
{
    public Guid RepairId { get; set; }

    public Guid PartId { get; set; }

    public Guid RepairTypeId { get; set; }

    public DateOnly RepairDate { get; set; }

    public Guid? DepotId { get; set; }

    public DateOnly? NextRepairDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Depot? Depot { get; set; }

    public virtual Part Part { get; set; } = null!;

    public virtual RepairType RepairType { get; set; } = null!;
}
