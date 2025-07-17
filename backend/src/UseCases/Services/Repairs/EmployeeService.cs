using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class EmployeeService
{
    private readonly IBaseRepository<Employee> _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
    {
        return await _employeeRepository.GetAllAsync();
    }

    public async Task<Employee?> GetEmployeeByIdAsync(Guid id)
    {
        return await _employeeRepository.GetByIdAsync(id);
    }

    public async Task<Employee> CreateEmployeeAsync(Employee employee)
    {
        employee.Id = Guid.NewGuid();
        return await _employeeRepository.CreateAsync(employee);
    }

    public async Task UpdateEmployeeAsync(Employee employee)
    {
        await _employeeRepository.UpdateAsync(employee);
    }

    public async Task DeleteEmployeeAsync(Guid id)
    {
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee != null)
        {
            await _employeeRepository.DeleteAsync(employee);
        }
    }
}
