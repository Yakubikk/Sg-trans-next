using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_видыремонта")]
public class RepairType
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("видремонта")]
    [StringLength(50)]
    public string? RepairTypeName { get; set; } // Вид ремонта

    [Column("примечание")]
    [StringLength(50)]
    public string? Note { get; set; } // Примечание
}