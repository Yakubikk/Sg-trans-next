using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_клеймо")]
public class Stamp
{
    [Key]
    public Guid Id { get; set; }

    [Column("тип")]
    [StringLength(4)]
    public string Type { get; set; } = string.Empty; // Тип
}