using WebApp.Data.Entities.Users;

namespace WebApp.Features.Users.GetAll;

public record GetAllUsersResponse(
    Guid Id,
    string Email,
    string FirstName,
    string LastName,
    string Patronymic,
    string PhoneNumber,
    ICollection<RoleEntity> Roles
);
