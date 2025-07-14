using System.ComponentModel.DataAnnotations;

namespace UseCases.Users.Update;

public record UpdateUserRequest(
    [Required] Guid UserId,
    [Required] string Email,
    [Required] string FirstName,
    [Required] string LastName,
    [Required] string Patronymic,
    [Required] string PhoneNumber
);
