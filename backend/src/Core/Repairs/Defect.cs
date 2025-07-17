using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("спрнеисправности")]
public class Defect
{
    [Key]
    public Guid Id { get; set; }

    [Column("коднеисправности")] public int DefectCode { get; set; } // Код неисправности

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование

    [Column("сокрнеисправность")]
    [StringLength(255)]
    public string? ShortDefect { get; set; } // Сокр. неисправность

    [Column("причина")] public Guid? ReasonId { get; set; } // Внешний ключ

    [ForeignKey("ReasonId")] public virtual Reason? Reason { get; set; } // Навигационное свойство
}