using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("спрпричины")]
public class Reason
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("причина")]
    [StringLength(255)]
    public string? ReasonName { get; set; } // Причина

    // Навигационное свойство для обратной связи
    public virtual ICollection<Defect>? Defects { get; set; }
}