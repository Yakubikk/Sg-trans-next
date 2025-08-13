using System;
using System.Collections.Generic;

namespace back.Models;

public partial class WheelPair
{
    public Guid PartId { get; set; }

    public decimal? ThicknessLeft { get; set; }

    public decimal? ThicknessRight { get; set; }

    public string? WheelType { get; set; }

    public virtual Part Part { get; set; } = null!;
}
