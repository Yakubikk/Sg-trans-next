using System;
using System.Collections.Generic;

namespace back.Models;

public partial class StampNumber
{
    public Guid Id { get; set; }

    public string Value { get; set; } = null!;

    public virtual ICollection<Part> Parts { get; set; } = new List<Part>();
}
