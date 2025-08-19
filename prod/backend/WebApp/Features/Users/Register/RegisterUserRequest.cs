using System.ComponentModel.DataAnnotations;

namespace WebApp.Features.Users.Register;

public record RegisterUserRequest(
    [Required] string Email,
    [Required] string Password,
    [Required] string FirstName,
    [Required] string LastName,
    [Required] string Patronymic,
    [Required] string PhoneNumber,
    [Required] int[] RoleIds
);
