using System;
using System.Collections.Generic;

namespace back.Models;

public partial class RepairType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<MilageCistern> MilageCisterns { get; set; } = new List<MilageCistern>();

    public virtual ICollection<Repair> Repairs { get; set; } = new List<Repair>();
}
