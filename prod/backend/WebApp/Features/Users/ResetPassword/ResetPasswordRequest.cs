using System.ComponentModel.DataAnnotations;

namespace WebApp.Features.Users.ResetPassword;

public record ResetPasswordRequest(
    [Required] Guid UserId,
    [Required] string NewPassword
);
