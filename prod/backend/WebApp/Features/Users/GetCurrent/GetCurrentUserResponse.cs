namespace WebApp.Features.Users.GetCurrent;

public record GetCurrentUserResponse(
    Guid UserId,
    string Email,
    string FirstName,
    string LastName,
    string Patronymic,
    string PhoneNumber,
    string? RefreshToken,
    DateTime? RefreshTokenExpiry,
    RolesForCurrentUser[] Roles);
    
public record RolesForCurrentUser(    
    int Id,
    string Name
);