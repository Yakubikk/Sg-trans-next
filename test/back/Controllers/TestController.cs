using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back.Models;

namespace back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet("connection")]
    public async Task<IActionResult> TestConnection()
    {
        try
        {
            // Проверяем подключение к базе данных
            await context.Database.CanConnectAsync();
            return Ok("Подключение к базе данных успешно!");
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка подключения к БД: {ex.Message}");
        }
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await context.Users.Take(5).ToListAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest($"Ошибка получения пользователей: {ex.Message}");
        }
    }
}
