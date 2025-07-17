using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_стоимость")]
public class Cost
{
    [Key]
    public Guid Id { get; set; }

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("сутки")] public short? Days { get; set; } // Сутки

    [Column("отпускнаяцена")] public double? SellingPrice { get; set; } // Отпускная цена

    [Column("отпускнаяценаевро")] public double? SellingPriceEuro { get; set; } // Отпускная цена (евро)

    [Column("единицаизмерения")]
    [StringLength(2)]
    public string? UnitOfMeasure { get; set; } // Единица измерения

    [Column("отпускнаяценаевро2")] public double? SellingPriceEuro2 { get; set; } // Отпускная цена (евро 2)

    [Column("отпускнаяценаевро3")] public double? SellingPriceEuro3 { get; set; } // Отпускная цена (евро 3)
}