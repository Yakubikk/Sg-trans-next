using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_неисправности")]
public class Fault
{
    [Key]
    public Guid Id { get; set; }

    [Column("код")] public int Code { get; set; } // Код

    [Column("код неисправности")]
    [StringLength(50)]
    public string? FaultCode { get; set; } // Код неисправности

    [Column("примечание")]
    [StringLength(50)]
    public string? Note { get; set; } // Примечание
}