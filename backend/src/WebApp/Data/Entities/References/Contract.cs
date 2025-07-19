using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_договоры")]
public class Contract
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("dogovor")]
    [StringLength(255)]
    public string? ContractName { get; set; } // Договор

    [Column("klient")] [StringLength(250)] public string? ClientName { get; set; } // Клиент

    [Column("valuta dogovora")]
    [StringLength(3)]
    public string? ContractCurrency { get; set; } // Валюта договора

    [Column("factoborot")] public short? FactTurnover { get; set; } // Факт. оборот

    [Column("straf")] public int? Penalty { get; set; } // Штраф

    [Column("tipstraf")] [StringLength(4)] public string? PenaltyType { get; set; } // Тип штрафа

    [Column("oborotsutki")] public short? DailyTurnover { get; set; } // Оборот в сутки

    [Column("deystvuet")] public bool IsActive { get; set; } // Действует

    [Column("poputnoe")] public short? Associated { get; set; } // Попутное

    [Column("arenda")] public short? Lease { get; set; } // Аренда

    [Column("valutast")] [StringLength(3)] public string? PenaltyCurrency { get; set; } // Валюта штрафа
}