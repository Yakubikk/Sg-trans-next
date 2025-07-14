namespace Core.Users;

public class User
{
    public Guid Id { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string PhoneNumber { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public ICollection<Role> Roles { get; set; }
}