using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Vessel
{
    public Guid Id { get; set; }

    public Guid RailwayCisternId { get; set; }

    public string? VesselSerialNumber { get; set; }

    public DateOnly? VesselBuildDate { get; set; }

    public virtual RailwayCistern RailwayCistern { get; set; } = null!;
}
