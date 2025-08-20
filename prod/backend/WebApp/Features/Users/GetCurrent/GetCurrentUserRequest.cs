using System.ComponentModel.DataAnnotations;

namespace WebApp.Features.Users.GetCurrent;

public record GetCurrentUserRequest(
    [Required] Guid UserId);
