using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Manufacturer
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Country { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string CreatorId { get; set; } = null!;

    public string? ShortName { get; set; }

    public int Code { get; set; }

    public virtual ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
