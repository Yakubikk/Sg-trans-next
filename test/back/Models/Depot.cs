using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Depot
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string? Location { get; set; }

    public DateTime CreatedAt { get; set; }

    public string CreatorId { get; set; } = null!;

    public virtual ICollection<Part> Parts { get; set; } = new List<Part>();

    public virtual ICollection<Repair> Repairs { get; set; } = new List<Repair>();
}
