using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_поглащаппарат_учет")]
public class AbsorberDeviceAccounting
{
    [Key] public Guid Id { get; set; } // Уникальный идентификатор

    [Column("код")] public int Code { get; set; } // Код

    [Column("заводномер")]
    [StringLength(50)]
    public string? FactoryNumber { get; set; } // Заводской номер

    [Column("тип")] [StringLength(50)] public string? Type { get; set; } // Тип

    [Column("год")] public DateTime? Year { get; set; } // Год

    [Column("списан")] public bool IsWrittenOff { get; set; } // Списан

    [Column("вагон")] [StringLength(8)] public string? WagonNumber { get; set; } // Вагон

    [Column("дата установки")] public DateTime? InstallationDate { get; set; } // Дата установки

    [Column("хранение")] public int? StorageLocation { get; set; } // Хранение

    [Column("выкачен")] public bool IsRolledOut { get; set; } // Выкачен
}