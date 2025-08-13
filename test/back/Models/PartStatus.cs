using System;
using System.Collections.Generic;

namespace back.Models;

public partial class PartStatus
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Code { get; set; }

    public virtual ICollection<Part> Parts { get; set; } = new List<Part>();
}
