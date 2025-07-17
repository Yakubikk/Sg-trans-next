using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_клиенты")]
public class Client
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("klient")] [StringLength(255)] public string? ClientName { get; set; } // Клиент

    [Column("unp")] [StringLength(15)] public string? UNP { get; set; } // УНП

    [Column("adres")] [StringLength(250)] public string? Address { get; set; } // Адрес

    [Column("krklient")]
    [StringLength(100)]
    public string? ShortClientName { get; set; } // Краткое имя клиента

    [Column("remont")] [StringLength(1)] public string? Repair { get; set; } // Ремонт

    [Column("kod")] [StringLength(10)] public string? Code { get; set; } // Код

    [Column("коддепоизтхт")]
    [StringLength(255)]
    public string? DepotCodeFromTXT { get; set; } // Код депо из ТХТ
}