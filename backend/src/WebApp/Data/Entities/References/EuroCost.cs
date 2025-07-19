using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_стоимостьевро")]
public class EuroCost
{
    [Key]
    public Guid Id { get; set; }

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("сутки")] public short? Days { get; set; } // Сутки

    [Column("отпускнаяцена")] public double? SellingPrice { get; set; } // Отпускная цена

    [Column("единицаизмерения")]
    [StringLength(2)]
    public string? UnitOfMeasure { get; set; } // Единица измерения
}