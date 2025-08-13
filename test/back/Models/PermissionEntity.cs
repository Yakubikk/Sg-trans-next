using System;
using System.Collections.Generic;

namespace back.Models;

public partial class PermissionEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
