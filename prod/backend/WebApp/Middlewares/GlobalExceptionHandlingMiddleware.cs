using System.Net;
using System.Text.Json;
using WebApp.Exceptions;

namespace WebApp.Middlewares;

public class GlobalExceptionHandlingMiddleware : IMiddleware
{
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

    public GlobalExceptionHandlingMiddleware(ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Произошла ошибка при обработке запроса");
            
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var response = exception switch
        {
            ApiException apiException => new ErrorResponse(
                Status: "Error",
                Message: apiException.Message,
                StatusCode: apiException.StatusCode
            ),
            UnauthorizedAccessException => new ErrorResponse(
                Status: "Error",
                Message: "Отказано в доступе",
                StatusCode: (int)HttpStatusCode.Unauthorized
            ),
            _ => new ErrorResponse(
                Status: "Error",
                Message: "Произошла внутренняя ошибка сервера",
                StatusCode: (int)HttpStatusCode.InternalServerError,
                Details: exception.Message
            )
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = response.StatusCode;

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}

public record ErrorResponse(
    string Status,
    string Message,
    int StatusCode,
    string? Details = null
);
