using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Coupler
{
    public Guid PartId { get; set; }

    public virtual Part Part { get; set; } = null!;
}
