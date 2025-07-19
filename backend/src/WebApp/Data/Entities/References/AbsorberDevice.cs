using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_поглащаппарат")]
public class AbsorberDevice
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("поле1")] [StringLength(20)] public string? Field1 { get; set; } // Поле1
}