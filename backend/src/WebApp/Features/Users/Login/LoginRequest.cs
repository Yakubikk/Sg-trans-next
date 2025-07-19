using System.ComponentModel.DataAnnotations;

namespace WebApp.Features.Users.Login;

public record LoginRequest(
    [Required] string Email,
    [Required] string Password);
