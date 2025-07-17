using Core.Repairs;
using Microsoft.AspNetCore.Mvc;
using UseCases.Services.Repairs;

namespace WebApp.Endpoints.Repairs;

public static class EmployeeEndpoints
{
    public static void MapEmployeeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/employees")
            .WithTags("справочник_работники");

        group.MapGet("/", async ([FromServices] EmployeeService service) =>
            Results.Ok(await service.GetAllEmployeesAsync()));

        group.MapGet("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id) =>
        {
            var employee = await service.GetEmployeeByIdAsync(id);
            return employee is null ? Results.NotFound() : Results.Ok(employee);
        });

        group.MapPost("/", async ([FromServices] EmployeeService service, [FromBody] Employee employee) =>
        {
            var created = await service.CreateEmployeeAsync(employee);
            return Results.Created($"/api/employees/{created.Id}", created);
        });

        group.MapPut("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id, [FromBody] Employee employee) =>
        {
            if (id != employee.Id)
                return Results.BadRequest();
            
            await service.UpdateEmployeeAsync(employee);
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id) =>
        {
            await service.DeleteEmployeeAsync(id);
            return Results.NoContent();
        });
    }
}
