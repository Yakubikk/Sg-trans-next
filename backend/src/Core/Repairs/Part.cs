using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_детали")]
public class Part
{
    [Key]
    public Guid Id { get; set; }

    [Column("коддетали")] public short PartCode { get; set; } // Код детали

    [Column("наименованиедетали")]
    [StringLength(50)]
    public string? PartName { get; set; } // Наименование детали

    [Column("деталь")] public short? Detail { get; set; } // Деталь
}