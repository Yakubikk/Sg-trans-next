using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_договоры_газ")]
public class GasContract
{
    [Key]
    public Guid Id { get; set; }

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("dogovor")]
    [StringLength(255)]
    public string? ContractName { get; set; } // Договор

    [Column("klient")] [StringLength(250)] public string? ClientName { get; set; } // Клиент
}