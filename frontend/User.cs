namespace WebApp.Data.Entities.Users;

public class User
{
    public Guid Id { get; set; }

    public string PasswordHash { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
    
    public string FirstName { get; set; } = string.Empty;
    
    public string LastName { get; set; } = string.Empty;
    
    public string Patronymic { get; set; } = string.Empty;
    
    public string PhoneNumber { get; set; } = string.Empty;
    
    public string? RefreshToken { get; set; } = string.Empty;
    
    public DateTime? RefreshTokenExpiry { get; set; } = null;

    public ICollection<RoleEntity> Roles { get; set; } = [];
}