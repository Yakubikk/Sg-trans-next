using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Location
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Type { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public string CreatorId { get; set; } = null!;

    public virtual ICollection<PartInstallation> PartInstallationFromLocations { get; set; } = new List<PartInstallation>();

    public virtual ICollection<PartInstallation> PartInstallationToLocations { get; set; } = new List<PartInstallation>();
}
