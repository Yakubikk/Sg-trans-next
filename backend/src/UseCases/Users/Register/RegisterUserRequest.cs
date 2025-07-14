using System.ComponentModel.DataAnnotations;

namespace UseCases.Users.Register;

public record RegisterUserRequest(
    [Required] string Email,
    [Required] string Password,
    [Required] string FirstName,
    [Required] string LastName,
    [Required] string Patronymic,
    [Required] string PhoneNumber
);
