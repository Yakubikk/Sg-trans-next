using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_груз")]
public class Cargo
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("код")] public int Code { get; set; } // Код

    [Column("названиегруза")]
    [StringLength(50)]
    public string? CargoName { get; set; } // Название груза

    [Column("наименование")]
    [StringLength(250)]
    public string? Name { get; set; } // Наименование

    [Column("цена")] public double? Price { get; set; } // Цена
}