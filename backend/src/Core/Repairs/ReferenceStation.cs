using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("спрстанции")]
public class ReferenceStation
{
    [Key]
    public Guid Id { get; set; }

    [Column("кодстанции")] public int StationCode { get; set; } // Код станции

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование

    [Column("кодадминистрации")] public short? AdministrationCode { get; set; } // Код администрации
}