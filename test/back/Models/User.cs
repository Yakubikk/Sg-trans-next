using System;
using System.Collections.Generic;

namespace back.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string PasswordHash { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Patronymic { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiry { get; set; }

    public virtual ICollection<SavedFilter> SavedFilters { get; set; } = new List<SavedFilter>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
