using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Affiliation
{
    public Guid Id { get; set; }

    public string Value { get; set; } = null!;

    public virtual ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
