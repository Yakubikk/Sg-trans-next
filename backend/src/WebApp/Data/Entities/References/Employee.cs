using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_работники")]
public class Employee
{
    [Key]
    public Guid Id { get; set; }

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("rabotnik")]
    [StringLength(255)]
    public string? EmployeeName { get; set; } // Работник

    [Column("dolznost")]
    [StringLength(30)]
    public string? Position { get; set; } // Должность

    [Column("стном")]
    [StringLength(3)]
    public string? EmployeeStationNumber { get; set; } // Станционный номер работника
}