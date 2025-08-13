using System;
using System.Collections.Generic;

namespace back.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<PermissionEntity> Permissions { get; set; } = new List<PermissionEntity>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
