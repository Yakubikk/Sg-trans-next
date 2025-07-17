using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("спрмодернизация")]
public class Modernization
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("кодмодернизации")] public short ModernizationCode { get; set; } // Код модернизации

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование
}