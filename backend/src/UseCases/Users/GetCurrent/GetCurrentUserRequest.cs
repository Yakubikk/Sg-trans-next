using System.ComponentModel.DataAnnotations;

namespace UseCases.Users.GetCurrent;

public record GetCurrentUserRequest(
    [Required] Guid UserId);
