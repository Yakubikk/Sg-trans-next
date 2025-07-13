using System.ComponentModel.DataAnnotations;

namespace UseCases.Contracts.Users;

public record LoginUserRequest(
    [Required] string Email,
    [Required] string Password);