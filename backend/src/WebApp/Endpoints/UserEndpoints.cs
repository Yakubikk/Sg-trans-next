using System.Security.Claims;
using Core.Users;
using Microsoft.AspNetCore.Mvc;
using UseCases.Users.Delete;
using UseCases.Users.GetCurrent;
using UseCases.Users.GetPermissions;
using UseCases.Users.Login;
using UseCases.Users.RefreshToken;
using UseCases.Users.Register;
using UseCases.Users.Update;
using UseCases.Users.UpdateRoles;
using WebApp.Extensions;

namespace WebApp.Endpoints;

public static class UsersEndpoints
{
    public static IEndpointRouteBuilder MapUsersEndpoints(this IEndpointRouteBuilder app)
    {
        // Public Endpoints Group
        var publicGroup = app.MapGroup("/users")
            .WithTags("Users");

        publicGroup.MapPost("register", RegisterUser);
        publicGroup.MapPost("login", Login);
        publicGroup.MapPost("refresh-token", RefreshToken);

        // Protected Endpoints Group
        var protectedGroup = app.MapGroup("/users")
            .RequireAuthorization() // Apply authorization to this group
            .WithTags("Users"); // You might want to keep tags for both

        protectedGroup.MapGet("me", GetCurrentUser);
        protectedGroup.MapGet("{userId:guid}/permissions", GetUserPermissions);
        protectedGroup.MapPut("{userId:guid}", UpdateUser).RequirePermissions(Permission.Update);
        protectedGroup.MapPut("{userId:guid}/roles", UpdateUserRoles).RequirePermissions(Permission.Update);
        protectedGroup.MapDelete("{userId:guid}", DeleteUser).RequirePermissions(Permission.Delete);

        return app;
    }

    private static async Task<IResult> RegisterUser(
        [FromBody] RegisterUserRequest request,
        RegisterUserUseCase useCase)
    {
        await useCase.ExecuteAsync(request);
        return Results.Ok();
    }

    private static async Task<IResult> Login(
        [FromBody] LoginRequest request,
        LoginUseCase useCase)
    {
        var response = await useCase.ExecuteAsync(request);
        
        // Устанавливаем refresh token в httpOnly cookie
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        return Results.Ok(response);
    }

    private static async Task<IResult> RefreshToken(
        RefreshTokenUseCase useCase,
        HttpContext context)
    {
        // Получаем refresh token из cookie
        if (!context.Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            return Results.Unauthorized();

        var request = new RefreshTokenRequest(refreshToken);
        var response = await useCase.ExecuteAsync(request);

        // Обновляем cookie с refresh token
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        };
        context.Response.Cookies.Append("refreshToken", response.RefreshToken, cookieOptions);

        return Results.Ok(new { accessToken = response.AccessToken });
    }
    
    // private static async Task<IResult> GetAllUsers(
    //     GetAllUsersUseCase useCase)
    // {
    //     var users = await useCase.ExecuteAsync();
    //     return Results.Ok(users);
    // }

    private static async Task<IResult> GetCurrentUser(
        HttpContext context,
        GetCurrentUserUseCase useCase)
    {
        var userId = context.User.FindFirstValue("userId");
        if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var parsedUserId))
            return Results.Unauthorized();

        var request = new GetCurrentUserRequest(parsedUserId);
        var user = await useCase.ExecuteAsync(request);
        return Results.Ok(user);
    }

    private static async Task<IResult> GetUserPermissions(
        Guid userId,
        GetUserPermissionsUseCase useCase)
    {
        var request = new GetUserPermissionsRequest(userId);
        var permissions = await useCase.ExecuteAsync(request);
        return Results.Ok(permissions);
    }

    private static async Task<IResult> UpdateUser(
        Guid userId,
        [FromBody] UpdateUserRequest request,
        UpdateUserUseCase useCase)
    {
        // Проверяем, совпадает ли userId из пути с userId в запросе
        if (userId != request.UserId)
            return Results.BadRequest();

        var updatedUser = await useCase.ExecuteAsync(request);
        return Results.Ok(updatedUser);
    }

    private static async Task<IResult> UpdateUserRoles(
        Guid userId,
        [FromBody] UpdateUserRolesRequest request,
        UpdateUserRolesUseCase useCase)
    {
        // Проверяем, совпадает ли userId из пути с userId в запросе
        if (userId != request.UserId)
            return Results.BadRequest();

        var updatedUser = await useCase.ExecuteAsync(request);
        return Results.Ok(updatedUser);
    }

    private static async Task<IResult> DeleteUser(
        Guid userId,
        DeleteUserUseCase useCase)
    {
        var request = new DeleteUserRequest(userId);
        await useCase.ExecuteAsync(request);
        return Results.NoContent();
    }
}