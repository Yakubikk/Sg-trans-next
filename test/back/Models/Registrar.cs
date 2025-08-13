using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Registrar
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<RailwayCistern> RailwayCisterns { get; set; } = new List<RailwayCistern>();
}
