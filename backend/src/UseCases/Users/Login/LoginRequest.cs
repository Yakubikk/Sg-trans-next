using System.ComponentModel.DataAnnotations;

namespace UseCases.Users.Login;

public record LoginRequest(
    [Required] string Email,
    [Required] string Password);
