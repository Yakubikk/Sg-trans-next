using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Owner
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Unp { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? CreatorId { get; set; }

    public string ShortName { get; set; } = null!;

    public string? Address { get; set; }

    public bool TreatRepairs { get; set; }

    public int? Code { get; set; }

    public virtual ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
