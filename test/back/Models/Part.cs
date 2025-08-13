using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Part
{
    public Guid Id { get; set; }

    public Guid PartTypeId { get; set; }

    public Guid? DepotId { get; set; }

    public Guid StampNumberId { get; set; }

    public string? SerialNumber { get; set; }

    public DateOnly? ManufactureYear { get; set; }

    public string? CurrentLocation { get; set; }

    public Guid StatusId { get; set; }

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public Guid CreatorId { get; set; }

    public virtual Bolster? Bolster { get; set; }

    public virtual Coupler? Coupler { get; set; }

    public virtual Depot? Depot { get; set; }

    public virtual ICollection<PartInstallation> PartInstallations { get; set; } = new List<PartInstallation>();

    public virtual PartType PartType { get; set; } = null!;

    public virtual ICollection<Repair> Repairs { get; set; } = new List<Repair>();

    public virtual ShockAbsorber? ShockAbsorber { get; set; }

    public virtual SideFrame? SideFrame { get; set; }

    public virtual StampNumber StampNumber { get; set; } = null!;

    public virtual PartStatus Status { get; set; } = null!;

    public virtual WheelPair? WheelPair { get; set; }
}
