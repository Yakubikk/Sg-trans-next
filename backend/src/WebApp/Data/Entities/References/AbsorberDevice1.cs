using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_поглащаппарат1")]
public class AbsorberDevice1
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор записи

    [Column("код")] public int Code { get; set; } // Код

    [Column("поле1")] [StringLength(20)] public string? Field1 { get; set; } // Поле1
}