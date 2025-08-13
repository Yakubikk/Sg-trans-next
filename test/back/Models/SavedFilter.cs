using System;
using System.Collections.Generic;

namespace back.Models;

public partial class SavedFilter
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string FilterJson { get; set; } = null!;

    public string SortFieldsJson { get; set; } = null!;

    public Guid UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
