using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("спрдепо")]
public class DepotReference
{
    [Key]
    public Guid Id { get; set; }

    [Column("кодпредприятия")] public double EnterpriseCode { get; set; } // Код предприятия

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование

    [Column("сокр")] [StringLength(255)] public string? Abbreviation { get; set; } // Сокращение
}