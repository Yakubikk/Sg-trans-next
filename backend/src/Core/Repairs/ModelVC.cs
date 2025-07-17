using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_модельвц")]
public class ModelVC
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("поле1")] [StringLength(75)] public string? Field1 { get; set; } // Поле1

    [Column("поле2")] public double? Field2 { get; set; } // Поле2

    [Column("поле3")] public double? Field3 { get; set; } // Поле3

    [Column("поле4")] public int? Field4 { get; set; } // Поле4

    [Column("поле5")] public double? Field5 { get; set; } // Поле5
}