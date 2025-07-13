using System.ComponentModel.DataAnnotations;

namespace UseCases.Contracts.Users;

public record RegisterUserRequest(
    [Required] string FirstName,
    [Required] string LastName,
    [Required] string Patronymic,
    [Required] string PhoneNumber,
    [Required] string Password,
    [Required] string Email);
