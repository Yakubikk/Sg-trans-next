using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_тормоз")]
public class Brake
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("код")] public int Code { get; set; } // Код

    [Column("поле1")] [StringLength(255)] public string? Field1 { get; set; } // Поле1

    [Column("описание")]
    [StringLength(255)]
    public string? Description { get; set; } // Описание
}