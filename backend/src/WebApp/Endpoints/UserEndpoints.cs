using System.Security.Claims;
using Core.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using UseCases.Contracts.Users;
using UseCases.Services;
using WebApp.Extensions;

namespace WebApp.Endpoints;

public static class UsersEndpoints
{
    public static IEndpointRouteBuilder MapUsersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("register", Register);

        app.MapPost("login", Login);

        app.MapGet("me", (Delegate)Me).RequireAuthorization().RequirePermissions(Permission.CreateCourse);

        return app;
    }

    private static async Task<IResult> Register(
        [FromBody] RegisterUserRequest request,
        UserService usersService)
    {
        await usersService.Register(request);

        return Results.Ok();
    }

    private static async Task<IResult> Login(
        [FromBody] LoginUserRequest request,
        UserService usersService,
        HttpContext context)
    {
        var token = await usersService.Login(request);

        context.Response.Cookies.Append("secretCookie", token);

        return Results.Ok(token);
    }

    private static async Task<IResult> Me(HttpContext context)
    {
        var s = context.User.FindFirstValue("userId");
        return Results.Ok(s);
    }
}