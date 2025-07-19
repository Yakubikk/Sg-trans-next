using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_типвц")]
public class VCType
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("тип")] [StringLength(4)] public string? Type { get; set; } // Тип
}