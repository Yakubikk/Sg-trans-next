using System;
using System.Collections.Generic;

namespace back.Models;

public partial class PartInstallation
{
    public Guid Id { get; set; }

    public Guid PartId { get; set; }

    public Guid? WagonId { get; set; }

    public DateTime InstalledAt { get; set; }

    public string? InstalledBy { get; set; }

    public DateTime? RemovedAt { get; set; }

    public string? RemovedBy { get; set; }

    public Guid? FromLocationId { get; set; }

    public Guid ToLocationId { get; set; }

    public string? Notes { get; set; }

    public virtual Location? FromLocation { get; set; }

    public virtual Part Part { get; set; } = null!;

    public virtual Location ToLocation { get; set; } = null!;

    public virtual RailwayCistern? Wagon { get; set; }
}
