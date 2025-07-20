using Microsoft.AspNetCore.Mvc;
using WebApp.Data.Entities.References;
using WebApp.Data.Enums;
using WebApp.Extensions;
using WebApp.Features.References;

namespace WebApp.Endpoints.References;

public static class EmployeeEndpoints
{
    public static void MapEmployeeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/employees")
            .RequireAuthorization()
            .WithTags("справочник_работники");

        group.MapGet("/", async ([FromServices] EmployeeService service) =>
            Results.Ok(await service.GetAllEmployeesAsync()))
            .RequirePermissions(Permission.Read);

        group.MapGet("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id) =>
        {
            var employee = await service.GetEmployeeByIdAsync(id);
            return employee is null ? Results.NotFound() : Results.Ok(employee);
        })
        .RequirePermissions(Permission.Read);

        group.MapPost("/", async ([FromServices] EmployeeService service, [FromBody] Employee employee) =>
        {
            var created = await service.CreateEmployeeAsync(employee);
            return Results.Created($"/api/employees/{created.Id}", created);
        })
        .RequirePermissions(Permission.Create);

        group.MapPut("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id, [FromBody] Employee employee) =>
        {
            if (id != employee.Id)
                return Results.BadRequest();
            
            await service.UpdateEmployeeAsync(employee);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Update);

        group.MapDelete("/{id}", async ([FromServices] EmployeeService service, [FromRoute] Guid id) =>
        {
            await service.DeleteEmployeeAsync(id);
            return Results.NoContent();
        })
        .RequirePermissions(Permission.Delete);
    }
}
