using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("спрремонты")]
public class Repair
{
    [Key]
    public Guid Id { get; set; }

    [Column("кодремонта")] public short RepairCode { get; set; } // Код ремонта

    [Column("сокр")] [StringLength(255)] public string? Abbreviation { get; set; } // Сокращение

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование
}